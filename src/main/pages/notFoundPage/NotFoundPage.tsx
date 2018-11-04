/**
 * @name: NotFoundPage.tsx
 * @description:
 */
import React from "react";
import {ReactView} from "solidify-lib/react/ReactView";

// -----------------------------------------------------------------------------  STRUCT

export interface Props { }

export interface States { }

// -----------------------------------------------------------------------------  CLASS

export default class NotFoundPage extends ReactView<Props, States>
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
            <div className="NotFoundPage" ref="root">
                NotFoundPage
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