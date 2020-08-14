import React, { useState, useRef } from "react";
import { ReactComponent as Plus } from "../assets/plus.svg";

function DropdownItem() {
  const [category, setCategory] = useState(["مدیریت محصول", "طراحی محصول"]);

  const [newCategory, setnewCategory] = useState(false);
  const categoryRef = useRef(null);

  const onSaveNewCategory = () => {
    setCategory([...category, categoryRef.current?.value]);
  };

  const onHandleKeyPress = (evt) => {
    if (evt.key === "Enter") {
      onSaveNewCategory();
    }
    return null;
  };

  return (
    <div className="dropdown">
      {category.map((item, idx) => (
        <li className="dropdown__item" key={`${item}${idx}`}>
          {item}
        </li>
      ))}

      {newCategory ? (
        <>
          <input
            className="dropdown__input"
            placeholder="عنوان دسته بندی"
            type="text"
            onKeyPress={onHandleKeyPress}
            ref={categoryRef}
          />
          <button
            type="button"
            onClick={onSaveNewCategory}
            className="dropdown__btn"
          >
            ایجاد
          </button>
        </>
      ) : (
        <button
          onClick={() => setnewCategory(!newCategory)}
          className="header__dropdown--btn"
          type="button"
        >
          <span>دسته بندی جدید</span>
          <Plus className="button-svg" />
        </button>
      )}
    </div>
  );
}

export default DropdownItem;
