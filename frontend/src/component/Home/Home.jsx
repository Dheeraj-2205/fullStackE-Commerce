import React, { useEffect } from 'react'
import {CgMouse} from "react-icons/cg";
import Loading from '../loading/Loading';
import "./home.css"
import Product from "./Product.jsx";
import { fetchProduct } from '../actions/productAction.js';
import {useSelector,useDispatch} from "react-redux"
import { useAlert } from 'react-alert'
const Home = () => {

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading,error,products,productsCount } = useSelector(
    (state) => state.products
  );
  
  useEffect(()=>{
    if(error){
      return alert.error(error)
    }
    dispatch(fetchProduct())
    
  },[dispatch, error])
  return (
    <>
      {
        loading ?  <Loading/> : <>
        <div className='banner'>
          <p>Welcome To ECommerce</p>
          <h1>Find Amazing Products</h1>

          <a href="#container">
            <button>Scroll <CgMouse/></button>
          </a>
        </div>
        <div className="homeHeading">Feature Product</div>

        <div className="container" id="container">
          {
            products && products.map((ele)=>{
              return(
                <>
                  <Product product={ele}/>
                </>
              )
            })
          }

        </div>
      </>
      }
    </>
  )
}

export default Home

