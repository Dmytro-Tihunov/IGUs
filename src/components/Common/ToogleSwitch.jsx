import { useState } from "react";

import "./Menu.css";

export default function Toggle({ toggled, onClick }) {
    const [isToggled, toggle] = useState(toggled);
  
    const callback = () => {
      toggle(!isToggled);
      onClick(!isToggled);
    };
  
    return (
      <label className="show-favorites">
        <input type="checkbox" defaultChecked={isToggled} onClick={callback} />
        <span></span>
      </label>
    );
  }