/**
 * this is "mainHeader" TS export class
 * follow workflow instructions
 */

// ------------------------------------------------------------------------- IMPORTS

import {jView} from '../../../common/core/jView'
import './mainHeader.scss'
import {mainNav} from "../mainNav/mainNav";
import {hamburgerButton} from "../hamburgerButton/hamburgerButton";
import {TweenLite} from "gsap";
import {breakPoint} from '../../../common/helpers/breakPoint';


// States de la mainNav Handler
enum EToggleMainNavHandler
{
    OPEN,
    CLOSE,
    TOGGLE
}

// ------------------------------------------------------------------------- START EXPORT CLASS

export class mainHeader extends jView
{
    // ------------------------------------------------------------------------- LOCALS

    // état de l'ouverture
    private _isOpen = false;

    // ------------------------------------------------------------------------- TYPE

    private _hamburgerButton: hamburgerButton;
    private _mainNav: mainNav;


    // hamburger Button
    private $hamburgerButton: ZeptoCollection;
    private $lineTop: ZeptoCollection;
    private $lineCenter: ZeptoCollection;
    private $lineBottom: ZeptoCollection;
    private $mainNav: ZeptoCollection;


    // ------------------------------------------------------------------------- INIT

    /**
     * prepare nodes
     * (method overwriting jView and move to constructor via init)
     */
    protected prepareNodes()
    {

        // ciblier le mainNav
        this.$mainNav            = this.$root.find('.mainNav');

        // cibler le hamburger bouton qui se trouve dans ce composant
        this.$hamburgerButton   = this.$root.find('.hamburgerButton');
        this.$lineTop           = this.$hamburgerButton.find('.hamburgerButton_line-top');
        this.$lineCenter        = this.$hamburgerButton.find('.hamburgerButton_line-center');
        this.$lineBottom        = this.$hamburgerButton.find('.hamburgerButton_line-bottom');
    }

    /**
     * prepare dependencies
     * (method overwriting jView and move to constructor via init)
     */
    protected prepareDependencies()
    {
        // importer le hamburger button
        this._hamburgerButton = new hamburgerButton( $('.hamburgerButton') );

        // inclure le main menu
        this._mainNav = new mainNav( $('.mainNav') );
    }

    /**
     * prepare events
     * (method overwriting jView and move to constructor via init)
     */
    protected prepareEvents()
    {
        // changer l'affichage de la mainNav en function du click hamburger Button
        this.$hamburgerButton.click( () =>
        {
            // passer la methode toggle mainNav avec le param toggle
            this.changeStateMainNavHandler( EToggleMainNavHandler.TOGGLE )
        });

        // reset le state de la mainNav en function du reszie
        // si mobile : le reset est de cacher le mainNav
        // si laptop : le reset est de montrer le mainNav
        $(window).on('resize', this.resetMainNavStateHandler.bind(this));
    }

    /**
     * after Init
     * (method overwriting jView and move to constructor via init)
     */
    protected afterInit()
    {

    }

    // ------------------------------------------------------------------------- HANDLERS

    /**
     * Mobile toggle
     */
    protected changeStateMainNavHandler ( pState: EToggleMainNavHandler )
    {

        if ( pState == EToggleMainNavHandler.TOGGLE )
        {
            // toggle du state
            this._isOpen = !this._isOpen;
        }
        else if ( pState == EToggleMainNavHandler.OPEN )
        {
            // passer open à true
            this._isOpen = true;
        }
        else  if ( pState == EToggleMainNavHandler.CLOSE )
        {
            // passer open à false (cacher le mainNav)
            this._isOpen = false;
        }

        // animer l'apparition de la mainNav
        this.mainNavAnim();

        // changer l'affichage des lignes du hamburger button
        this.hamburgerButtonLinesAnim();
    }

    /**
     * Reset le state du mainNav
     * si mobile : le reset est de cacher le mainNav
     * si laptop : le reset est de montrer le mainNav
     */
    protected resetMainNavStateHandler()
    {
        // si plus grand que large
        breakPoint('large')
            // monter le mainNav
            ? this.changeStateMainNavHandler( EToggleMainNavHandler.OPEN )
            // cacher le mainNav
            : this.changeStateMainNavHandler( EToggleMainNavHandler.CLOSE );

    }

    // ------------------------------------------------------------------------- ANIM

    /**
     * Animer la mainNav en function du state
     */
    protected mainNavAnim () :void
    {
        // animer l'apparition
        TweenLite.to(this.$mainNav, .3, {
            autoAlpha: this._isOpen ? 1 : 0
        });
    }

    /**
     * animation des lignes du hamburger Button
     */
    protected hamburgerButtonLinesAnim () :void
    {
        let pDuration:number = 0.6;

        // animation des "lines" du HamburgerButton
        TweenLite.to(this.$lineTop, pDuration * 0.3, {
            rotation: this._isOpen ? 43 : 0,
            top: this._isOpen ? 6 : 0,
            // ease: Power3.easeInOut
        });

        TweenLite.to(this.$lineCenter, pDuration * 0.3, {
            opacity: this._isOpen  ? 0 : 1,
            // ease: Power3.easeInOut
        });
        TweenLite.to(this.$lineBottom, pDuration * 0.3, {
            rotation: this._isOpen ? -43 : 0,
            bottom: this._isOpen ? 8 : 0,
            // ease: Power3.easeInOut
        });
    }


    // ------------------------------------------------------------------------- END EXPORT CLASS
}

