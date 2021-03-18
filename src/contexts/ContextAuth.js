import React, { createContext, useEffect } from 'react'
import { Redirect } from 'react-router'
import { urls } from '../lib/urls'

export const ContextAuth = createContext()

export const ContextAuthWrapper = (props) => {

    
    useEffect(() => {
    }, [])


    let redirectJsx = ''
    if (!localStorage.getItem('auth-token')) {
        redirectJsx = <Redirect to={urls.LOGIN_VIEW} />
    }

    return (
        <ContextAuth.Provider value={{}}>
            {redirectJsx}
            {props.children}
        </ContextAuth.Provider>
    )

}