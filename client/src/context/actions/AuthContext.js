import React, { useState, useEffect, useContext, createContext, useReducer } from 'react';
import axios from 'axios'
// import { ErrorContext } from './ErrorContext'
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
} from './types'

import { AuthReducer } from './reducers/AuthReducer'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    user: null
}

//Create Context
export const AuthContext = createContext(initialState)

//Create Context Provider
export const AuthProvider = (props) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState)
    // const {returnErrors, clearErrors} = useContext(ErrorContext)

    // dispatch({type: USER_LOADING})
    //ACTIONS

    // Load User
    // @desc Check token and load user
    // API Route: /api/auth/user
    const loadUser = async () => {
        dispatch({type: USER_LOADING})

        //Headers
        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
        //If Token, set Token in headers
        if(state.token) {
            config.headers['x-auth-token'] = state.token
        }

        await axios.get('/api/auth/user', config)
            .then(res => 
                dispatch({
                    type: USER_LOADED,
                    payload: res.data
            }))
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status))
                dispatch({
                    type: AUTH_ERROR
                })  
            })

    }
    
    const loginUser = async (data) => {
        const config = {
            headers: {
                "Content-type": "application/json",
            }
        }
        console.log(data)
        await axios.post('http://localhost:5000/api/auth/login', data, config)
            .then(res => {
                console.log(res)
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data
                })
            })
            .catch(err => {
                console.log(err)
                dispatch(returnErrors(err.response.data, err.response.status))
                dispatch({
                    type: AUTH_ERROR
                })
            })
    }

    const registerUser = async (data) => {
        const config = {
            headers: {
                "Content-type": "application/json",
            }
        }
        console.log(data)
        await axios.post('http://localhost:5000/api/auth/register', data, config)
            .then(res => {
                console.log(res);
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status))
                dispatch({
                    type: AUTH_ERROR
                })
            })

    }




    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isLoading: state.isLoading,
                loginUser,
                registerUser,
                loadUser
            }}>
            {props.children}
        </AuthContext.Provider>
    );
}

