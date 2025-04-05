import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AiOutlineHome, AiOutlineBarChart, AiOutlineBell, AiOutlineDatabase, AiOutlineLogout } from 'react-icons/ai';
import { FaHeadset } from 'react-icons/fa';
import '../styles/Sidebar.css';
import Logo from '../assets/Logo.svg';
import ProfileImage from '../assets/profileimage.png'; // Add your profile image here

const Sidebar = () => {
    const location = useLocation();
    
    // User details - replace with actual user data
    const userDetails = {
        name: "John Doe",
        email: "john.doe@example.com"
    };

    return (
        <div className="sidebar">
            {/* Top Section */}
            <div className="sidebar-top">
                <div className="logo">
                    <img src={Logo} alt="Logo" className="logo-image" />
                </div>
            </div>

            {/* Menu Section */}
            <div className="sidebar-menu">
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}
                    end
                    aria-label="Dashboard"
                >
                    {({ isActive }) => (
                        <>
                            <AiOutlineHome 
                                size={24} 
                                className={`icon ${isActive ? "active" : ""}`}
                                style={{ color: isActive ? '#007bff' : '#46555F' }}
                            />
                        </>
                    )}
                </NavLink>
                <NavLink 
                    to="/database" 
                    className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}
                    aria-label="Database"
                >
                    {({ isActive }) => (
                        <>
                            <AiOutlineDatabase 
                                size={24} 
                                className={`icon ${isActive ? "active" : ""}`}
                                style={{ color: isActive ? '#007bff' : '#46555F' }}
                            />
                        </>
                    )}
                </NavLink>
                <NavLink 
                    to="/reports" 
                    className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}
                    aria-label="Reports"
                >
                    {({ isActive }) => (
                        <>
                            <AiOutlineBarChart 
                                size={24} 
                                className={`icon ${isActive ? "active" : ""}`}
                                style={{ color: isActive ? '#007bff' : '#46555F' }}
                            />
                        </>
                    )}
                </NavLink>
            </div>

            {/* Notification Section */}
            <div className="sidebar-notification">
                <NavLink 
                    to="/support" 
                    className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}
                    aria-label="Support"
                >
                    {({ isActive }) => (
                        <>
                            <FaHeadset 
                                size={24} 
                                className={`icon ${isActive ? "active" : ""}`}
                                style={{ color: isActive ? '#007bff' : '#46555F' }}
                            />
                        </>
                    )}
                </NavLink>
            </div>

            {/* Logout Button */}
            <NavLink 
                to="/logout" 
                className="menu-item logout-button"
                aria-label="Logout"
            >
                <AiOutlineLogout size={24} className="icon" />
            </NavLink>

            {/* Profile Section */}
            <div className="sidebar-bottom">
                <div className="menu-item profile-container">
                    <img src={ProfileImage} alt="Profile" className="profile-image" />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
