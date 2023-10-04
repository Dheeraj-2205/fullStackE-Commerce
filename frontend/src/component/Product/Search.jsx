import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Search.css"
const Search = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");

    const searchSubmit = (e) =>{
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/products/${keyword}`)
        }else{
            navigate("/products")
        }
    }

  return (
    <>
        <form onSubmit={searchSubmit} className='searchBox'>
            <input type="text" 
                placeholder='Search Product.........'
                onChange={(e) => setKeyword(e.target.value)}
            />
            <input
                type="submit"
                className='inputTag'
                value="Submit"
            />
        </form>
    </>
  )
}

export default Search