import React, {useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {ToastContainer} from "react-toastify"

function Menu() {
  const [loggedUser, setLoggedUser] = useState("");
    useEffect(() => {
        setLoggedUser(localStorage.getItem("loggedInUser"));
    }, [])
  const [selectMenu, setSelectMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = (index) => {
    setSelectMenu(index);
    setIsProfileDropdownOpen(false); // Close profile dropdown when a menu is clicked
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    
    setTimeout(() => {
      window.location.href = 'https://zeodha-frontend.vercel.app/signup';
    }, 1000)
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "35px" }} alt="logo" />
      <div className="menus">
        <ul>
          <li>
            <Link to="/" onClick={() => handleMenuClick(0)}>
              <p className={selectMenu === 0 ? activeMenuClass : menuClass}>Dashboard</p>
            </Link>
          </li>
          <li>
            <Link to="/orders" onClick={() => handleMenuClick(1)}>
              <p className={selectMenu === 1 ? activeMenuClass : menuClass}>Orders</p>
            </Link>
          </li>
          <li>
            <Link to="/holdings" onClick={() => handleMenuClick(2)}>
              <p className={selectMenu === 2 ? activeMenuClass : menuClass}>Holdings</p>
            </Link>
          </li>
          <li>
            <Link to="/positions" onClick={() => handleMenuClick(3)}>
              <p className={selectMenu === 3 ? activeMenuClass : menuClass}>Positions</p>
            </Link>
          </li>
          <li>
            <Link to="/funds" onClick={() => handleMenuClick(4)}>
              <p className={selectMenu === 4 ? activeMenuClass : menuClass}>Funds</p>
            </Link>
          </li>
          <li>
            <Link to="/apps" onClick={() => handleMenuClick(5)}>
              <p className={selectMenu === 5 ? activeMenuClass : menuClass}>About Mee</p>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="profile" onClick={handleProfileClick}>
          <div className="avatar">{loggedUser}</div>
          <p className="username">UT6512</p>
        </div>

        {isProfileDropdownOpen && (
          <div className="profile-dropdown">
            <ul>
              
              <li>
                <button onClick={handleLogout}>Logout</button>
                <ToastContainer />
              </li>
            </ul>
            
          </div>
        )}
      </div>
      
    </div>
  );
}

export default Menu;
