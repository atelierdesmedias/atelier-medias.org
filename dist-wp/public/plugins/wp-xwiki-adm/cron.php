<?php
// hook called by cron job to launch the sync function
add_action('coworkers_sync_scheduler', 'XWiki_Adm::synchronize_all');

// schedule coworkers sync job
if( !wp_next_scheduled( 'coworkers_sync_scheduler' ) )
{
    wp_schedule_event( time(), 'hourly', 'coworkers_sync_scheduler' );
}
