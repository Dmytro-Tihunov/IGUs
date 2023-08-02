import React, { useRef } from "react";
import { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import "./Menu.css";

const MenuItems = ({ items, callback }) => {
  const [dropdown, setDropdown] = useState(false);
  let ref = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true);
  };

  const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false);
  };

  const closeDropdown = () => {
    dropdown && setDropdown(false);
  };

  function callbackFunction(childData) {
    callback(childData);
  }

  return (
    <li
      className="menu-items"
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={closeDropdown}
    >
      {items.subcategories ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => callback(items.name)}
            value={items.name}
          >
            {items.name}
          </button>
          <Dropdown submenus={items.subcategories} callback={callbackFunction} dropdown={dropdown} />
        </>
      ) : (
        <button onClick={() => callback(items.name)} value={items.name}>{items.name}</button>
      )}
    </li>
  );
};

export default MenuItems;
