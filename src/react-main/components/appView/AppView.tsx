/**
 * @name: appView.tsx
 * @description: react-main component of the application
 *  https://github.com/ReactTraining/react-router
 *
 */
import React from "react";
import {ReactView} from "../../../_common/core/ReactView";
import { hot } from 'react-hot-loader'
import './AppView.scss';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainMenu from "../mainMenu/MainMenu";
import NotFoundPage from "../../pages/notFoundPage/NotFoundPage";
import ContactPage from "../../pages/contactPage/ContactPage";
import HomePage from "../../pages/homePage/HomePage";
import {GlobalConfig} from "../../../_common/data/GlobalConfig";

// -----------------------------------------------------------------------------  STRUCT

export interface Props { }

export interface States { }

// -----------------------------------------------------------------------------  EXPORT CLASS

class AppView extends ReactView<Props, States>
{

    // -------------------------------------------------------------------------  INIT

    prepare ()
    {
        // Init state here, you can set from props
        this.initState({
            // ...
        });

    }

    // -------------------------------------------------------------------------  RENDER

    render()
    {
        return <div className="AppView" ref="root">
                    <BrowserRouter>
                        <div className="AppView_router">
                            <MainMenu className="AppView_mainMenu" />
                            <Switch>
                                <Route
                                    path={ GlobalConfig.instance.base }
                                    component={ HomePage }
                                    exact
                                />
                                <Route
                                    path={`${GlobalConfig.instance.base }contact`}
                                    component={ ContactPage }
                                />
                                {/* Not Found : importer le composant si aucun route match */}
                                <Route
                                    component={ NotFoundPage }
                                />
                            </Switch>
                        </div>
                    </BrowserRouter>
                </div>
    }

    // -------------------------------------------------------------------------  CONFIG

}


// export AppView root component with hot module reload
export default hot(module)(AppView)