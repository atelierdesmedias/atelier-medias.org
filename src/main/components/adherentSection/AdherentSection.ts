/**
 * this is "adherentSection" TS export class
 * follow workflow instructions
 */

// ------------------------------------------------------------------------- IMPORTS

import './AdherentSection.scss'
import {AdherentBlock} from "../adherentBlock/AdherentBlock";
import {DOMView} from "../../../_common/core/DOMView";

// ------------------------------------------------------------------------- START EXPORT CLASS

export class AdherentSection extends DOMView
{
    // ------------------------------------------------------------------------- TYPE

    private _adherentBlock: AdherentBlock;

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
        this._adherentBlock = new AdherentBlock( this.$root.find('.AdherentBlock') );
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

