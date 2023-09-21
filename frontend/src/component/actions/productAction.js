import axios from  "axios";

import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_REQUEST,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,


    CLEAR_ERROR
} from "../../constants/productConstants.js"

export const fetchProduct = () => async(dispatch) =>{
    
    try {
        dispatch({type : ALL_PRODUCT_REQUEST});
        
        const { data }  = await axios.get("http://192.168.137.1:4000/mern/products");
        console.log(data);
        
        dispatch({
            type : ALL_PRODUCT_SUCCESS,
            payload : data
        })
    } catch (error) {
       dispatch({
        type:ALL_PRODUCT_FAIL,
        payload : error.response.data.message
       }) 
    }
}


export const getProductDetails = (id) => async(dispatch) =>{
    
    try {
        dispatch({type : PRODUCT_DETAILS_REQUEST});
        
        const { data }  = await axios.get(`http://192.168.137.1:4000/mern/product/${id}`);
        console.log(data.product);
        dispatch({
            type : PRODUCT_DETAILS_SUCCESS,
            payload : data.product
        })
    } catch (error) {
       dispatch({
        type:PRODUCT_DETAILS_FAIL,
        payload : error.response.data.message
       }) 
    }
}


// clearing error
export const clearError = () => async(dispatch) =>{
    dispatch({type : CLEAR_ERROR})
}
// // "proxy": "http://192.168.137.1:4000"

// ,"proxy": "http://192.168.159.1:4000"