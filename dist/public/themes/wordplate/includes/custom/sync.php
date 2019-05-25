<?php
// import yaml
use Symfony\Component\Yaml\Yaml;

// sync coworkers list from intranet to coworkers.yml
function sync_coworkers()
{
    $url = get_option('adm_coworkers_url');
    if (!empty($url)) {
        $data = file_get_contents($url);
        if ($data) {
            $data = json_decode($data, true);
            if (is_array($data)) {

                // filter coworkers profiles, keep only active profiles
                $data = array_filter($data["coworkers"], function($val) {
                    return ($val['active'] == 1);
                });

                $data = Yaml::dump($data);
                return file_put_contents(COWORKERS_YAML, $data) == true;
            }
       }
    }
    return false;
}

// hook called by cron job to launch the sync function
add_action('coworkers_sync_scheduler', 'sync_coworkers');
