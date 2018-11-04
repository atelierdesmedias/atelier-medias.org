/**
 * @Filename: store.js
 * @Description:
 */


// ----------------------------------------------------------------------------- IMPORTS

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// ----------------------------------------------------------------------------- STORE

let store = new Vuex.Store({

    modules: {

    },

});

global.store = store;

// exporter le store
export default store;