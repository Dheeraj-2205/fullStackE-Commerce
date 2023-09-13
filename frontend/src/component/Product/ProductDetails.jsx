import React, { useEffect } from 'react';
import Carousel from "react-material-ui-carousel";
import "./productDetails.css";
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../actions/productAction';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const {products,loading,error} =  useSelector((state)=>state.product);

    
    console.log(products);
    useEffect(()=>{
        dispatch(getProductDetails(id));
    }, [dispatch,id])
  return (
    <>
        <div className='productDetails'>
            <div>
                <Carousel>
                    {
                        // product.image && 
                        // product.image.map((item,i)=>{
                        //     return (
                        //         <img 
                        //             className='CarouselImage'
                        //             key = {item.url}
                        //             src= {item.url}
                        //             alt={`Slide ${i + 1}`}
                        //         />
                        //     )
                        // })
                    }
                </Carousel>
            </div>
        </div>
    </>
  )
}

export default ProductDetails