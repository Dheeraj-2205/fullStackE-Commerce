import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component"

const Product = ({product}) => {
    const options = {
        edit : false,
        value : 2.5,
        isHalf : true,
        size : window.innerWidth < 600 ? 20 : 25
    }

  return (
    <Link to = {product._id} className='productCard'>
        <img src={product.image[0].url} alt={product.name} />
        <p>{product.name}</p>
        <div>
            <ReactStars {...options} />
            <span>(256 reviews)</span>
        </div>
        <span>{product.price}</span>
    </Link>

    
  )
}

export default Product