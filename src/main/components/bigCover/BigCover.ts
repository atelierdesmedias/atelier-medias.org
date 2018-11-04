/**
 * this is "bigCover" TS export class
 * follow workflow instructions
 */

// ------------------------------------------------------------------------- IMPORTS

import {DOMView} from "../../../_common/core/DOMView";
import './BigCover.scss'
//import {eventBanner} from "../eventBanner/eventBanner";
import { TweenLite } from "gsap";



// ------------------------------------------------------------------------- START EXPORT CLASS

export class BigCover extends DOMView
{

    // ------------------------------------------------------------------------- TYPE

    // private _eventBanner: eventBanner;
    private $video: ZeptoCollection;


    // ------------------------------------------------------------------------- INIT

    /**
     * prepare nodes
     * (method overwriting jView and move to constructor via init)
     */
    protected prepareNodes()
    {
        // la video qui tourne en boucle
        this.$video = this.$root.find('.BigCover_video');
    }

    /**
     * prepare dependencies
     * (method overwriting jView and move to constructor via init)
     */
    protected prepareDependencies()
    {
        // importer event Banner
        // this._eventBanner = new eventBanner( $('.eventBanner') );
    }

    /**
     * prepare events
     * (method overwriting jView and move to constructor via init)
     */
    protected prepareEvents()
    {
        window.addEventListener('resize', this.applyVideoHeightHandler.bind(this))
    }

    /**
     * after Init
     * (method overwriting jView and move to constructor via init)
     */
    protected afterInit()
    {
        // init la taille du container
        this.applyVideoHeightHandler();
    }

    // ------------------------------------------------------------------------- HANDLERS

    protected applyVideoHeightHandler () :void
    {
        // appliquer la taille du container a la video
        // pour qu'elle fasse toujours 100% de hauteur
        TweenLite.set( this.$root, {
            height: $(window).height()
        })


    }

    // ------------------------------------------------------------------------- DISPOSE

    public dispose () :void
    {
        // supprimer l'écoute de l'event
        window.removeEventListener('resize', this.applyVideoHeightHandler.bind(this))
    }


}

