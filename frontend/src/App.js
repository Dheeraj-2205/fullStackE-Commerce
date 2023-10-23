import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/HomeComponent";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Lato","Roboto", "Droid Sans", "Open Sans" ,"Poppins","Source Sans Pro" ],
      },
    });
  }, []);


  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route index element = {<Home/>} />
        </Routes>
        <Footer/>
      </Router>
    </>
  )
}

export default App;
