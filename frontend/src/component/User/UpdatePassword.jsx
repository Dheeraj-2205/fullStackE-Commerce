import React, { useEffect, useState } from 'react'
import "./updatePassword.css";
import { Link } from 'react-router-dom';
import MailOutlineIcon from "@material-ui/icons/MailOutline"
import LockOpenIcon from "@material-ui/icons/LockOpen"

import { useDispatch, useSelector } from "react-redux";
import { clearError, updatePassword } from "../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import Loading from "../loading/Loading";
import { useNavigate } from 'react-router-dom';

const UpdatePassword = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const {error, loading, isUpdated} = useSelector(state => state.password);
    
    const navigate = useNavigate();

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const updatePasswordSubmit = (e) =>{
        e.preventDefault();
        const obj = {
            oldPassword , newPassword , confirmPassword
        }
        dispatch(updatePassword(obj))
    }

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearError)
        }
        if(isUpdated){
            alert.success("Password Updated Successfully");
            navigate("/login");

            dispatch({
                type : UPDATE_PASSWORD_RESET
            })
        }
    })

  return (
    <>
        {
            loading ? <Loading/> : <>

                <div className="updatePasswordContainer">
                    <div className="updatePasswordBox">
                        <h2>Update Password</h2>

                        <form 
                            className='updatePasswordForm'
                            onSubmit={updatePasswordSubmit}
                        >
                            <div className="password">
                                <LockOpenIcon/>
                                <input type="password"
                                    placeholder='OldPassword'
                                    required
                                    value={oldPassword}
                                    onChange={e => setOldPassword(e.target.value)}
                                />
                            </div>

                            <div className="password">

                                <input type="password"
                                    placeholder='New Password'
                                    required
                                    value={newPassword}
                                    onChange={e => setNewPassword(e.target.value)}
                                />
                            </div>

                            <div className="password">

                                <input type="password"
                                    placeholder='Confirm Password'
                                    required
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            <input type="submit" value="Change Password" className='updatePasswordBtn' />

                        </form>
                    </div>
                </div>
            
            </>

        }
    
    
    </>
  )
}

export default UpdatePassword