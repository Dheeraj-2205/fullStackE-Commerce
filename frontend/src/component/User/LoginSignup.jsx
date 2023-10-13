import React, { useEffect, useRef, useState } from 'react'
import "./loginSignup.css";
import { Link } from 'react-router-dom';
import MailOutlineIcon from "@material-ui/icons/MailOutline"
import LockOpenIcon from "@material-ui/icons/LockOpen"
import { BiFace } from 'react-icons/bi';

import { useDispatch, useSelector } from "react-redux";
import { clearError, login, register } from "../actions/userAction";
import { useAlert } from "react-alert"
import Loading from "../loading/Loading";
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, loading, isAuthenticated } = useSelector(state => state.user);
    
    const registerTab = useRef(null);
    const loginTab = useRef(null);
    const switchTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");


    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });


    const { name, email, password } = user;

    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("");

    const registerSubmit = (e) => {
        e.preventDefault();

        // let myForm = new FormData();
        // myForm.set("name", name);
        // myForm.set("email", email)
        // myForm.set("password", password)
        // myForm.set("avatar", avatar)

        const myForm = {
            name, email, password, avatar
        }

        dispatch(register(myForm))

    }


    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError());
        };
        if (isAuthenticated) {
            navigate("/account")
        }
    }, [dispatch, alert, error, navigate, isAuthenticated])

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switchTab.current.classList.add("shiftToNeutral")
            switchTab.current.classList.remove("shiftToRight")


            registerTab.current.classList.remove("shiftToNeutralForm")
            loginTab.current.classList.remove("shiftToLeft")
        }

        if (tab === "register") {
            switchTab.current.classList.add("shiftToRight");
            switchTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft")
        }
    }

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    }



    return (
        <>
            {
                loading ? <Loading /> : <>
                    <div className="loginSignupContainer">
                        <div className="loginSignUpBox">
                            <div>
                                <div className="login_signup_toggle">
                                    <p onClick={(e) => switchTabs(e, "login")}>Login</p>
                                    <p onClick={(e) => switchTabs(e, "register")}>Register</p>
                                </div>
                                <button ref={switchTab}></button>
                            </div>

                            <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                                <div className="loginEmail">
                                    <MailOutlineIcon />
                                    <input type="email"
                                        placeholder='Enter Your Email'
                                        required
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                    />
                                </div>
                                <div className="loginPassword">
                                    <LockOpenIcon />
                                    <input type="password"
                                        placeholder='Enter Your Password'
                                        required
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                    />
                                </div>
                                <Link to="/password/forgot">Forgot Password</Link>
                                <input type="submit" value="Login" id='loginBtn' />
                            </form>

                            <form
                                className='signUpForm'
                                ref={registerTab}
                                encType='multipart/form-data'
                                onSubmit={registerSubmit}
                            >
                                <div className="signUpName">
                                    <BiFace />
                                    <input
                                        type="text"
                                        placeholder='Name'
                                        name="name"
                                        value={name}
                                        onChange={registerDataChange}
                                        required
                                    />
                                </div>

                                <div className="signUpPassword">
                                    <MailOutlineIcon />

                                    <input type="email"
                                        placeholder='Enter Your Email'
                                        name="email"
                                        value={email}
                                        onChange={registerDataChange}
                                        required
                                    />
                                </div>

                                <div className="signUpPassword">
                                    <LockOpenIcon />

                                    <input type="password"
                                        placeholder='Enter Your Password'
                                        name="password"
                                        value={password}
                                        onChange={registerDataChange}
                                        required
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
            }
        </>
    )
}


export default LoginSignup