import React, { useEffect } from "react";
import "./Product.css";
import { useDispatch, useSelector } from "react-redux";
import { clearError, fetchProduct } from "../actions/productAction";
import ProductCard from "../Home/ProductCard";
import Loading from "../loading/Loading";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination"
import { text } from "body-parser";
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

          <div className="paginationBox">
            <Pagination>
              activePage = {currentPage}
              itemsCountPerPage = {resultPerPage}
              totalItemsCount = {productsCount}
              onChange = {setCurrentPageNo}
              nextPageText = "Next"
              prevPageText = "Prev"
              firstPageText = "1st"
              lastPageText = "Last"
              itemsClass ="page-item"
              linkClass = "page-link"
              activeClass = "pageItemActive"
              activeLinkClass = "pageLinkActive"
            </Pagination>
          </div>

          
        </>
      )}
    </>
    )   
};

export default Product;
