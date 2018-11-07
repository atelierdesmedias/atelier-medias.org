<?php

declare(strict_types=1);

// -----------------------------------------------------------------------------  DEP


// import yaml
use Symfony\Component\Yaml\Yaml;

// Register plugin helpers.
require template_path('includes/plugins/plate.php');

// -----------------------------------------------------------------------------  TIMBER

// activer Timber (twig WP extension)
$timber = new \Timber\Timber();

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

        // montrer la bar d'admin
        show_admin_bar(false);

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

       // $dico = json_decode( file_get_contents(__DIR__ . '/data/_french.json'));
       $dico = Yaml::parseFile(__DIR__ . '/data/french.yml');

       //dump($dico);exit;

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


    function images_config()
    {
        // Remove JPEG compression.
        add_filter('jpeg_quality', function () {
            return 100;
        }, 10, 2);
    }

}

/**
 * Instance staterSite
 */
new StarterSite();


// -----------------------------------------------------------------------------  CONFIG

/**
 * Gestion de chargement scripts JS et CSS
 */
function load_scripts()
{
    // recupérer les variables d'environement auto générées
    require_once (__DIR__.'/config.php');

    // si on est en dev
    if (  $ENV !== 'dev')
    {
        // register CSS script
        wp_register_style( 'bundle-main-css', $CURRENT_ENV_URL."assets/bundle-main.css" , array(), '', 'all' );
        wp_enqueue_style( 'bundle-main-css' );
    }

    // register JS script
    wp_register_script( 'bundle-main-js', $CURRENT_ENV_URL."assets/bundle-main.js", array(), '', true );
    wp_enqueue_script( 'bundle-main-js' );

}
add_action('wp_enqueue_scripts', 'load_scripts', 10);

