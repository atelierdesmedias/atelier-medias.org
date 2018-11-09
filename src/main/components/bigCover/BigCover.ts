/**
 * this is "bigCover" TS export class
 * follow workflow instructions
 */

// ------------------------------------------------------------------------- IMPORTS

import {DOMView} from "../../../_common/core/DOMView";
import './BigCover.scss'
//import {eventBanner} from "../eventBanner/eventBanner";
import { TweenLite } from "gsap";
import {breakPoint} from "src/_common/helpers/breakPoint";


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

    protected initComponents()
    {
        // init la taille du container
        this.applyVideoPositionHandler();
    }
    /**
     * prepare events
     * (method overwriting jView and move to constructor via init)
     */
    protected prepareEvents()
    {
        window.addEventListener('resize', this.applyVideoPositionHandler.bind(this))
    }

    /**
     * after Init
     * (method overwriting jView and move to constructor via init)
     */
    protected afterInit()
    {

    }

    // ------------------------------------------------------------------------- HANDLERS

    protected applyVideoPositionHandler () :void
    {
        // utiliser le meme ratio qu'en css pour calculer les grille
        let columnGrid = ($(window).width() / 12);

        // appliquer la taille du container a la video
        TweenLite.set( this.$root,
            {
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

