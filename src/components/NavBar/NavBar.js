import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useHistory, useLocation } from 'react-router-dom'

const NavBar = () => {
  //pathname is the page path
  const { pathname } = useLocation()

  const [value, setValue] = useState(pathname)

  const history = useHistory()

  const handleChange = (_e, newValue) => {
    //when we click on tab navigate to the newValue tab
    history.push(newValue)
  }

  useEffect(()=>{
    //listen for the pathname change and set the tab value
    setValue(pathname)

  },[pathname])

  return (
    <AppBar position="static" color="transparent" style={{ position: "fixed", top: 0 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Navigation"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Home" value='/' />
        <Tab label="Favorites" value='/favorites' />
        {
          //Show profile tab only if we are at profile page
          pathname === '/profile' &&  <Tab label="Profile" value='/profile' />
        }
      </Tabs>
    </AppBar>
  );
};

export default NavBar;
