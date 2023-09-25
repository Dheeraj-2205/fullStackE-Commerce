import React, { useEffect, useState } from "react";
import "./Product.css";
import { useDispatch, useSelector } from "react-redux";
import { clearError, fetchProduct } from "../actions/productAction";
import ProductCard from "../Home/ProductCard";
import Loading from "../loading/Loading";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider"
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";
import {
  Headline3
} from '@material/react-typography'


const categories = [
  "Electronics",
  "women"
];




const Product = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([499, 90000]);
  const [category,setCategory] = useState("");
  const [rating,setRating] = useState(0);
  
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

  const alert = useAlert();
  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(fetchProduct(q, currentPage, price, category,rating));
  }, [dispatch, q, currentPage, price, category,rating,alert,error]);




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
              <Headline3 className="headline">
                Price range
              </Headline3>
              <Slider
                getAriaLabel={() => 'Minimum distance shift'}
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={499}
                max={90000}
              />

              <Headline3 className="headline">
                Categories
              </Headline3>
              <ul className="categoryBox">
                {
                  categories.map((ele,i)=>{
                    return (
                      <>
                        <li 
                          className="category-link"
                          key = {i}
                          onClick={()=>setCategory(ele)}
                        >
                          {ele}
                          
                        </li>
                      </>
                    )
                  })
                }
              </ul>

              <fieldset>
                <Typography component="legend"> super</Typography>
                <Slider 
                  value = {rating}
                  onChange={(e,newRating)=>{
                    setRating(newRating)
                  }}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                />
              </fieldset>
            </div>


            
            {
              perPage <= filteredProductsCount && 
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
            }  
                
              
            


          </>
        )}
    </>
  )
};

export default Product;
