import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    CLEAR_ERROR,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS
} from "../../constants/userConstants";

import axios from "axios";

export const login = (email,password) => async (dispatch) =>{
    try {
        dispatch({
            type : LOGIN_REQUEST
        });

        const config = { headers : {"Content-Type" : "application/json"} };

        const { data } = await axios.post(
            "http://localhost:4000/mern/login",
            {email,password},
            config
        );

        dispatch({ type : LOGIN_SUCCESS, payload : data.user });
    } catch (error) {
        dispatch({ type :  LOGIN_FAIL, payload : error.response.data.error})
    }
}



export const register = (userData) => async(dispatch) =>{
    try {
        dispatch({type : REGISTER_USER_REQUEST});
        
        const config = { headers : {"Content-Type" : "multipart/form-data"}};

        const {data} = await axios.post("http://localhost:4000/mern/register",userData,config);
        console.log(data);

        dispatch({type : REGISTER_USER_SUCCESS, payload: data.user})
    } catch (error) {
        dispatch({ type :  LOGIN_FAIL, payload : error.response.data.error})
    }
}

export const clearError = () => async (dispatch) =>{
    dispatch({type : CLEAR_ERROR});
}



