import axios from "axios";
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_REQUEST,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,


    CLEAR_ERROR
} from "../../constants/productConstants.js"

export const fetchProduct = (q = "", currentPage = 1 ,price = [499 , 90000], category, rating=0) => async (dispatch) => {


    try {

        dispatch({ type: ALL_PRODUCT_REQUEST });
        let link = `http://localhost:4000/mern/products?q=${q}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${rating}`;
        

        if(category){
            link = `http://localhost:4000/mern/products?q=${q}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&rating[gte]=${rating}`
        }
        const { data } = await axios.get(link);


        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getProductDetails = (id) => async (dispatch) => {

    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        const { data } = await axios.get(`http://localhost:4000/mern/product/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}


// clearing error
export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR })
}



