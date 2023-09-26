import React, { useRef, useState } from 'react'
import "./loginSignup.css";
import { Link } from 'react-router-dom';
import MailOutlineIcon from "@material-ui/icons/MailOutline"
import LockOpenIcon from "@material-ui/icons/LockOpen"
const LoginSignup = () => {

    const registerTab =useRef(null);
    const loginTab = useRef(null);
    const switchTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword,setLoginPassword] = useState("");


    const switchTabs = (e, tab) =>{
        if(tab == "login"){
            switchTab.current.classList.add("shiftToNeutral")
            switchTab.current.classList.remove("shiftToRight")
            
            
            registerTab.current.classList.remove("shiftToNeutralForm")
            loginTab.current.classList.remove("shiftToLeft")
        }

        if(tab == "register"){
            switchTab.current.classList.add("shiftToRight");
            switchTab.current.classList.remove("shiftToNeutral");
            
            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft")
        }
    }

    const loginSubmit = () =>{
        console.log("object");
    }



  return (
    <>
        <div className="loginSignupContainer">
            <div className="loginSignUpBox">
                <div>
                    <div className="login_signup_toggle">
                        <p onClick={(e) =>switchTabs(e,"login")}>Login</p>
                        <p onClick={(e) =>switchTabs(e,"register")}>Register</p>
                    </div>
                    <button ref= {switchTab}></button>
                </div>

                <form className='loginForm' ref = {loginTab} onSubmit={loginSubmit}>
                    <div className="loginEmail">
                        <MailOutlineIcon/>
                        <input type="email" 
                            placeholder='Enter Your Email'
                            required
                            value = {loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                        />
                    </div>
                    <div className="loginPassword">
                        <LockOpenIcon/>
                        <input type="password"
                            placeholder='Enter Your Password'
                            required
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                        />
                    </div>
                    <input type="submit" value="Login" className='loginBtn'/>
                </form>
            </div>
        </div>
    </>
  )
}

export default LoginSignup