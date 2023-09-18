import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "./productDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../actions/productAction";
import { useParams } from "react-router-dom";
import StarRatingComponent from 'react-star-rating-component';
import ReviewCard from "./ReviewCard.jsx"

const ProductDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { product, loading, error } = useSelector(
        (state) => state.productDetails
    );
    console.log(product);

    useEffect(() => {
        dispatch(getProductDetails(id));
    }, [dispatch, id]);

    const options = {
        value: product.rating,
        editing: false
    };
    console.log(options);
    return (
        <>
            <div className="productDetails">
                <div className="carousel">
                    <Carousel>
                        {
                            product.image &&
                            product.image.map((item, i) => (
                                <img
                                    className="CarouselImage"
                                    key={i}
                                    src={item.url}
                                    alt={`${i} Slide`}
                                />
                            ))
                        }
                    </Carousel>
                </div>

                <div className="detailsBlock">
                    <div className="detailsBlock-1">
                        <h2>{product.name}</h2>
                        <p>Product # {product._id}</p>
                    </div>
                    <div className="detailsBlock-2">
                        <StarRatingComponent {...options} />
                        <span className="detailsBlock-2-span">
                            ({product.numOfReviews} Reviews)
                        </span>
                    </div>
                    <div className="detailsBlock-3">
                        <h1>{`₹${product.price}`}</h1>
                        <div className="detailsBlock-3-1">
                            <div className="detailsBlock-3-1-1">
                                <button>-</button>
                                <input  readOnly type="number" value={product.Stock} style={{color : "blue"}} />
                                <button>+</button>
                            </div>
                            <button>
                                Add to Cart
                            </button>
                        </div>

                        <p>
                            Status:
                            <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                {product.Stock < 1 ? "OutOfStock" : "InStock"}
                            </b>
                        </p>
                    </div>

                    <div className="detailsBlock-4">
                        Description : <p>{product.description}</p>
                    </div>

                    <button className="submitReview">
                        Submit Review
                    </button>
                </div>
            </div>

            <h3 className="reviewsHeading">
                REVIEWS
            </h3>

            {
                product.review && product.review[0] ? (
                    <div className="reviews">
                        {
                            product.review && product.review.map((ele)=>{
                                return(
                                    <ReviewCard reviews = {ele}/>
                                )
                            })
                        }
                    </div>
                ) : <p className="noReviews">No Reviews Yet</p>
            }
        </>
    );
};

export default ProductDetails;
