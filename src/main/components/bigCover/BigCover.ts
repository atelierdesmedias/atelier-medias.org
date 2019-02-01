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
        // init la taille du container
        this.applyVideoPositionHandler();
    }
    /**
     * prepare events
     */
    protected prepareEvents()
    {
        window.addEventListener('resize', this.applyVideoPositionHandler.bind(this))
    }

    /**
     * after Init
     */
    protected afterInit()
    {

    }

    // ------------------------------------------------------------------------- HANDLERS

    /**
     * Appliquer une taille au container video
     */
    protected applyVideoPositionHandler () :void
    {
        // utiliser le meme ratio qu'en css pour calculer les grille
        let columnGrid = ($(window).width() / 12);

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
        window.removeEventListener('resize', this.applyVideoPositionHandler.bind(this))
    }


}

