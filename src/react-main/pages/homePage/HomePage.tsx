/**
 * @name: HomePage.tsx
 * @description:
 */
import React from "react";
import './HomePage.scss';
import {ReactView} from "solidify-lib/react/ReactView";
import {TweenLite, TimelineLite,Power3, Expo} from "gsap"

// -----------------------------------------------------------------------------  STRUCT

export interface Props
{
    // route
    match               : any
    // test route
    location            : any

}

export interface States { }

// -----------------------------------------------------------------------------  EXPORT CLASS

export default class HomePage extends ReactView<Props, States>
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

            <div className={
                ["HomePage"].join('')}
                 ref="root"
            >
                    <div className="HomePage_inner">
                        <h1 className="HomePage_title">
                            HomePage
                        </h1>
                    </div>
            </div>
            
        )
    }

    // ------------------------------------------------------------------------- LIFECYCLE

    /**
     * When component is mounted
     */
    componentDidMount ()
    {

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

    // -------------------------------------------------------------------------  TRANSITION

    // -------------------------------------------------------------------------  HANDLERS

    // -------------------------------------------------------------------------  CONFIG

}


// -----------------------------------------------------------------------------  EXPORT CLASS