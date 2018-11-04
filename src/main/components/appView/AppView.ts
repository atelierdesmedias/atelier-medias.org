/**
 * this is "app" TS export class
 * follow workflow instructions
 */

// ------------------------------------------------------------------------- IMPORTS

import './AppView.scss'
import {DOMView} from '../../../_common/core/DOMView'
import {MainHeader} from "../mainHeader/MainHeader";
import {MainFooter} from "../mainFooter/MainFooter";

// ------------------------------------------------------------------------- START EXPORT CLASS

export class AppView extends DOMView
{
    // ------------------------------------------------------------------------- TYPE

    private _mainHeader: MainHeader;
    private _mainFooter: MainFooter;

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
        // importer le main header
        this._mainHeader = new MainHeader( this.$root.find('.MainHeader') );

        // importer le main footer
        this._mainFooter = new MainFooter( this.$root.find('.MainFooter') );
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

