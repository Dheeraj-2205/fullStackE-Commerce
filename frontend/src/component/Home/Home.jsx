import React, { useEffect } from 'react'
import {CgMouse} from "react-icons/cg"
import "./home.css"
import Product from "./Product.jsx";
import { fetchProduct } from '../actions/productAction.js';
import {useSelector,useDispatch} from "react-redux"
const product = {
  name : "TSHirt",
  price : 300,
  _id : 14,
  images : [{url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1NMGzZlhwF5tOpnbvpAUoACBCg3QDbulPdw&usqp=CAU"}]
}
const Home = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchProduct())
  },[dispatch])
  return (
    <>
      <div className='banner'>
        <p>Welcome To ECommerce</p>
        <h1>Find Amazing Products</h1>

        <a href="#container">
          <button>Scroll <CgMouse/></button>
        </a>
      </div>
      <div className="homeHeading">Feature Product</div>

      <div className="container" id="container">
        {/* redux */}
        <Product product = {product}/> 
        <Product product = {product}/> 
        <Product product = {product}/> 
        <Product product = {product}/> 

           
        <Product product = {product}/> 
        <Product product = {product}/> 
        <Product product = {product}/> 
        <Product product = {product}/> 


      </div>
    </>
  )
}

export default Home

