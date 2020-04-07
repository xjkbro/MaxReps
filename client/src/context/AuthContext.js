import React, { createContext, useReducer } from 'react';
import axios from 'axios'
import { returnErrors } from './ErrorContext'

import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../types'

import { AuthReducer } from './reducers/AuthReducer'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
}

//Create Context
export const AuthContext = createContext(initialState)

//Create Context Provider
export const AuthContext = (props) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState)

    //Checks token & load user
    const loadUser = () => {
        // User Loading
        dispatch({ type: USER_LOADING })
        // Get token from localstorage
        const token = getState().auth.token;

        // Header
        const config = {
            headers: {
                "Content-type": "application/json",
            }
        }

        //If token, add to headers
        if (token) {
            config.headers['x-auth-token'] = token;
        }

        axios.get('api/auth/user', config)
            .then(res => {
                dispatch({
                    type: USER_LOAD,
                    payload: res.data
                })
            }
            )
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status))
                dispatch({
                    type: AUTH_ERROR
                })
            }
            )
    }

    return (
        <AuthContext.Provider
            value={{
                ten: state.loading,
                items: state.items,
                getItems: getItems,
                addItem: addItem,
                deleteItem: deleteItem,
            }}>
            {props.children}
        </AuthContext.Provider>
    );
}

