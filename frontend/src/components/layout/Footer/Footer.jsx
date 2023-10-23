import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src="#" alt="playstore" />
        <img src="#" alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2021 &copy; Dheeraj Joshi</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://example.com">Instagram</a>
        <a href="https://example.com">Youtube</a>
        <a href="https://example.com">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;