/**
 * this is "homePage" TS export class
 * follow workflow instructions
 */

// ------------------------------------------------------------------------- IMPORTS

import {jView} from '../../../common/core/jView'
import './homePage.scss'
import {bigCover} from "../../components/bigCover/bigCover";
import {presentationAdmSection} from "../../components/presentationAdmSection/presentationAdmSection";
import {adherentSection} from "../../components/adherentSection/adherentSection";
import {breakPoint} from '../../../common/helpers/breakPoint';
import {featuresSection} from "../../components/featuresSection/featuresSection";
import {interestSection} from "../../components/interestSection/interestSection";
import {coworkersPatchworkSection} from "../../components/coworkersPatchworkSection/coworkersPatchworkSection";
import {coworkersPresentationSection} from "../../components/coworkersPresentationSection/coworkersPresentationSection";

// ------------------------------------------------------------------------- START EXPORT CLASS

export class homePage extends jView
{
    // ------------------------------------------------------------------------- TYPE

    private _bigCover: bigCover;
    private _coworkersPresentationSection: coworkersPresentationSection;
    private _coworkersPatchworkSection: coworkersPatchworkSection;
    private _presentationAdmSection: presentationAdmSection;
    private _adherentSection: adherentSection;
    private _featuresSection: featuresSection;
    private _interestSection: interestSection;

    private $bigCover: ZeptoCollection;
    private $bigCoverBanner: ZeptoCollection;

    // ------------------------------------------------------------------------- INIT

    /**
     * prepare nodes
     * (method overwriting jView and move to constructor via init)
     */
    protected prepareNodes()
    {
        this.$bigCover = this.$root.find('.bigCover');
        this.$bigCoverBanner = this.$bigCover.find('.bigCover_banner');
    }

    /**
     * prepare dependencies
     * (method overwriting jView and move to constructor via init)
     */
    protected prepareDependencies()
    {
        // inclure la big Cover
        this._bigCover = new bigCover( $('.bigCover') );


        // inclure coworkersPresentationSection
        this._coworkersPresentationSection = new coworkersPresentationSection( $('.coworkersPresentationSection') );

        // inclure coworkersPatchworkSection
        this._coworkersPatchworkSection = new coworkersPatchworkSection( $('.coworkersPatchworkSection') );

        // inclure le texte de présentation 
        this._presentationAdmSection = new presentationAdmSection( $('.presentationAdmSection') );
        
        // inclure la section "adherent"
        this._adherentSection = new adherentSection( $('.adherentSection') );
        
        // inclure features section
        this._featuresSection = new featuresSection( $('.featuresSection') );

        // inclure interest section
        this._interestSection = new interestSection( $('.interestSection') );
        

        
    }

    /**
     * prepare events
     * (method overwriting jView and move to constructor via init)
     */
    protected prepareEvents()
    {

        // cloner la banner de bigCover dans le content de homePage au resize
        // $(window).on('resize', this.moveBannerOnResizeHandler.bind(this));
    }

    /**
     * after Init
     * (method overwriting jView and move to constructor via init)
     */
    protected afterInit()
    {

    }

    // ------------------------------------------------------------------------- HANDLERS

    // moveBannerOnResizeHandler ()
    // {
    //     if (!breakPoint('medium'))
    //     {
    //         console.log('clone');
    //         this.$bigCoverBanner.clone().addClass('clone');
    //         let $clone = this.$root.find('.clone');
    //         $clone.prepend(this.$root);
    //
    //         console.log($clone);
    //
    //
    //     } else
    //     {
    //
    //     }
    // }

    // ------------------------------------------------------------------------- CONFIG

    // ------------------------------------------------------------------------- END EXPORT CLASS
}

