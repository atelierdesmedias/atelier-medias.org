import {Disposable} from "./Disposable";

export class App extends Disposable
{
    // ------------------------------------------------------------------------- INIT

    /**
     * App constructor.
     * Set pInitSequence if this is an Hot Module Reloading trigger.
     * @param {boolean} pInitSequence if true, will go through init method. If false, it will directly go to prepare and ready.
     * @param {any} pParams optionnel parameters, passed to prepare method.
     */
    constructor ( pParams:any = null)
    {
        // Relay
        super();

        // Init dependencies
        this.initDependencies();

        // Init app willybe
        this.initConfig();

        // Init properties stuff
        this.initEnv();

        // Our app is ready
        this.ready();
    }


    /**
     * Init dependencies
     * Can be overridden.
     */
    protected initDependencies() {}

    /**
     * Init configuration.
     * Can be overridden.
     */
    protected initConfig () {}

    /**
     * Init properties dependent stuff.
     * Can be overridden.
     */
    protected initEnv ():void {}

    /**
     * When all the app is ready
     */
    protected ready ():void {}
}