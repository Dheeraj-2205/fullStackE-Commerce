import React, { useEffect } from "react";
import "./Product.css";
import { useDispatch, useSelector } from "react-redux";
import { clearError, fetchProduct } from "../actions/productAction";
import ProductCard from "../Home/ProductCard";
import Loading from "../loading/Loading";
import { useParams } from "react-router-dom";
const Product = () => {
    const dispatch = useDispatch();
    const {q} = useParams();
    const { loading, error, products, productsCount } = useSelector(
        (state) => state.products
    );
    
    useEffect(() => {
        dispatch(fetchProduct(q));
    }, [dispatch,q]);

    return (
      <>
      {loading ? (
        <Loading />
      ) : (
        <>
          
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          
        </>
      )}
    </>
    )   
};

export default Product;
