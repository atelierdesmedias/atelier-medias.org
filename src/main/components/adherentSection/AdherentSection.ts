/**
 * this is "adherentSection" TS export class
 * follow workflow instructions
 */

// ------------------------------------------------------------------------- IMPORTS

import {jView} from '../../../common/core/jView'
import './adherentSection.scss'
import {adherentBlock} from "../adherentBlock/adherentBlock";

// ------------------------------------------------------------------------- START EXPORT CLASS

export class adherentSection extends jView
{
    // ------------------------------------------------------------------------- TYPE

    private _adherentBlock: adherentBlock;

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
        // importer adherent block
        this._adherentBlock = new adherentBlock( $('.adherentBlock') );
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

