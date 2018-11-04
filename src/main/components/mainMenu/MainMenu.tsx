/**
 * @name: MainMenu.tsx
 */
import React from "react";
import {ReactView} from "../../../_common/core/ReactView";
import "./MainMenu.scss";
import {NavLink} from 'react-router-dom'
import {GlobalConfig} from "../../../_common/data/GlobalConfig";
import { TweenLite, Power3 } from "gsap";
import {hot} from "react-hot-loader";

export interface Props
{
    // class element
    className       :string;
}

export interface States { }

// -----------------------------------------------------------------------------  EXPORT CLASS

export default class MainMenu extends ReactView<Props, States>
{

    // ------------------------------------------------------------------------- INIT

    prepare ()
    {
        // Init state here, you can set from props
        this.initState({
            // ...
        });
    }

    // ------------------------------------------------------------------------- RENDER

    render()
    {
        return (
            <nav className={[
                'MainMenu',
                this.props.className
            ].join(' ')}>
                <ul className="MainMenu_items">
                    <li className="MainMenu_item">
                        <NavLink

                            // TODO method static fait planter l'env prod
                            to={ GlobalConfig.instance.base }
                            className="MainMenu_link"
                            activeClassName="MainMenu_link-active"
                        >
                            Home
                        </NavLink>
                    </li>
                    <li className="MainMenu_item">
                        <NavLink

                            // TODO method static fait planter l'env prod
                            to={`${GlobalConfig.instance.base }contact`}
                            className="MainMenu_link"
                            activeClassName="MainMenu_link-active"
                        >
                            contact
                        </NavLink>
                    </li>
                </ul>
            </nav>
        )
    }

    // ------------------------------------------------------------------------- LIFECYCLE

    /**
     * When component is mounted
     */
    componentDidMount ()
    {
        this.enterAnim();
    }

    /**
     * Before component will unmount
     */
    componentWillUnmount ()
    {

    }

    /**
     * If component is updated
     * @param {Props} pPrevProps
     * @param {States} pPrevState
     */
    componentDidUpdate (pPrevProps:Props, pPrevState:States)
    {

    }

    // -------------------------------------------------------------------------  HANDLERS


    // -------------------------------------------------------------------------  ANIM

    protected enterAnim (pDuration = 1):void
    {
        TweenLite.from( $('.MainMenu'), pDuration ,
            {
                y:400,
                ease: Power3.easeInOut

            })
    }

}

// -----------------------------------------------------------------------------  EXPORT CLASS