import React from "react";
import "../assets/App.css";
import briefcase from "../assets/briefcase.png";
import bell from "../assets/bell.png";
import home from "../assets/home.png";

const onPostSubmit = () => {
  console.log("yay");
};

function App() {
  return (
    <div className="base font-vazir">
      <div className="header">
        <img
          width="42"
          height="42"
          alt="profile avatar."
          src="https://source.unsplash.com/dnL6ZIpht2s"
          className="header__avatar"
        />

        {/* TODO: Add selec box component */}
        <div className="header__dropdown">
          انتخاب دسته بندی
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="dropdownSvg"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
      {/* =============== Close Header ============== */}

      <form onSubmit={onPostSubmit} className="post">
        <label htmlFor="postInput" className="post__label">
          عنوان مطلب
        </label>
        <textarea
          name="postInput"
          className="post__input"
          id="postInput"
          placeholder="متن مورد نظر خود را تایپ کنید"
          dir="rtl"
          cols={35}
          rows={4}
        ></textarea>

        {/* ================== Close Text Area ================ */}

        <div className="selection">
          <div className="selection__wrapper">
            <div className="selection__body">
              <button className="icon-btn" type="button">
                <img
                  src={briefcase}
                  className="selection_icon"
                  height="25"
                  width="25"
                  alt="a briefcase icon"
                />
              </button>
              <button className="icon-btn" type="button">
                <img
                  className="selection_icon"
                  src={bell}
                  height="25"
                  width="25"
                  alt="a bell icon"
                />
              </button>
              <button className="icon-btn" type="button">
                <img
                  className="selection_icon"
                  src={home}
                  height="25"
                  width="25"
                  alt="a home icon"
                />
              </button>
            </div>
            <div>
              <button className="selection__btn" type="submit">
                انتشار
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
