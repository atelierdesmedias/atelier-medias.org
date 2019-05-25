<?php

declare(strict_types=1);

// -----------------------------------------------------------------------------  DEP

// path to coworkers yml file
define('COWORKERS_YAML', __DIR__ . '/data/coworkers.yml');

// add custom settings in admin
include(__DIR__.'/includes/custom/settings.php');

// load custom sync function
include(__DIR__.'/includes/custom/sync.php');

// schedule custom cron jobs
include(__DIR__.'/includes/custom/cron.php');

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
        // this is where you can register custom post types
    }

    function register_taxonomies()
    {
        // this is where you can register custom taxonomies
    }

    function add_to_context( $context )
    {
        // TODO: si multi-langue, charger le dico EN
        // TODO: et conditionner le chargement en fonction de la langue choisie
        // ajouter le dico
        $dico = Yaml::parseFile(__DIR__ . '/data/french.yml');
        $context['dico'] = $dico;

        // menu
        $context['menu'] = new Timber\Menu('menu');

        // site context
        $context['site'] = $this;

        // coworkers context
        $context['coworkers'] = [];

        // si le fichier yaml exist
        if (file_exists(COWORKERS_YAML))
        {
            // parser le yaml
            $coworkers = Yaml::parseFile(COWORKERS_YAML);

            // si c'est bien un tableau
            if (is_array($coworkers)) {
                // injecter les datas dans context
                $context['coworkers'] = $coworkers;
            }
        }

        // retourner le context
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
    if ($ENV !== 'dev')
    {
        // register CSS script
        wp_register_style( 'bundle-main-css', $CURRENT_ENV_URL."assets/bundle-main.css" , array(), '', 'all' );
        wp_enqueue_style( 'bundle-main-css' );
    }

    // register JS script
    wp_register_script( 'bundle-main-js', $CURRENT_ENV_URL."assets/bundle-main.js", array(), '', true );
    wp_enqueue_script( 'bundle-main-js' );
}
add_action('wp_enqueue_scripts', 'load_scripts');


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

function my_deregister_scripts()
{
    wp_deregister_script( 'wp-embed' );
    wp_deregister_script('jquery');
}
add_action( 'wp_footer', 'my_deregister_scripts' );

