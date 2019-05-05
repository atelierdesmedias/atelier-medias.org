/**
 * Set staging properties
 */
module.exports = {

    /**
     * Application base.
     *
     * - Set path from domain name to application. Starting and ending with slash.
     * - ex :
     *        If application is installed here : http://domain.com/my-sub-folder/my-app/
     *        Base should be : "/my-sub-folder/my-app/"
     * - ex :
     *        If application is installed here : http://domain.com/
     *        Base should be : "/"
     */

    base: '/adm/adm-v2/dist/public/',

    // assets are serve on this url
    // keep relative URL about staging and production
    url: '/',

    /**
     * Les propriété du dotEnv.
     * Va overrider les propriété par défauts
     */
    dotEnv: Object.assign(
        {},
        require('./default.properties').dotEnv,
        {
            // Activer le mode debug
            WP_ENV: "local",
            WP_DEBUG: "true",

            // Cibler le chemin complet vers point d'entrée wordpress (dist/public)
            // Pas de slash à la fin
            // TODO à revoir en fonction de la création sous-domaine
            WP_URL: "http://staging.atelier-media.org",
            WP_SITEURL:"http://staging.atelier-media.org",

            // Le nom de la base de données
            DB_NAME: "admwpstaging",
        }
    )
};
