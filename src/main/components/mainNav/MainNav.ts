/**
 * this is "mainNav" TS export class
 * follow workflow instructions
 */

// ----------------------------------------------------------------------------- IMPORTS

import {jView} from '../../../common/core/jView'
import './mainNav.scss'
import {menu} from "../menu/menu";
import {socialBlock} from "../socialBlock/socialBlock";
import {intranetConnection} from "../intranetConnection/intranetConnection";
import {languageBlock} from "../languageBlock/languageBlock";

// ----------------------------------------------------------------------------- START EXPORT CLASS

export class mainNav extends jView
{
    // ------------------------------------------------------------------------- TYPE

    private _socialBlock: socialBlock;
    private _intranetConnection: intranetConnection;
    private _languageBlock: languageBlock;
    private _menu: menu;

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

        // importer la menu
        this._menu = new menu( $('.menu') );

        // importer le social block
        this._socialBlock = new socialBlock( $('.socialBlock') );
        
        // importer le block intranet connection
        this._intranetConnection = new intranetConnection( $('.intranetConnection') );

        // importer le block language
        this._languageBlock = new languageBlock( $('.languageBlock') );

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

