/**
 * @name: Main
 * @description: Main entry ts bundle
 */

// ----------------------------------------------------------------------------- INLINE STYLE

import './Main.scss';

// ----------------------------------------------------------------------------- JS IMPORT

// import react
import React from "react";
import ReactDOM from "react-dom";
import AppView from ".//components/appView/AppView";
import {App} from "../_common/core/App";
import {EnvUtils} from "solidify-lib/utils/EnvUtils";
import Logs from "../_common/core/Logs";
import {GlobalConfig} from "../_common/data/GlobalConfig";

// Get current properties
const envName = require(`../../properties/.envName`);
const currentProperties = require(`../../properties/${envName}.properties.js`);

// ----------------------------------------------------------------------------- REACT INSTANCE


export class ReactMain extends App
{

    // ------------------------------------------------------------------------- INIT
    /**
     * Initialisation des dépendances transverses de l'appView
     */
    protected initDependencies () { }

    /**
     * Init de la configuration
     */
    protected initConfig ()
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
     * Init properties dependent stuff.
     */
    protected initEnv ():void
    {
        // Will add properties detection classes helpers to the body
        EnvUtils.addClasses();

        // add console.log depend of properties
        Logs.EnvLogs('react-main bundle');
    }

    /**
     * When everything is ready
     */
    protected ready ()
    {
        ReactDOM.render(
            <AppView />,
            document.getElementById("AppContainer")
        );
    }

}

// Main instance AppView
new ReactMain();

