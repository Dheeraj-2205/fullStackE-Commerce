import React, { useState } from 'react'
import  { SpeedDial , SpeedDialAction} from "@material-ui/lab"
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Navigate, useNavigate } from 'react-router-dom';
import { logout } from '../actions/userAction';

const UserOption = ({user}) => {
    const [open,setOpen] = useState(false);
    console.log(user);
    const navigate = useNavigate();

    const options = [
      {icon : <ListAltIcon/> , name : "Orders", func : orders},
      {icon : <PersonIcon/> , name : "Profile", func : account},
      {icon : <ExitToAppIcon/> , name : "Logout", func : logoutUser},
    ]

    if(user.role === "admin"){
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
      dispatch(logout());
      alert.success("Logout Successfully")
    }

    function orders (){
      navigate("/orders")
    }
  return (
    <>
        <SpeedDial
            ariaLabel='SpeedDial tooltip example'
            onClose = {() =>setOpen(false)}
            onOpen = {() =>setOpen(true)}
            open={open}
            direction='down'
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