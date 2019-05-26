/**
 * Set alex properties
 */
module.exports = {

    // assets are served on this url
    url: 'http://localhost:3000/',
    port: 3000,

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

    base: '/',

    dotEnv: Object.assign(
        {},
        require('./default.properties').dotEnv,
        {
            // Activer le mode debug
            WP_ENV: "local",
            WP_DEBUG: "true",

            // Cibler le chemin complet vers point d'entrée wordpress (dist/public)
            // Pas de slash à la fin
            WP_URL: "http://localhost/dist/public",

            // Meme URL que WP url avec "/wordpress" à la fin
            WP_SITEURL: "http://localhost/dist/public/wordpress",

            // Le nom de la base de données
            DB_NAME: "admwp",
        })
};