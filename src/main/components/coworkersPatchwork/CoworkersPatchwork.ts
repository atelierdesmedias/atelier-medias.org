/**
 * this is "coworkersPatchwork" TS export class
 * follow workflow instructions
 */

// ------------------------------------------------------------------------- IMPORTS

import {jView} from '../../../common/core/jView'
import './CoworkersPatchwork.scss'
import {activityFilterBar} from "../activityFilterBar/activityFilterBar";

// ------------------------------------------------------------------------- START EXPORT CLASS

export class coworkersPatchwork extends jView
{

    // ------------------------------------------------------------------------- TYPE

    private _activityFilterBar: activityFilterBar;

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
        this._activityFilterBar = new activityFilterBar( '.activityFilterBar' );
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

