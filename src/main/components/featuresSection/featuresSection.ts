/**
 * this is "featuresSection" TS export class
 * follow workflow instructions
 */

// ------------------------------------------------------------------------- IMPORTS

import {jView} from '../../../common/core/jView'
import './featuresSection.scss'
import {featureBlock} from "../featureBlock/featureBlock";

// ------------------------------------------------------------------------- START EXPORT CLASS

export class featuresSection extends jView
{
    private _featureBlock: featureBlock;

    // ------------------------------------------------------------------------- TYPE

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

        // importer le composant feature block (correspond à une icon + son texte associé)
        this._featureBlock = new featureBlock( $('.featureBlock') );
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

