import React, { createContext, useReducer } from 'react';
import axios from 'axios'

import { GET_ERRORS, CLEAR_ERRORS } from './types'
import { ErrorReducer } from './reducers/ErrorReducer'


const initialState = {
    msg: {},
    status: null,
    id: null
}

//Create Context
export const ErrorContext = createContext(initialState)

export const returnErrors = (msg, status, id = null) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status, id }
    }
}
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}

//Create Context Provider
export const ErrorProvider = (props) => {
    const [state, dispatch] = useReducer(ErrorReducer, initialState)


    return (
        <ErrorContext.Provider
            value={{
                msg: state.msg,
                status: state.status,
                id: state.id
            }}>
            {props.children}
        </ErrorContext.Provider>
    );
}

