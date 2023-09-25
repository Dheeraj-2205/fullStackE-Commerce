import React, { useEffect, useState } from "react";
import "./Product.css";
import { useDispatch, useSelector } from "react-redux";
import { clearError, fetchProduct } from "../actions/productAction";
import ProductCard from "../Home/ProductCard";
import Loading from "../loading/Loading";
import { useParams } from "react-router-dom";
import { text } from "body-parser";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider"
import {
  Headline1,
  Headline2,
  Headline3,
  Headline4,
  Headline5,
  Headline6,
  Overline,
  Subtitle1,
  Subtitle2,
} from '@material/react-typography'
const Product = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([499, 90000]);
  const { q } = useParams();
  const { loading, error, products, productsCount, perPage, filteredProductsCount } = useSelector(
    (state) => state.products
  );//, resultPerPage

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  }

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  }
  useEffect(() => {
    dispatch(fetchProduct(q, currentPage, price));
  }, [dispatch, q, currentPage, price]);


  console.log("productsCount =>" + productsCount);
  console.log("perPage =>" + perPage);


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

            <div className="filterBox">
              <Headline1>
                price range
              </Headline1>
              <Slider

                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={499}
                max={90000}
              />
            </div>


            {
              perPage < filteredProductsCount && (
                <div className="paginationBox">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={perPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="1st"
                    lastPageText="Last"
                    itemClass="page-item"
                    itemClassLast="last-class"
                    linkClass="page-link"
                    activeClass="hiii"
                    activeLinkClass="pageLinkActive"
                  />
                </div>
              )
            }


          </>
        )}
    </>
  )
};

export default Product;
