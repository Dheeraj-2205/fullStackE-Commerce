import React, { useEffect } from 'react'
import {  useSelector } from 'react-redux/es/hooks/useSelector'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../loading/Loading'
const Profile = () => {
    const {user,loading,isAuthenticated} =useSelector((state) =>state.user);
    console.log(user);
    const navigate = useNavigate();
    useEffect(() =>{
        if(isAuthenticated === false){
            navigate("/login")
        }
    }, [navigate,isAuthenticated])
  return (
    <>
        {
            loading ? Loading : <>
            <div>
                <h1>Profile</h1>
                <img src={user.avatar.url} alt="" />
                <Link to = "/me/update">Edit Profile</Link>
            </div>
    
            <div>
                <div>
                    <h4>Full Name</h4>
                    <p>{user.name}</p>
                </div>
                <div>
                    <h4>Email</h4>
                    <p>{user.email}</p>
                </div>
                <div>
                    <h4>Joined On</h4>
                    <p>{String(user.createdAt).substr(0,10)}</p>
                </div>
    
                <div>
                    <Link to = "/orders">My Orders</Link>
                    <Link to = "/password/update">Change Password</Link>
                </div>
            </div>
        </>
        }
    </>
  )
}

export default Profile