import './App.css';
import Header from './component/layout/Header/Header';
import { BrowserRouter ,Routes,Route } from 'react-router-dom';
import webFont from "webfontloader";
import { useEffect } from 'react';
import Footer from './component/layout/Footer/Footer';
import Home from "./component/Home/Home.jsx"
import ProductDetails from "./component/Product/ProductDetails.jsx"
import Products from "./component/Product/Product.jsx"
import Search from "./component/Product/Search.jsx"
import LoginSignup from './component/User/LoginSignup';

function App() {
  useEffect(()=>{
    webFont.load({
      google : {
        families : ["Roboto","Chilanka"]
      }
    })
  },[]);
  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route index element = {<Home/>}/>
          <Route path = "/product/:id" element= {<ProductDetails/>}/>
          <Route path = "/products" element= {<Products/>}/>
          <Route path = "/products/:q" element= {<Products/>}/>
          <Route path = "/search" element= {<Search/>}/>
          <Route path = "/login" element= {<LoginSignup/>}/>
          {/* <Route path = "/login" element= {</>}/> */}
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
    
  );
}

export default App;


