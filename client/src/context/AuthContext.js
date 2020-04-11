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
} from './types'

import { AuthReducer } from './reducers/AuthReducer'

const initialState = {
    token: null,
    isAuthenticated: null,
    isLoading: false,
    user: null
}

//Create Context
export const AuthContext = createContext(initialState)

//Create Context Provider
export const AuthProvider = (props) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState)

    // dispatch({type: USER_LOADING})
    //ACTIONS
    
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
                registerUser
            }}>
            {props.children}
        </AuthContext.Provider>
    );
}

