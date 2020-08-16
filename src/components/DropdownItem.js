import React, { useState, useRef } from "react";
import { ReactComponent as Plus } from "../assets/icons/plus.svg";

function DropdownItem() {
  const [category, setCategory] = useState([]);

  const [newCategory, setCategoryState] = useState(false);
  const categoryRef = useRef(null);

  const onSaveNewCategory = () => {
    setCategory((prevCategory) => [
      ...prevCategory,
      categoryRef.current?.value,
    ]);
    setTimeout(() => (categoryRef.current.value = ""), 0);
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
        <li className="dropdown__item" key={idx.toString()}>
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
          onClick={() => setCategoryState(!newCategory)}
          className="header__dropdown--btn"
          type="button"
        >
          <span>دسته بندی جدید</span>
          <Plus width={20} className="footer__dropdown--icon" />
        </button>
      )}
    </div>
  );
}

export default DropdownItem;
