import React, { useEffect } from 'react';
import Carousel from "react-material-ui-carousel";
import "./productDetails.css";
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../actions/productAction';
import { useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component"

const ProductDetails = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const {product,loading,error} =  useSelector((state)=>state.productDetails);
    console.log(product);
    
    useEffect(()=>{
        dispatch(getProductDetails(id));
    }, [dispatch,id]);

    const options = {
        edit : false,
        color : "rgba(20,20,20,0.1)",
        activeColor : "tomato",
        size : window.innerWidth < 600 ? 20 : 25,
        value: product.rating,
        isHalf : true
    }
  return (
    <>
        <div className='productDetails'>
            <div>
                <Carousel>
                    {
                        product.image && 
                        product.image.map((item,i)=>{
                            return (
                                <img 
                                    className='CarouselImage'
                                    key = {i}
                                    src= {item.url}
                                    alt={`Slide ${i + 1}`}
                                />
                            )
                        })
                    }
                </Carousel>
            </div>
        </div>

        <div>
            <div className="detailsBlock-1">
                <h2>Product.name</h2>
                <p>Product # {product._id}</p>
            </div>
            <div className='detailsBlock-2'>
                <ReactStars {...options} />
                <span>({product.numOfReviews} Reviews)</span>
            </div>
            <div className="detailsBlock-3">
                <h1>{product.price}</h1>
                <div className="detailsBlock-3-1">
                    <div className="detailsBlock-3-1-1">
                        <button>-</button>
                        <input type="number" value = "1"/>
                        <button>+</button>
                    </div>{" "}
                    <button>Add To Cart</button>
                </div>
                <p>
                    Status : {" "}
                    <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                        {product.stock < 1 ? "OutOfStock" : "InStock"}
                    </b>
                </p>
            </div>

            <div className="detailBlock-4">
                Description : <p>{product.description}</p>
            </div>
            <button className='submitReview'>Submit Review</button>
        </div>
    </>
  )
}

export default ProductDetails