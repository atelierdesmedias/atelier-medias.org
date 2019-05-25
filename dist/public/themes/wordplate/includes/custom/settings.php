<?php
// add custom settings in "General" tab of wordpress admin
function adm_settings_api_init() {
    // Add the section to reading settings so we can add our
    // fields to it
    add_settings_section(
        'adm_setting_section',
        'Paramètres ADM',
        'adm_setting_section_callback_function',
        'general'
    );

    // Add the field with the names and function to use for our new
    // settings, put it in our new section
    add_settings_field(
        'adm_coworkers_url',
        'URL de synchronisation des coworkers',
        'adm_coworkers_url_callback_function',
        'general',
        'adm_setting_section'
    );

    // Register our setting so that $_POST handling is done for us and
    // our callback function just has to echo the <input>
    register_setting( 'general', 'adm_coworkers_url' );
} // ads_settings_api_init()

add_action( 'admin_init', 'adm_settings_api_init' );


// ------------------------------------------------------------------
// Settings section callback function
// ------------------------------------------------------------------
//
// This function is needed if we added a new section. This function
// will be run at the start of our section
//

function adm_setting_section_callback_function() {
    echo '<p>Paramètres spécifiques de l\'ADM</p>';
}

// ------------------------------------------------------------------
// Callback function for our example setting
// ------------------------------------------------------------------
//
// creates a checkbox true/false option. Other types are surely possible
//

function adm_coworkers_url_callback_function() {
    echo '<input name="adm_coworkers_url" id="adm_coworkers_url" type="text" value="'.get_option( 'adm_coworkers_url' ).'" class="code">';

    if ($_GET['settings-updated'] == 'true') {
        sync_coworkers();
    }
}
