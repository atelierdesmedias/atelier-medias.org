/**
 * this is "mainNav" TS export class
 * follow workflow instructions
 */

// ----------------------------------------------------------------------------- IMPORTS

import './MainNav.scss'
import {DOMView} from "../../../_common/core/DOMView";
import {Menu} from "../menu/Menu";
import {SocialBlock} from "../socialBlock/SocialBlock";
import {IntranetConnection} from "../intranetConnection/IntranetConnection";
import {LanguageBlock} from "../languageBlock/LanguageBlock";

// ----------------------------------------------------------------------------- START EXPORT CLASS

export class MainNav extends DOMView
{
    // ------------------------------------------------------------------------- TYPE

    private _menu: Menu;
    private _socialBlock: SocialBlock;
    private _intranetConnection: IntranetConnection;
    private _languageBlock: LanguageBlock;

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

        // importer la menu
        this._menu = new Menu( this.$root.find('.Menu') );

        // importer le social block
        this._socialBlock = new SocialBlock( this.$root.find('.SocialBlock') );
        
        // importer le block intranet connection
        this._intranetConnection = new IntranetConnection( this.$root.find('.IntranetConnection') );

        // importer le block language
        this._languageBlock = new LanguageBlock( this.$root.find('.LanguageBlock') );

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

