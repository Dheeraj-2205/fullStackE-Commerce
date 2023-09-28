import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    CLEAR_ERROR
} from "../../constants/userConstants";

import axios from "axios";

export const login = (email,password) => async(dispatch) =>{
    try {
        dispatch({
            
        })
    } catch (error) {
        dispatch({type :LOGIN_FAIL, patload : error.response.data.message})
    }
}