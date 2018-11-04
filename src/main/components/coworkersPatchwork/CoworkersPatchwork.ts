/**
 * this is "coworkersPatchwork" TS export class
 * follow workflow instructions
 */

// ------------------------------------------------------------------------- IMPORTS

import './CoworkersPatchwork.scss'
import {ActivityFilterBar} from "../activityFilterBar/ActivityFilterBar";
import {DOMView} from "../../../_common/core/DOMView";

// ------------------------------------------------------------------------- START EXPORT CLASS

export class CoworkersPatchwork extends DOMView
{

    // ------------------------------------------------------------------------- TYPE

    private _activityFilterBar: ActivityFilterBar;

    // ------------------------------------------------------------------------- INIT

    /**
     * prepare nodes
     * (method overwriting jView and move to constructor via init)
     */
    protected prepareNodes()
    {

    }

    /**
     * prepare dependencies
     * (method overwriting jView and move to constructor via init)
     */
    protected prepareDependencies()
    {

        // importer la bar filter coworker en fonction des métiers
        this._activityFilterBar = new ActivityFilterBar( this.$root.find('.ActivityFilterBar') );
    }

    /**
     * prepare events
     * (method overwriting jView and move to constructor via init)
     */
    protected prepareEvents()
    {

    }

    /**
     * after Init
     * (method overwriting jView and move to constructor via init)
     */
    protected afterInit()
    {

    }

    // ------------------------------------------------------------------------- HANDLERS


    // ------------------------------------------------------------------------- END EXPORT CLASS
}

