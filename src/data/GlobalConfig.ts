/**
 * @name: GlobalConfig
 * @description: Add your custom properties here
 * - theses properties were injected in Main.tsx
 */

export class GlobalConfigProperties
{
    // version application
    public version      :string;

    // url of application
    public url		    :string;

    // Base http path to access to the app, from process.properties
    public base		    :string;

    // atom object from less
    public atoms        :any
}

/**
 * Singleton Config class.
 * Do not touch.
 */
export class GlobalConfig extends GlobalConfigProperties
{
    // ------------------------------------------------------------------------- SINGLETON

    // Singleton
    protected static __instance:GlobalConfig;

    /**
     * Get GlobalConfig singleton instance.
     */
    static get instance ()
    {
        // Create instance
        if (GlobalConfig.__instance == null)
        {
            GlobalConfig.__instance = new GlobalConfig();
        }

        // Return singleton instance
        return GlobalConfig.__instance;
    }


    // ------------------------------------------------------------------------- INJECT

    /**
     * Inject arbitrary properties inside this object.
     */
    inject (pProps:any)
    {
        // Check if props are injectable
        if (pProps == null || typeof pProps !== 'object') return;

        // Inject props
        for (let i in pProps)
        {
            this[i] = pProps[i];
        }
    }
}