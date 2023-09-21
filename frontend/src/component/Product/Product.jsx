import React, { useEffect } from "react";
import "./Product.css";
import { useDispatch, useSelector } from "react-redux";
import { clearError, fetchProduct } from "../actions/productAction";
import ProductCard from "../Home/ProductCard";
import Loading from "../loading/Loading";
const Product = () => {
    const dispatch = useDispatch();

    const { loading, error, products, productsCount } = useSelector(
        (state) => state.products
    );
    console.log(products);
    useEffect(() => {
        dispatch(fetchProduct());
    }, [dispatch]);
    return <>{Loading ? <Loading /> : <></>}</>;
};

export default Product;
