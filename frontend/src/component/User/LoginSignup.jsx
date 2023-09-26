import React, { useRef, useState } from 'react'
import "./loginSignup.css";
import { Link } from 'react-router-dom';
import MailOutlineIcon from "@material-ui/icons/MailOutline"
import LockOpenIcon from "@material-ui/icons/LockOpen"
import { BiFace } from 'react-icons/bi';

const LoginSignup = () => {

    const registerTab =useRef(null);
    const loginTab = useRef(null);
    const switchTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword,setLoginPassword] = useState("");


    const [user,setUser] = useState({
        name : "",
        email : "",
        password : ""
    });


    const {name,email,password} = user;

    const [avatar,setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("");

    const registerDataChange = (e) =>{
        if(e.target.name === "avatar"){
            const reader = new FileReader();
            reader.onload = () =>{
                if(reader.readerState === 2){
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result)
                }
            }
        }else{
            setUser({ ...user , [e.target.name] : e.target.value})
        }
        console.log("object");
    }

    const switchTabs = (e, tab) =>{
        if(tab === "login"){
            switchTab.current.classList.add("shiftToNeutral")
            switchTab.current.classList.remove("shiftToRight")
            
            
            registerTab.current.classList.remove("shiftToNeutralForm")
            loginTab.current.classList.remove("shiftToLeft")
        }

        if(tab === "register"){
            switchTab.current.classList.add("shiftToRight");
            switchTab.current.classList.remove("shiftToNeutral");
            
            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft")
        }
    }

    const loginSubmit = () =>{
        console.log("object");
    }

    const registerSubmit = (e) =>{
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name)
        myForm.set("email", email)
        myForm.set("password", password)
        myForm.set("avatar", avatar)
        console.log(`signupform submit`);
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
                    <Link to = "/password/forgot">Forgot Password</Link>
                    <input type="submit" value="Login" id='loginBtn'/>
                </form>

                <form 
                    className='signUpForm'
                    ref = {registerTab}
                    encType='multpart/form-data'
                    onSubmit={registerSubmit}
                >
                    <div className="signUpName">
                        <BiFace/>
                        <input 
                            type="text"
                            placeholder='Name'
                            required
                            name = "name"
                            value= {name}
                            onChange={registerDataChange}
                         />
                    </div>

                    <div className="signUpPassword">
                        <LockOpenIcon/>

                        <input type="text"
                            placeholder='Enter Your Password'
                            required
                            name = "password"
                            value = {password}
                            onChange={registerDataChange}
                        />
                    </div>

                    <div id="registerImage">
                        <img src={avatarPreview} alt="Avatar Preview" />
                        <input 
                            type="file"
                            name='avatar'
                            accept='image/*'
                            onChange={registerDataChange}
                        />
                    </div>

                    <input 
                        type="submit"
                        value="Register" 
                        id='signUpBtn'
                    />

                </form>
            </div>
        </div>
    </>
  )
}

export default LoginSignup