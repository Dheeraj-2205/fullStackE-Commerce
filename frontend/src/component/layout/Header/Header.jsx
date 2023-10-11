import React from "react";
import { ReactNavbar } from "overlay-navbar";
import { FaBeer } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { positions } from "react-alert";
const options = {
  burgerColorHover: "#eb4034",
  // logo,
  logoWidth: "20vmax",
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: "#eb4034",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  SearchIconElement : <FaBeer/>,
  searchIconColor : "rgba(35, 35, 35,0.8)",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIconColor: "rgba(35, 35, 35,0.8)",
  cartIconColor: "rgba(35, 35, 35,0.8)",
  profileIconColorHover: "#eb4034",
  searchIconColorHover: "#eb4034",
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax",
};
// 
let style = {
  positions : "absolute",
  top : "20%"
}
const Header = () => {
  return (
    <>
    <ReactNavbar {...options} />
      <div style={style}>
        
        <Link to = "/account"> Account</Link>
        <Link to = "/login">Login</Link>
      </div>
    </>
  )
};

export default Header;