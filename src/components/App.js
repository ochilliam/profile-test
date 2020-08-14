import React from "react";
import "../assets/App.css";
import briefcase from "../assets/briefcase.png";
import bell from "../assets/bell.png";
import home from "../assets/home.png";
import DropdownMenu from "./Dropdown";

const onPostSubmit = () => {
  console.log("yay");
};

function App() {
  return (
    <div className="base font-vazir">
      <div className="relative header">
        <UserAvatar />
        <DropdownMenu />
      </div>
      <CreatePostForm>
        <CreatePostFooter />
      </CreatePostForm>
    </div>
  );
}

function UserAvatar() {
  return (
    <img
      width="42"
      height="42"
      alt="profile avatar."
      src="https://source.unsplash.com/dnL6ZIpht2s"
      className="header__avatar"
    />
  );
}

function CreatePostForm(props) {
  return (
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
      />

      {/* ================== CreatePostFooter goes here ================ */}
      {props.children}
    </form>
  );
}

function CreatePostFooter() {
  return (
    <div className="footer">
      <div className="footer__wrapper">
        <div className="footer__body">
          <IconButton src={briefcase} alt="briefcase icon" />
          <IconButton src={bell} alt="bell icon" />
          <IconButton src={home} alt="home icon" />
        </div>
        <div>
          <button className="footer__btn" type="submit">
            انتشار
          </button>
        </div>
      </div>
    </div>
  );
}

function IconButton(props) {
  return (
    <button>
      <img src={props.src} alt={props.alt} width="25" height="25" />
    </button>
  );
}

export default App;
