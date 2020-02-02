<?php
namespace Grav\Plugin;

use Grav\Common\Plugin;

/**
 * Class AdminAddonMediaSortPlugin
 * @package Grav\Plugin
 */
class AdminAddonMediaSortPlugin extends Plugin
{
    /**
     * @return array
     *
     * The getSubscribedEvents() gives the core a list of events
     *     that the plugin wants to listen to. The key of each
     *     array section is the event that the plugin listens to
     *     and the value (in the form of an array) contains the
     *     callable (or function) as well as the priority. The
     *     higher the number the higher the priority.
     */
    public static function getSubscribedEvents()
    {
        return [
            'onPluginsInitialized' => ['onPluginsInitialized', 0]
        ];
    }

    /**
     * Initialize the plugin
     */
    public function onPluginsInitialized()
    {
        if (!$this->isAdmin()) {
            return;
        }

        // Enable the main event we are interested in
        $this->enable([
            'onPagesInitialized'  => ['onTwigExtensions',    0]
        ]);
    }

    /**
     * Load the JavaScripts and Styles.
     */
    public function onTwigExtensions() {
        $page = $this->grav['admin']->page(true);
        if (!$page) {
            return;
        }

        $this->grav['assets']->addCss('plugin://admin-addon-media-sort/admin-addon-media-sort.css', -1000, false);
        $this->grav['assets']->addJs('https://code.jquery.com/ui/1.12.1/jquery-ui.min.js', -1000, false);
        $this->grav['assets']->addJs('plugin://admin-addon-media-sort/admin-addon-media-sort.js', -1000, false);
    }
}
