import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    CLEAR_ERROR,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL
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



export const register = (myForm) => async(dispatch) =>{
    try {
        dispatch({type : REGISTER_USER_REQUEST});
        
        const config = { headers : {"Content-Type" : "multipart/form-data"}};

        const {data} = await axios.post("http://localhost:4000/mern/register",myForm,config );


        dispatch({type : REGISTER_USER_SUCCESS, payload: data.user})
    } catch (error) {
        dispatch({ type :  REGISTER_USER_FAIL, payload : error.response.data.error})
    }
}


// LOAD USER

export const loadUser = () => async (dispatch) =>{
    try{
        dispatch({type : LOAD_USER_REQUEST})

        const { data } = await axios.get("http://localhost:4000/mern/me")

        dispatch({type : LOAD_USER_SUCCESS , payload : data.user})
    }catch(error){
        dispatch({type : LOAD_USER_FAIL , payload : error.response.data.error})
    }
}


// LOGOUT USER

export const logout = () => async (dispatch) =>{
    try {
        

        await axios.get("http://localhost:4000/mern/logout")

        dispatch({type : LOGOUT_USER_SUCCESS})
    } catch (error) {
        dispatch({type :  LOGOUT_USER_FAIL, payload : error.response.data.error})
    }
}

export const clearError = () => async (dispatch) =>{
    dispatch({type : CLEAR_ERROR});
}



