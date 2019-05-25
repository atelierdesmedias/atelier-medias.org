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
     */
    protected prepareNodes()
    {

    }

    /**
     * prepare dependencies
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

