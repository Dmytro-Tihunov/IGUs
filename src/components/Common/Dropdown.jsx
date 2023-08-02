import React from "react";
import "./Menu.css";

const Dropdown = ({ submenus, dropdown, depthLevel, callback  }) => {
    depthLevel = depthLevel + 1;
    const dropdownClass = depthLevel > 1 ? 'dropdown-submenu' : '';
    return (
      <ul className={`dropdowns ${dropdownClass} ${
        dropdown ? 'show' : ''
      }`}>
        {submenus.map((submenu, index) => (
          <li key={index} className="menu-items">
            <button  onClick={() => callback(submenu)} value={submenu}>{submenu}</button>
          </li>
        ))}
      </ul>
    );
  };
  
export default Dropdown;