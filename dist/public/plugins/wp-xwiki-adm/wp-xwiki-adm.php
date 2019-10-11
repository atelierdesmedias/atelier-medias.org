<?php
/**
 * Plugin Name: XWiki ADM
 * Description: XWiki plugin for Atelier des Médias
 * Version: 0.0.0
 * Require: PHP >= 5.3.3
 */

// Require Composer's autoloader
require_once 'vendor/autoload.php';

// Add an autoloader for the plugin's classes
spl_autoload_register(function($class) {
    $filename = __DIR__ .'/classes/'. $class .'.php';

    if(file_exists($filename))
        include $filename;
});

// Initiate the Mayocat environment
XWiki_Adm::init();

// Init cron task
require_once 'cron.php';
