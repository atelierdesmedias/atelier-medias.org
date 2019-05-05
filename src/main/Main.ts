/**
 * @name: Main DOM Class
 * @description: Main entry from "main" bundle
 */

// import main style configuration
import './Main.scss'

import {DOMView} from "../_common/core/DOMView";
import {EnvUtils} from "solidify-lib/utils/EnvUtils";
import Logs from "../_common/core/Logs";
import {GlobalConfig} from "../_common/data/GlobalConfig";
import {AppView} from "./components/appView/AppView";
import {HomePage} from "./pages/homePage/HomePage";
// Get current properties
const envName = require(`../../properties/.envName`);
const currentProperties = require(`../../properties/${envName}.properties.js`);

// ----------------------------------------------------------------------------- EXPORT CLASS

export class main extends DOMView
{

    // ------------------------------------------------------------------------- TYPE

    private _AppView: AppView;
    private _HomePage: HomePage;

    // ------------------------------------------------------------------------- INIT

    /**
     * after Init

     */
    protected afterInit()
    {
        // push some informations in globalConfilg
        this.initConfig();

        // load scripts depend of the page page
        this.showPage();

        // load root components
        this.InitRootComponents();

        // init envName
        this.initEnv();
    }

    // ------------------------------------------------------------------------- FINAL

    /**
     * Push some informations in globalConfilg
     */
    protected initConfig ():void
    {

        // Inject current datas via GlobalConfig singleTon
        GlobalConfig.instance.inject({

            // get current version application
            version: require('../../package.json').version,

            // get current url depend of properties
            url: currentProperties.url,

            // get current base url depend of properties
            base: currentProperties.base,

        });
    }


    /**
     * Components that are not concatenated in specific page
     */
    protected InitRootComponents ():void
    {
        /**
         * instance d'un composant
         * @description: penser à passer en param l'objet zepto relatif à la class principale du composant
         * cela permet de cibler ce block via "this.$root" à l'interieur du .ts du composant instancié
         *
         * ex :
         *  - si le composant à instancier est "Menu",
         *  passer en param d'instance - $('.Menu')
         *
         * @doc: http://zeptojs.com/
         */

        this._AppView = new AppView( this.$root.find('.AppView') );

    }

    /**
     * Load script depend of pages
     */
    protected showPage ():void
    {
        /**
         * instance d'une page
         * @type {homePage}
         * @private
         * @description: penser à passer en param l'objet zepto relatif à la class principale du composant
         * cela permet de cibler ce block via "this.$root" à l'interieur du .ts du composant instancié
         *
         * ex :
         *  - si le composant page à instancier est "HomePage" :
         *  this._HomePage = new HomePage( $('.HomePage') );
         *  passer en param d'instance - $('.HomePage')
         *
         * @doc: http://zeptojs.com/
         */

        // si Home Page
        if ( this.$root.find('.HomePage').length )
        {
            this._HomePage = new HomePage( $('.HomePage') );
            console.log('homePage');
        }

    }

    /**
     * Init envName dependent stuff.
     */
    private initEnv ():void
    {
        // Will add envName detection classes helpers to the body.
        EnvUtils.addClasses();

        // add console.log depend of envName
        Logs.EnvLogs("main");

    }

}

// final main instance
new main( $('body') );
