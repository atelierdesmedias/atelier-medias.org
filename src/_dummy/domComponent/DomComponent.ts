/**
 * this is "DomComponent" TS export class
 * follow workflow instructions
 */

// ------------------------------------------------------------------------- IMPORTS

import {DOMView} from "../../helpers/solidify-lib/core/DOMView";
import './DomComponent.less'

// ------------------------------------------------------------------------- START EXPORT CLASS

export class DomComponent extends DOMView
{

    private $title: ZeptoCollection;
    private $header: ZeptoCollection;

    // ------------------------------------------------------------------------- INIT

    /**
     * Target our root if not already defined via constructor params

     */
    protected targetRoot ()
    {
        /**
         * si le $root n'est pas défini comme param, on peut le définir ici
         *
         * this.$root = $('.maClassRoot');
         */
    }
    /**
     * prepare nodes

     */
    protected prepareNodes()
    {
        /**
         * this.$root
         * -> correspond au param passé à l'instance de "DomComponent" dans react-main.ts
         * Penser à cibler tous les élements enfants de ce composant "DomComponent" depuis ce noeud de DOM
         *
         * ex :
         *  - Je souhaite cibler le titre (Element de DomComponent), pour cela, je recherche le noeud enfant
         *  via "find" qui porte la class ...
         *
         *  this.$title = this.$root.find('.DomComponent_title');
         *
         *  Pour finir, Typer la nouvelle variable this.$title
         *  (tricks pour les utilisateurs de phpStorm ou Intellij : cliquer sur la variable à typer, puis "alt + Enter"
         *
         *  Il est maintenant possible d'utiliser "this.$title" dans toutes les méthodes ci dessous
         */

        // this.$title = this.$root.find('.DomComponent_title');
        // console.log(this.$title);
        // this.$header = this.$root.find('.DomComponent_header');
    }


    /**
     * prepare dependencies

     */
    protected prepareDependencies()
    {

        /**
         * Ici on instancie les méthodes les composants que l'on veut utiliser dans cette class
         */
    }

    /**
     * prepare events

     */
    protected prepareEvents()
    {
        /**
         * Dans cette méthode, lier les methods handler à leur event respectif
         *
         *  ex :
         *      - je veux executer la methode "newConsoleLogHandler" à chaque évenement "resize" :
         *
         *      $(window).on('resize', this.newConsoleLogHandler.bind(this));
         *
         * IMPORTANT : bien penser à "binder" this au contexte extérieur à l'event, sans quoi,
         * "this" fera référence a son contexte courant.
         *
         */

        $(window).on('resize', this.newConsoleLogHandler.bind(this));
    }

    /**
     * after Init

     */
    protected afterInit()
    {

    }

    // ------------------------------------------------------------------------- HANDLERS

    /**
     * Ici, on créé les méthodes "Handler" qui sont liées à des events
     */

    /**
     * new Console Log Handler
     * Cette méthode lance un console log à chaque evenement choisi
     */
    protected newConsoleLogHandler()
    {
        console.log('coucou, je suis un console log');
    }

    // ------------------------------------------------------------------------- END EXPORT CLASS
}

