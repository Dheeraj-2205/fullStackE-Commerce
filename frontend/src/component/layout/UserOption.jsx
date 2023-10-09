import React, { useState } from 'react'
import "./useOption.css"
import  { SpeedDial , SpeedDialAction} from "@material-ui/lab"
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Backdrop } from '@material-ui/core';
import { Navigate, useNavigate } from 'react-router-dom';
import { logout } from '../actions/userAction';
import { useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import zIndex from '@material-ui/core/styles/zIndex';

const UserOption = ({user}) => {
    const [open,setOpen] = useState(false);
    console.log(user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const options = [
      {icon : <ListAltIcon/> , name : "Orders", func : orders},
      {icon : <PersonIcon/> , name : "Profile", func : account},
      {icon : <ExitToAppIcon/> , name : "Logout", func : logoutUser},
    ];



    if(user.user.role === "admin"){
      options.unshift({
        icon : <DashboardIcon/>,
        name : "DashBoard",
        func : dashBoard
      })
    }

    function dashBoard () {
      navigate("/dashboard");
    }

    function account(){
      navigate("/account")
    }

    function logoutUser (){
      dispatch(logout())
      alert.success("Logout Successfully")
    }

    function orders (){
      navigate("/orders")
    }
  return (
    <>
        <Backdrop open = {open} style={{zIndex : '10' }}/>
        <SpeedDial
            ariaLabel='SpeedDial tooltip example'
            onClose = {() =>setOpen(false)}
            onOpen = {() =>setOpen(true)}
            open={open}
            direction='down'
            className='speedDial'
            style={{zIndex : "11"}}
            icon = {
              <img className='speedDialIcon' src = {user.user.avatar.url ? user.user.avatar.url : "user Profile"} alt = "User Profile"/>
            }
        >
          {
            
            options.map((item) =>{

              return <SpeedDialAction icon = {item.icon} tooltipTitle = {item.name} onClick={item.func}/>

            })
          }
        </SpeedDial>

    </>
  )
}

export default UserOption