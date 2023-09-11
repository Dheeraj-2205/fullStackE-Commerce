import React from 'react'
import {Link} from "react-router-dom"
import ReactStars from "react-rating-stars-component";



const Product = ({product}) => {
  const options = {
    edit : false,
    color : "rgba(20,20,20,0.1)",
    activeColor : "tomato",
    size : window.innerWidth < 600 ? 20 : 25,
    value: product.rating,
    isHalf : true
};

  return (
    <Link className='productCard' to = {product._id}>
        <img src={product.image[0].url} alt="" />
        <p>{product.name}</p>
        <div>
            <ReactStars {...options}/> <span>({product.numsOfReviews})</span>
        </div>
        <p>{`₹${product.price}`}</p>

    </Link>
  )
}

export default Product