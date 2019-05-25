/**
 * this is "bigCover" TS export class
 * follow workflow instructions
 */

// ------------------------------------------------------------------------- IMPORTS

import {DOMView} from "../../../_common/core/DOMView";
import './BigCover.scss'
import { TweenLite } from "gsap";
import {breakPoint} from "src/_common/helpers/breakPoint";
import {EventBanner} from "../eventBanner/EventBanner";

// ------------------------------------------------------------------------- START EXPORT CLASS

export class BigCover extends DOMView
{
    // ------------------------------------------------------------------------- TYPE

    private _eventBanner: EventBanner;
    private $video: ZeptoCollection;

    // ------------------------------------------------------------------------- INIT

    /**
     * prepare nodes
     */
    protected prepareNodes()
    {
        // la video qui tourne en boucle
        this.$video = this.$root.find('.BigCover_video');
    }

    /**
     * prepare dependencies
     */
    protected prepareDependencies()
    {
        // importer event Banner
        this._eventBanner = new EventBanner( this.$root.find('.EventBanner') );
    }

    protected initComponents()
    {
        // init la taille du container video
        this.videoSize();
    }
    /**
     * prepare events
     */
    protected prepareEvents()
    {
        // écouter le resize
        window.addEventListener('resize', ()=> this.resizeHandler() );
    }

    /**
     * after Init
     */
    protected afterInit()
    {

    }

    // ------------------------------------------------------------------------- HANDLERS


    /**
     * Action au resize
     */
    protected resizeHandler = ():void =>
    {
        // Appliquer une taille au container video
        this.videoSize();
    };


    /**
     * Appliquer une taille au container video
     */
    protected videoSize () :void
    {
        // utiliser le meme ratio qu'en css pour calculer les grille
        const columnGrid = ($(window).width() / 12);

        // appliquer la taille du container a la video
        TweenLite.set( this.$root, {
            // hauteur de la video
            height:
                breakPoint('large')
                    ? $(window).height() - ((columnGrid * 0.65) * 2)
                    : $(window).height()
        })

    }

    // ------------------------------------------------------------------------- DISPOSE

    public dispose () :void
    {
        // supprimer l'écoute de l'event
        window.removeEventListener('resize', this.resizeHandler)
    }


}

