import React, { useEffect, useState } from "react";
import "./Product.css";
import { useDispatch, useSelector } from "react-redux";
import { clearError, fetchProduct } from "../actions/productAction";
import ProductCard from "../Home/ProductCard";
import Loading from "../loading/Loading";
import { useParams } from "react-router-dom";
import { text } from "body-parser";
import Pagination from "react-js-pagination"
const Product = () => {
    const dispatch = useDispatch();
    const [currentPage,setCurrentPage] = useState(1);
    const {q} = useParams();
    const { loading, error, products, productsCount, perPage } = useSelector(
        (state) => state.products
    );//, resultPerPage
      
    const setCurrentPageNo = (e) =>{
      setCurrentPage(e);
    }
    
    useEffect(() => {
        dispatch(fetchProduct(q,currentPage));
    }, [dispatch,q,currentPage]);
    console.log(productsCount);
    return (
      <>
      {
      loading ? (
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

          <div className="paginationBox">
            <Pagination
              activePage = {currentPage}
              itemsCountPerPage = {perPage}
              totalItemsCount = {productsCount === undefined ? 1 : productsCount}
              onChange = {setCurrentPageNo}
              nextPageText = "Next"
              prevPageText = "Prev"
              firstPageText = "1st"
              lastPageText = "Last"
              itemClass ="page-item"
              itemClassLast = "last-class"
              linkClass = "page-link"
              activeClass = "hiii"
              activeLinkClass = "pageLinkActive"
            
            />
          </div>

          
        </>
      )}
    </>
    )   
};

export default Product;
