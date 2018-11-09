/**
 * this is "homePage" TS export class
 * follow workflow instructions
 */

// ------------------------------------------------------------------------- IMPORTS

import {DOMView} from "../../../_common/core/DOMView";
import './HomePage.scss'
import {BigCover} from "../../components/bigCover/BigCover";
import {CoworkersPresentation} from "../../components/coworkersPresentation/CoworkersPresentation";
import {CoworkersPatchwork} from "../../components/coworkersPatchwork/CoworkersPatchwork";
import {AdmPresentation} from "../../components/admPresentation/AdmPresentation";
import {AdherentSection} from "../../components/adherentSection/AdherentSection";
import {FeaturesSection} from "../../components/featuresSection/featuresSection";
import {InterestSection} from "../../components/interestSection/InterestSection";
import {breakPoint} from '../../../_common/helpers/breakPoint';

// ------------------------------------------------------------------------- START EXPORT CLASS

export class HomePage extends DOMView
{
    // ------------------------------------------------------------------------- TYPE

    private _bigCover: BigCover;

    private _coworkersPresentation: CoworkersPresentation;
    private _coworkersPatchworkSection: CoworkersPatchwork;
    private _admPresentation: AdmPresentation;
    private _adherentSection: AdherentSection;
    private _featuresSection: FeaturesSection;
    private _interestSection: InterestSection;

    private $bigCover: ZeptoCollection;
    private $bigCoverBanner: ZeptoCollection;

    // ------------------------------------------------------------------------- INIT

    /**
     * prepare nodes
     *
     */
    protected prepareNodes()
    {
        this.$bigCover = this.$root.find('.BigCover');
        this.$bigCoverBanner = this.$bigCover.find('.BigCover_banner');
    }

    /**
     * prepare dependencies
     *
     */
    protected prepareDependencies()
    {
        // inclure la big Cover
        this._bigCover = new BigCover( this.$root.find('.BigCover') );

        // inclure coworkersPresentation
        this._coworkersPresentation = new CoworkersPresentation( this.$root.find('.CoworkersPresentation') );

        // inclure coworkersPatchwork
        this._coworkersPatchworkSection = new CoworkersPatchwork( this.$root.find('.CoworkersPatchwork') );

        // inclure le texte de présentation
        this._admPresentation = new AdmPresentation( this.$root.find('.AdmPresentation') );

        // inclure la section "adherent"
        this._adherentSection = new AdherentSection( this.$root.find('.AdherentSection') );

        // inclure features section
        this._featuresSection = new FeaturesSection( this.$root.find('.FeaturesSection') );

        // inclure interest section
        this._interestSection = new InterestSection( this.$root.find('.InterestSection') );
        

        
    }

    /**
     * prepare events
     *
     */
    protected prepareEvents()
    {

        // cloner la banner de bigCover dans le content de homePage au resize
        $(window).on('resize', this.moveBannerOnResizeHandler.bind(this));
    }

    /**
     * after Init
     *
     */
    protected afterInit()
    {

    }

    // ------------------------------------------------------------------------- HANDLERS

    moveBannerOnResizeHandler ()
    {
        // if (!breakPoint('medium'))
        // {
        //     //console.log('clone');
        //     this.$bigCoverBanner.clone().addClass('clone');
        //     let $clone = this.$root.find('.clone');
        //     $clone.prepend(this.$root);
        //
        //     console.log($clone);
        //
        //
        // } else
        // {
        //
        // }
    }

    // ------------------------------------------------------------------------- CONFIG

    // ------------------------------------------------------------------------- END EXPORT CLASS
}

