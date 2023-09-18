import React from 'react';
import "./footer.css"

const Footer = () => {
  return (
    <footer className = "footer">

        <div className="leftFooter">
            <h4>DOWNLOAD OUR APP</h4>
            <p>Download App for Anroid and IOS mobile phone</p>
        </div>
        <div className="midFooter">
            <h1>E-Commerce</h1>
            <p>This website is build by me</p>
        </div>
        <div className="rightFooter">
            <h4>Follow US</h4>
            <a href="!#">Instagram</a>
            <a href="!#">LinkedIn</a>
            <a href="!#">Github</a>
        </div>
    </footer>
  )
}

export default Footer