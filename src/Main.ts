/**
 * @name: Main DOM Class
 * @description: Main entry
 */

import './Main.scss';
import {DOMView} from './helpers/solidify-lib/core/DOMView';
import Logs from './helpers/solidify-lib/core/Logs';
import {GlobalConfig} from './data/GlobalConfig';
import {AppView} from './components/appView/AppView';
import {HomePage} from './pages/homePage/HomePage';

// ----------------------------------------------------------------------------- EXPORT CLASS

export class main extends DOMView {
  // ------------------------------------------------------------------------- TYPE

  private _AppView: AppView;
  private _HomePage: HomePage;

  // ------------------------------------------------------------------------- INIT

  /**
     * after Init

     */
  protected afterInit() {
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
  protected initConfig(): void {
    // Inject current datas via GlobalConfig singleTon
    GlobalConfig.instance.inject({
      // get current version application
      version: require('../package.json').version
    });
  }

  /**
   * Components that are not concatenated in specific page
   */
  protected InitRootComponents(): void {
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

    this._AppView = new AppView(this.$root.find('.AppView'));
  }

  /**
   * Load script depend of pages
   */
  protected showPage(): void {
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
    if (this.$root.find('.HomePage').length) {
      this._HomePage = new HomePage($('.HomePage'));
      console.log('homePage');
    }
  }

  /**
   * Init envName dependent stuff.
   */
  private initEnv(): void {
    // add console.log depend of envName
    Logs.EnvLogs(GlobalConfig.instance.version);
  }
}

// final main instance
new main($('body'));
