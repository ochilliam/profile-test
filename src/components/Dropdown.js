import React, { useState } from "react";
import "../assets/css/Dropdown.css";
import { ReactComponent as ArrowDown } from "../assets/icons/chevron-down.svg";
import { ReactComponent as Close } from "../assets/icons/x.svg";
import DropdownItem from "./DropdownItem";

function Dropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="header__dropdown">
      <button onClick={() => setOpen(!open)} className="header__dropdown--btn">
        <span>انتخاب دسته بندی</span>
        {open ? (
          <Close width={20} className="header__dropdown--icon" />
        ) : (
          <ArrowDown className="header__dropdown--icon" />
        )}
      </button>

      {open && <DropdownItem />}
    </div>
  );
}

export default Dropdown;
