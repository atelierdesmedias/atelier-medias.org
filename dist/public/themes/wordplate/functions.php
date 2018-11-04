<?php

declare(strict_types=1);

// -----------------------------------------------------------------------------  DEP

//use Symfony\Component\Yaml\Yaml;
//use Symfony\Component\Yaml\Parser;
//use Symfony\Component\Yaml\Exception\ParseException;

// -----------------------------------------------------------------------------  TIMBER

// activer Timber (twig WP extension)
//require_once(__DIR__ . '/vendor/autoload.php');
$timber = new \Timber\Timber();

// -----------------------------------------------------------------------------  INIT SITE PROPERTIES

/**
 * Class StarterSite
 */
class StarterSite extends \Timber\Site
{

    function __construct()
    {
        add_theme_support( 'post-formats' );
        add_theme_support( 'post-thumbnails' );
        add_theme_support( 'menus' );
        add_theme_support( 'html5', array( 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption' ) );
        //        add_filter( 'get_twig', array( $this, 'add_to_twig' ) );
        add_filter( 'timber_context', array( $this, 'add_to_context' ) );
        add_action( 'init', array( $this, 'register_post_types' ) );
        add_action( 'init', array( $this, 'register_taxonomies' ) );
        parent::__construct();
    }

    function register_post_types()
    {
        //this is where you can register custom post types
    }

    function register_taxonomies()
    {
        //this is where you can register custom taxonomies
    }

    function add_to_context( $context )
    {

         $dico = json_decode( file_get_contents(__DIR__ . '/data/french.json'));
//       $dico = Yaml::parseFile(__DIR__ . '/src/common/dictionary/FR.yml');

        // dico
        $context['dico'] = $dico;

        // menu
        $context['menu'] = new Timber\Menu();

        // site context
        $context['site'] = $this;
        return $context;
    }

    function add_to_twig( $twig )
    {
        /* this is where you can add your own functions to twig */
        $twig->addExtension( new Twig_Extension_StringLoader() );
        // $twig->addFilter('myfoo', new Twig_SimpleFilter('myfoo', array($this, 'myfoo')));
        return $twig;
    }

}

/**
 * Instance staterSite
 */
new StarterSite();


// -----------------------------------------------------------------------------  CONFIG


/**
 * Supprimer les scripts inutils ajoutés par WP
 */
function remove_wp_scripts()
{
    // désactiver les scripts suivants :
    remove_action( 'wp_print_styles', 'print_emoji_styles' );
    remove_action( 'admin_print_styles', 'print_emoji_styles' );
    remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
    remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
}
add_action('wp_enqueue_scripts', 'remove_wp_scripts', 10);

// Register plugin helpers.
require template_path('includes/plugins/plate.php');


// Set theme defaults.
add_action('after_setup_theme', function () {
    // Disable the admin toolbar.
    show_admin_bar(false);

//    // Add post thumbnails support.
//    add_theme_support('post-thumbnails');
//
//    // Add title tag theme support.
//    add_theme_support('title-tag');
//
//    // Add HTML5 theme support.
//    add_theme_support('html5', [
//        'caption',
//        'comment-form',
//        'comment-list',
//        'gallery',
//        'search-form',
//        'widgets',
//    ]);

    // Register navigation menus.
    register_nav_menus([
        'navigation' => __('Navigation', 'wordplate'),
    ]);
});

// Remove JPEG compression.
add_filter('jpeg_quality', function () {
    return 100;
}, 10, 2);
