/**
 * this is "coworkersPatchwork" TS export class
 * follow workflow instructions
 */

// ------------------------------------------------------------------------- IMPORTS

import './CoworkersPatchwork.scss'
import {ActivityFilterBar} from "../activityFilterBar/ActivityFilterBar";
import {DOMView} from "../../helpers/solidify-lib/core/DOMView";

// ------------------------------------------------------------------------- START EXPORT CLASS

export class CoworkersPatchwork extends DOMView
{

    // ------------------------------------------------------------------------- TYPE

    private _activityFilterBar: ActivityFilterBar;

    // ------------------------------------------------------------------------- INIT

    /**
     * prepare nodes
     *
     */
    protected prepareNodes()
    {

    }

    /**
     * prepare dependencies
     *
     */
    protected prepareDependencies()
    {

        // importer la bar filter coworker en fonction des métiers
        this._activityFilterBar = new ActivityFilterBar( this.$root.find('.ActivityFilterBar') );
    }

    /**
     * prepare events
     *
     */
    protected prepareEvents()
    {

    }

    /**
     * after Init
     *
     */
    protected afterInit()
    {

    }

    // ------------------------------------------------------------------------- HANDLERS


    // ------------------------------------------------------------------------- END EXPORT CLASS
}

