<?php

class XWiki_Adm_Sync {

    private static $coworkers = array();

    private static $connection_valid;

    private static $initialized = false;

    public static function init()
    {
        if (!self::$initialized) {
            add_action('admin_menu', function () {

                self::handle_form();

                // Add a new submenu under Tools:
                add_management_page(
                    __('XWiki ADM Sync', 'xwiki-adm-sync'),
                    __('XWiki ADM Sync', 'xwiki-adm-sync'),
                    'manage_options',
                    'xwiki-adm-sync',
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
        if(!empty($_POST['action']) && $_POST['action'] == 'sync_coworkers') {
            self::$coworkers = XWiki_Adm::synchronize_all();
        }
    }

    /**
     * Renders the sync tool template
     */
    private static function render()
    {
        self::$connection_valid = XWiki_Adm::test_connection();

        $tpl_folder = __DIR__ . '/../views/';

        $render = function ($tpl)  {
            $coworkers = self::$coworkers;
            $connection_valid = self::$connection_valid;
            include $tpl;
        };

        $render($tpl_folder . 'sync.php');
    }

} 