import './App.css';
import Header from './component/layout/Header/Header';
import { BrowserRouter ,Routes,Route } from 'react-router-dom';
import webFont from "webfontloader";
import { useEffect } from 'react';
import Footer from './component/layout/Footer/Footer';
import Home from "./component/Home/Home.jsx"
import Loading from './component/loading/Loading';




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
          {/* <Route path="ssd" element = {<Loading/>}/> */}
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
    
  );
}

export default App;
