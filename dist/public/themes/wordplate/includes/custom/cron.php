<?php
// schedule coworkers sync job
if( !wp_next_scheduled( 'coworkers_sync_scheduler' ) )
{
    wp_schedule_event( time(), 'hourly', 'coworkers_sync_scheduler' );
}
