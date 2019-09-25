import {Disposable} from './Disposable';

/**
 * This is a simple DOM based view.
 */
export class DOMView extends Disposable {
  // ------------------------------------------------------------------------- DOM

  // Starting node of our component
  $root: any;

  // ------------------------------------------------------------------------- INIT

  /**
   * DOMView constructor.
   * Set component's root. If not defined, can still be targeted trough targetRoot middleWare.
   * @param $pRoot Component's root. If not defined, can still be targeted trough targetRoot middleWare.
   * @param pAutoInit Will launch init phase if true. Else, child component have to init manually.
   */
  constructor($pRoot: any = null, pAutoInit = true) {
    // Relay
    super();

    // Set root from parameter
    if ($pRoot != null) {
      this.$root = $pRoot;
    }

    // Initialise if needed
    pAutoInit && this.init();
  }

  /**
   * Start init sequence
   */
  protected init() {
    this.targetRoot();
    this.prepareNodes();
    this.prepareDependencies();
    this.beforeInit();
    this.initComponents();
    this.prepareEvents();
    this.afterInit();
  }

  /**
   * Target our root if not already defined via constructor params
   */
  protected targetRoot() {}

  /**
   * Prepare node targeting from $root
   */
  protected prepareNodes() {}

  /**
   * Prepare dependencies with DependenciyManager
   */
  protected prepareDependencies() {}

  /**
   * Middleware called just before init sequence
   */
  protected beforeInit() {}

  /**
   * Init components
   */
  protected initComponents() {}

  /**
   * Prepare events
   */
  protected prepareEvents() {}

  /**
   * Middleware called just after init sequence
   */
  protected afterInit() {}
}
