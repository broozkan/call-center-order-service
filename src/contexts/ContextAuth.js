import React, { createContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import { urls } from '../lib/urls'

export const ContextAuth = createContext()

export const ContextAuthWrapper = (props) => {

    const [user, setUser] = useState('')

    useEffect(() => {
        if (localStorage.getItem('auth-token')) {
            setUser(JSON.parse(localStorage.getItem('user')))
            redirectJsx = <Redirect to={urls.LOGIN_VIEW} />
        }
    }, [])


    let redirectJsx = ''
    if (!localStorage.getItem('auth-token')) {
        redirectJsx = <Redirect to={urls.LOGIN_VIEW} />
    }

    return (
        <ContextAuth.Provider value={{user: user}}>
            {redirectJsx}
            {props.children}
        </ContextAuth.Provider>
    )

}