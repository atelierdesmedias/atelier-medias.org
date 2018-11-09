/**
 * this is "mainFooter" TS export class
 * follow workflow instructions
 */

// ------------------------------------------------------------------------- IMPORTS

import './MainFooter.scss'
import {DOMView} from "../../../_common/core/DOMView";
import {SuscribeNewsletter} from "../suscribeNewsletter/SuscribeNewsletter";

// ------------------------------------------------------------------------- START EXPORT CLASS

export class MainFooter extends DOMView
{

    // ------------------------------------------------------------------------- TYPE

    protected _suscribeNewsletter :SuscribeNewsletter;

    // ------------------------------------------------------------------------- INIT

    /**
     * prepare nodes
     */
    protected prepareNodes()
    {

    }

    /**
     * prepare dependencies
     */
    protected prepareDependencies()
    {
        this._suscribeNewsletter = new SuscribeNewsletter( this.$root.find('.MainRooter_suscribeNewsletter') )
    }

    /**
     *  init components
     */
    protected initComponents()
    {

    }

    /**
     * prepare events
     */
    protected prepareEvents()
    {

    }

    /**
     * after Init
     */
    protected afterInit()
    {

    }

    // ------------------------------------------------------------------------- HANDLERS


    // ------------------------------------------------------------------------- END EXPORT CLASS
}

