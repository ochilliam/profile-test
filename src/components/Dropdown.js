import React, { useState } from "react";
import "../assets/Dropdown.css";
import { ReactComponent as ArrowDown } from "../assets/chevron-down.svg";
import { ReactComponent as Close } from "../assets/x.svg";
import DropdownItem from "./DropdownItem";

function Dropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="header__dropdown">
      <button onClick={() => setOpen(!open)} className="header__dropdown--btn">
        <span>انتخاب دسته بندی</span>
        {open ? (
          <Close className="button-svg" />
        ) : (
          <ArrowDown className="button-svg" />
        )}
      </button>

      {open && <DropdownItem />}
    </div>
  );
}

export default Dropdown;