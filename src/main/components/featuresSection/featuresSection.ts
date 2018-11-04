/**
 * this is "featuresSection" TS export class
 * follow workflow instructions
 */

// ------------------------------------------------------------------------- IMPORTS

import './FeaturesSection.scss'
import {FeatureBlock} from "../featureBlock/FeatureBlock";
import {DOMView} from "../../../_common/core/DOMView";

// ------------------------------------------------------------------------- START EXPORT CLASS

export class FeaturesSection extends DOMView
{

    // ------------------------------------------------------------------------- TYPE

    private _featureBlock: FeatureBlock;

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
        this._featureBlock = new FeatureBlock( this.$root.find('.FeatureBlock') );
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

