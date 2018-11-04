/**
 * @Filename: router.js
 * @Description: router pages vue app
 */

// ----------------------------------------------------------------------------- JS IMPORTS

import Vue from 'vue'
import VueRouter from 'vue-router'
// import globalConfig from "../../willybe/global.willybe"


// ----------------------------------------------------------------------------- ROUTER CONFIG

Vue.use(VueRouter);

/**
 * définir les routes
 * @type {VueRouter}
 */
const routes = [

    // redirect
    {
        path: '*',
        redirect:'/',
    },
];

// ----------------------------------------------------------------------------- ROUTER EXPORT

/**
 * stocker l'instance de Vue router dans la constante "router"
 */
const router = new VueRouter({

    // import routes willybe
    routes,

    // mode configuration
    mode: 'history',

    // base: (process.properties.NODE_ENV === 'dev')
    //     ? globalConfig.server.dev.base
    //     : globalConfig.server.staging.base,

});

export default router;