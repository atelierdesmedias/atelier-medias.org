<?php

/**
 * Admin screen controller for the XWiki ADM plugin.
 */
class XWiki_Adm_Admin {

    private static $initialized = false;

    /**
     * Creates and adds the admin page to the Wordpress menu.
     */
    public static function init() {
        if(!self::$initialized) {
            add_action('admin_menu', function() {
                self::handle_form();

                add_options_page(
                    'XWiki ADM options', 'XWiki / ADM', 'manage_options', 'wp-xwiki-adm',
                    function() {
                        self::render();
                    }
                );
            });

            // Avoid a second execution of this method.
            self::$initialized = true;
        }
    }

    /**
     * Handles the submitted admin options.
     */
    private static function handle_form() {
        if(!empty($_POST['option_page']) && $_POST['option_page'] == 'wp-xwiki-adm') {
            foreach ($_POST as $name => $value) {
                if($name == 'option_page')
                    continue;

                update_option($name, $value);
            }

            add_settings_error(
                'wp-xwiki-adm',
                'xwiki_adm_updated',
                __('Settings saved.'),
                'updated'
            );
        }
    }

    /**
     * Renders the admin template.
     */
    private static function render() {
        $tpl_folder = __DIR__ .'/../views/';

        // Provides a direct access to the Wordpress options for the plugin templates (`$o` for "option").
        $o = function($option) {
            $value = get_option($option);

            if (!empty($value))
                echo $value;
        };

        // Renders a template with a limited scope containing the function `$o()`.
        $render = function($tpl) use ($o) {
            include $tpl;
        };

        $render($tpl_folder .'admin.php');
    }


} 