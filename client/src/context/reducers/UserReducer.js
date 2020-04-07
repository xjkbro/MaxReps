import {useState} from 'react'
import { v4 as uuidv4 } from 'uuid';

export const GET_USER = 'GET_USER';
export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const LOADING_ITEMS = 'LOADING_ITEMS';

export const ItemReducer = (state, action) => {
    switch (action.type) {
        case GET_ITEMS:
          return {
            ...state,
            items: action.payload,
          };
          case DELETE_ITEM:
          return {
            ...state,
            items: state.items.filter(item => item._id !== action.payload)
          };
          case ADD_ITEM:
          return {
            ...state,
            items: [action.payload, ...state.items]
          };
          case LOADING_ITEMS:
          return {
            ...state,
            loading: action.payload
          };
          default:
            return state;
    }
}