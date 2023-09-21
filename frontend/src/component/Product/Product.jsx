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
    // console.log(loading);
    useEffect(() => {
        dispatch(fetchProduct());
    }, [dispatch]);
    // return <>
    //     {
            
    //         loading ? <Loading /> : <>
    //             <h2>Product Heading</h2>
    //             <div className="products">
    //                 {
    //                     products && products.map((ele)=>{
    //                         return(
    //                           <>
    //                             <Product product={ele}/>
    //                           </>
    //                         )
    //                     })
    //                 }
    //             </div>
    //         </>
    //     }
    // </>;

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
