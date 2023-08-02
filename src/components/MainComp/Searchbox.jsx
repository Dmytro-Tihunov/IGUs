import React from "react";
import "./Main.css";

function Searchbox(props) {
  return (
      <div className="searchBox">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          onChange={props.handleChange}
          className="form-control"
          value={props.search}
          placeholder={props.placeholder}
        />
      </div>
  );
}

export default Searchbox;
