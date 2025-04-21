import React, { useState, useEffect } from "react";
import "./SidebarStyle.css";
import logo from "./logo.png";
import { getAuth } from 'firebase/auth';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const toggleSidebar = () => {
      const sidebar = document.getElementById("sidebar");
      sidebar.classList.toggle("expand");
    };

    const hamBurger = document.querySelector(".toggle-btn");
    hamBurger.addEventListener("click", toggleSidebar);

    return () => {
      hamBurger.removeEventListener("click", toggleSidebar);
    };
  }, []);

  const handleSignOut = () => {
    auth.signOut();
  };

  const auth = getAuth();

  const menuItems = [
    { href: "/home", iconClass: "lni lni-home", label: "Home" },
    { href: "/ProfilePage", iconClass: "lni lni-user", label: "Profile" },
    { href: "/myorder", iconClass: "lni lni-layers", label: "My Orders" },
    { href: "/Address", iconClass: "lni lni-map-marker", label: "Billing Address" },
  ];

  return (
    <div className={`wrapper ${isExpanded ? "expanded" : ""}`}>
      <aside id="sidebar">
        <div className="d-flex">
          <button className="toggle-btn" type="button">
            <i className="lni lni-grid-alt"></i>
          </button>
          <div className="sidebar-logo">
            <img src={logo} alt="" className="LogoImg" />
          </div>
        </div>
        <ul className="vstack p-0">
          {menuItems.map((item, index) => (
            <li className="sidebar-item" key={index}>
              <a href={item.href} className="sidebar-link">
                <i className={item.iconClass}></i>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="sidebar-footer">
          <a href="/login" className="sidebar-link" onClick={handleSignOut}>
            <i className="lni lni-exit"></i>
            <span>Sign out</span>
          </a>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
