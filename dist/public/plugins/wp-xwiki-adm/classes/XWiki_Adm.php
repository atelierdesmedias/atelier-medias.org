<?php

use Guzzle\Http\Client as Guzzle_Client;

/**
 * Main class of the wp-xwiki-adm plugin, contains all the actual coworker synchronization code.
 */
class XWiki_Adm
{
    /**
     * The path of the WS end-point on XWiki
     */
    private static $service_page = 'xwiki/bin/get/XWiki/CoworkersService?xpage=plain&outputSyntax=plain';

    /**
     * The custom type to map to
     */
    private static $coworker_custom_type = 'adm_coworker';

    /**
     * Mapping that links a XWiki WS taxonomy field to the corresponding WP taxonomy key.
     */
    private static $taxonomies_mapping = array(
        "_tags" => 'adm_coworker_tag'
    );

    /*
     * The field on XWiki side that indicates a profile is active.
     */
    private static $profile_active_field = 'active';

    /*
     * The field on XWiki side that indicates a profile is public.
     */
    private static $profile_public_field = 'public_enable';

    /**
     * Have we been initialized yet ?
     */
    private static $initialized = false;

    /**
     * Initiates the plugin's environment.
     */
    public static function init()
    {
        if (!self::$initialized) {
            session_start();

            // Initialize the admin screen
            XWiki_Adm_Admin::init();

            // Initialize the "Sync" tool
            XWiki_Adm_Sync::init();

            // Avoid a second execution of this method
            self::$initialized = true;
        }
    }

    /**
     * Test if the connection to the XWiki ADM Intranet is correctly configured
     *
     * @return boolean
     */
    public static function test_connection()
    {
        $endpoint = get_option('xwiki_adm_endpoint');
        $client = new Guzzle_Client($endpoint);
        $request = $client->get('/xwiki/bin/view/Main/');
        $request->setAuth(get_option('xwiki_adm_user'), get_option('xwiki_adm_pass'));
        $request->getCurlOptions()->set(CURLOPT_SSL_VERIFYHOST, false);
        $request->getCurlOptions()->set(CURLOPT_SSL_VERIFYPEER, false);
        try {
            $request->send();
            return true;
        }
        catch (\Guzzle\Http\Exception\ClientErrorResponseException $e) {
            return false;
        }
    }

    /**
     * Fetch coworkers from JSON service page on XWiki (XWiki.CoworkersService).
     *
     * @return \Guzzle\Http\Message\Response
     */
    public static function get_coworkers()
    {
        $client = self::json_client();
        $request = $client->get(self::$service_page);
        $request->setAuth(get_option('xwiki_adm_user'), get_option('xwiki_adm_pass'));
        $request->getCurlOptions()->set(CURLOPT_SSL_VERIFYHOST, false);
        $request->getCurlOptions()->set(CURLOPT_SSL_VERIFYPEER, false);
        return $request->send();
    }

    /**
     * Synchronizes all coworker profiles.
     *
     * @return mixed
     * @throws Exception
     */
    public static function synchronize_all()
    {
        // check if endpoint and credentials are setup
        if (empty(get_option('xwiki_adm_endpoint'))
            || empty(get_option('xwiki_adm_user'))
            || empty(get_option('xwiki_adm_pass'))) {
            return false;
        }

        $response = XWiki_Adm::get_coworkers();
        $json = $response->json();
        $coworkers = $json['coworkers'];

        $update_date = new DateTime();
        $tz = ini_get('date.timezone');
        if (!isset($tz) || $tz === '') {
            $tz = "Europe/Paris";
        }
        $update_date->setTimezone(new DateTimeZone($tz));

        foreach ($coworkers as &$coworker) {

            $update_date->setTimestamp($coworker['_update_date'] / 1000);
            $coworker['update_date'] = $update_date->format('Y-m-d H:i:s');

            $slug = sanitize_title($coworker['first_name'] . ' ' . $coworker['last_name']);

            if (trim($slug) === '') {
                // Ignore if there's no first name and last name
                continue;
            }

            $post = self::get_coworker_post_by_slug($slug);

            if ( ($coworker['formule'] == "nomade") || ($coworker['formule'] == "fixe") ){
                $formule = true;
            } else {
                $formule = false;
            }

            $public = $coworker[self::$profile_public_field];

            if (!isset($post) && $public && ($formule == true) ) {
                // Creating post for new coworker!
                $new_post = array(
                    'post_title' => $coworker['first_name'] . ' ' . $coworker['last_name'],
                    'post_status' => 'publish',
                    'post_name' => $slug,
                    'post_type' => self::$coworker_custom_type
                );

                wp_insert_post($new_post);

                $post = XWiki_Adm::get_coworker_post_by_slug($slug);
                $coworker['_sync_action'] = 'created';
            } else if (isset($post) && (!$public || $coworker[self::$profile_active_field] === 0 || $formule == false)) {
                // Coworker post exists, but does not want to be public or has been inactivated -> delete (bypass trash)
                wp_delete_post($post->ID, true);
                $coworker['_sync_action'] = 'removed';
                unset($post);
            }

            if ($post) {
                // Post exists : check if it needs to be updated

                $coworker['_post'] = $post;
                $coworker['_post_id'] = $post->ID;
                $coworker['_post_link'] = get_permalink($post->ID);
                $coworker['_post_slug'] = $post->post_name;

                $sync_date = DateTime::createFromFormat('Y-m-d H:i:s', $post->post_modified);

                // WP date is stored as GMT, not in local time, thus we compute the offset and take it off the post
                // modified date so that the comparison is correct
                $dtz = new DateTimeZone($tz);
                $dt = new DateTime("now", $dtz);
                $offset = $dtz->getOffset($dt);
                $is_up_to_date = ($sync_date->format('U') - $offset) > $update_date->format('U');

                $coworker['_is_up_to_date'] = $is_up_to_date;
                $coworker['_post_modified'] = $sync_date->format('Y-m-d H:i:s');

                if (!$is_up_to_date || (isset($coworker['_sync_action']) && $coworker['_sync_action'] == 'created')) {
                    if (!isset($coworker['_sync_action'])) {
                        $coworker['_sync_action'] = 'updated';
                    }
                    self::synchronize_coworker($coworker);
                } else {
                    $coworker['_sync_action'] = "already up to date";
                }
            }
        }

        return $coworkers;
    }

    /**
     * Synchronizes a single coworker profile
     *
     * @param $coworker array : The coworker to synchronize
     */
    public static function synchronize_coworker($coworker)
    {
        $post = $coworker['_post'];

        foreach (array_keys($coworker) as $key) {

            // Verify if key is not blacklisted (starts with a underscore), in which case, ignore this key
            if (strpos($key, '_') === 0) {
                continue;
            }

            $wp_key = '_'.$key;
            $value = $coworker[$key];
            update_post_meta($post->ID, $wp_key, $value);
        }

        foreach (self::$taxonomies_mapping as $key => $value)
        {
            wp_set_post_terms($post->ID, $coworker[$key], $value);
        }

        self::synchronize_profile_picture($coworker);

        self::synchronize_banner_picture($coworker);

        // Force update last modification date
        wp_update_post($post);
    }

    /**
     * Downloads and saves in banner custom type the banner picture of the coworker, if any
     *
     * @param $coworker array : The coworker whose picture to download and set as featured image
     */
    public static function synchronize_banner_picture($coworker)
    {
        $post = $coworker['_post'];

        $banner_pic = $coworker['_banner_picture'];
        $version = $coworker['_banner_picture_version'];

        if (isset($banner_pic)) {
            $filename = self::get_file_name($banner_pic, $version);

            // Check if current banner image has the same name
            $current_banner_id = get_post_meta($post->ID, '_banner', true);
            if (self::file_exists($current_banner_id, $filename)) {
                // This is likely the same file : ignore
                return;
            }

            $callback = function ($attach_id) use ($post) {
                update_post_meta($post->ID, '_banner', $attach_id);
            };
            self::download_file($post, $banner_pic, $filename, $callback);
        }
    }

    /**
     * Downloads and set as featured image the profile picture of a coworker if necessary.
     *
     * @param $coworker array : The coworker whose picture to download and set as featured image
     */
    public static function synchronize_profile_picture($coworker)
    {
        $post = $coworker['_post'];

        $profile_pic = $coworker['_profile_picture'];
        $version = $coworker['_profile_picture_version'];

        if (isset($profile_pic)) {
            $filename = self::get_file_name($profile_pic, $version);

            // Check if current featured image has the same name
            $current_featured_image_id = get_post_thumbnail_id($post->ID);
            if (self::file_exists($current_featured_image_id, $filename)) {
                // This is likely the same file : ignore
                return;
            }

            $callback = function ($attach_id) use ($post) {
                set_post_thumbnail($post->ID, $attach_id);
            };
            self::download_file($post, $profile_pic, $filename, $callback);
        }
    }

    /**
     * Gets the WP custom post of a coworker from its slug
     *
     * @param $slug string : The slug of the coworker to get the post of
     * @return mixed : Null or the post object found
     */
    public static function get_coworker_post_by_slug($slug)
    {
        $posts = get_posts(array(
            'name' => $slug,
            'posts_per_page' => 1,
            'post_type' => self::$coworker_custom_type,
            'post_status' => 'publish'
        ));

        if (!$posts) {
            return null;
        }

        return $posts[0];
    }

    private static function file_exists($id, $filename)
    {
        if (isset($id)) {
            $image = wp_get_attachment_metadata($id);

            if (isset($image['file'])) {
                $current_file_name = basename($image['file']);

                if ($current_file_name == $filename) {
                    return true;
                }
            }
        }
        return false;
    }

    private static function get_file_name($full_path, $version)
    {
        $filename = basename($full_path);
        // Construct the file name with its version on XWiki has a prefix, so that it gets updated properly if a
        // new version is uploaded
        $filename = sanitize_file_name($version . '_' . $filename);

        return $filename;
    }

    private static function download_file($post, $full_path, $filename, $callback)
    {
        $upload_dir = wp_upload_dir();
        if (wp_mkdir_p($upload_dir['path'])) {
            $file = $upload_dir['path'] . '/' . $filename;
        } else {
            $file = $upload_dir['basedir'] . '/' . $filename;
        }

        $client = new Guzzle\Http\Client();
        $request = $client->get($full_path);
        $request->setAuth(get_option('xwiki_adm_user'), get_option('xwiki_adm_pass'));
        $request->setResponseBody($file);
        $request->getCurlOptions()->set(CURLOPT_SSL_VERIFYHOST, false);
        $request->getCurlOptions()->set(CURLOPT_SSL_VERIFYPEER, false);
        try {
            $request->send();

            $wp_filetype = wp_check_filetype($filename, null);
            $attachment = array(
                'post_mime_type' => $wp_filetype['type'],
                'post_title' => sanitize_file_name($filename),
                'post_content' => '',
                'post_status' => 'inherit'
            );
            $attach_id = wp_insert_attachment($attachment, $file, $post->ID);
            require_once(ABSPATH . 'wp-admin/includes/image.php');
            $attach_data = wp_generate_attachment_metadata($attach_id, $file);
            wp_update_attachment_metadata($attach_id, $attach_data);

            $callback($attach_id);

        } catch (\Guzzle\Http\Exception\ClientErrorResponseException $e) {
            // Probably a 404, just ignore
        } catch (\Guzzle\Http\Exception\BadResponseException $e) {
            // Don't care
        }
    }

    /**
     * Gets a JSON client for the XWiki Intranet.
     *
     * @return Guzzle_Client
     * @throws RuntimeException
     */
    private static function json_client()
    {
        static $client = null;

        if ($client == null) {
            $endpoint = get_option('xwiki_adm_endpoint');

            if (!empty($endpoint)) {
                $client = new Guzzle_Client($endpoint);

                // Accept self-signed certificates

                $client->setDefaultOption('headers/Accept', 'application/json');
            } else {
                throw new RuntimeException('The XWiki server is not set.');
            }
        }

        return $client;
    }

    /**
     * Get a list of coworkers or one coworker.
     *
     * @param $id integer post id of a coworker (optional)
     * @return array of coworkers
     */
    public static function list_coworkers($id = 0)
    {
        global $post;

        // WP_Query options
        $opts = array( 'post_type' => self::$coworker_custom_type, 'posts_per_page' => '1000' );
        if ($id > 0) { $opts['p'] = $id; }

        $list = [];
        $loop = new WP_Query( $opts );

        while ( $loop->have_posts() ) {
            $loop->the_post();
            $data = get_post_custom();

            $list[] = [
                "id" => $post->id,
                "first_name" => $data['_first_name'][0],
                "last_name" => $data['_last_name'][0],
                "activity" => $data['_metier'][0],
                "website1" => $data['_website1'][0],
                "public_quiesttu" => $data['_public_quiesttu'][0],
                "public_quefaistu" => $data['_public_quefaistu'][0],
                "public_pourquoicoworking" => $data['_public_pourquoicoworking'][0],
                "facebook" => $data['_facebook'][0],
                "twitter" => $data['_twitter'][0],
                "viadeo" => $data['_viadeo'][0],
                "linkedin" => $data['_linkedin'][0],
                "skype" => $data['_skype'][0],
                "pinterest" => $data['_pinterest'][0],
                "profile_picture" => get_the_post_thumbnail_url($post->ID)
            ];
        }

        wp_reset_query();

        if ($id > 0 && isset($list[0])) {
            return $list[0];
        }

        return $list;
    }
}
