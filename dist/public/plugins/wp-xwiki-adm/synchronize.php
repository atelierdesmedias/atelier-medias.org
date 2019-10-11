<?php
// to avoid notices about undefined index SERVER_PROTOCOL
$_SERVER['SERVER_PROTOCOL'] = "cli";

require_once __DIR__.'/../../wordpress/wp-load.php';
require_once 'vendor/autoload.php';

wp();

// Add an autoloader for the plugin's classes
spl_autoload_register(function($class) {
    $filename = __DIR__ .'/classes/'. $class .'.php';

    if(file_exists($filename))
        include $filename;
});

// Initiate the Mayocat environment
XWiki_Adm::init();

// Sync coworkers
$result = XWiki_Adm::synchronize_all();

// Check result
if (is_array($result) && count($result) > 0) {
    echo "OK got ".count($result)." coworkers!".PHP_EOL;
    exit(0);
} else {
    echo "Sync failed";
    exit(1);
}
