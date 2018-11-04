/**
 * @name: ContactPage.tsx
 * @description:
 */
import React from "react";
import {ReactView} from "solidify-lib/react/ReactView";
import "./ContactPage.scss";

export interface Props
{

}

export interface States
{

}

// -----------------------------------------------------------------------------  EXPORT CLASS

export default class ContactPage extends ReactView<Props, States>
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
            <div className="ContactPage" ref="root">
                <h1 className="ContactPage_title">ContactPage</h1>
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

    // -------------------------------------------------------------------------  HANDLERS

    // -------------------------------------------------------------------------  CONFIG

}


// -----------------------------------------------------------------------------  EXPORT CLASS