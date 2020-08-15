import React, { useState, useRef } from "react";
import "../assets/App.css";
import briefcase from "../assets/briefcase.png";
import bell from "../assets/bell.png";
import home from "../assets/home.png";
import DropdownMenu from "./Dropdown";

function App() {
  const [form, setForm] = useState({
    serverFiles: ["https://source.unsplash.com/dnL6ZIpht2s"],
    clientPreview: [],
  });
  const pictureInputRef = useRef(null);

  const onSubmitPost = (evt) => {
    evt.preventDefault();
  };

  const onOpenPictureInput = () => {
    return pictureInputRef.current?.click();
  };

  const onChangePictureInput = (evt) => {
    const accepetedTypes = ["image/png", "image/jpeg", "image/gif"];
    const files = Array.from(evt.target.files);
    const clientPreview = [];

    // #1 Not allowing more than 3 files
    if (files.length > 3) {
      console.log("Only 3 images can be uploaded at a time");
    }

    asyncForEach(files, async (file) => {
      // #2 Catching wrong file types on the client
      if (accepetedTypes.every((type) => file.type !== type)) {
        console.log(`'${file.type}' is not a supported format`);
      }

      // #3 Catching files that are too large on the client | max 10mb
      if (file.size > 10000000) {
        console.log(`'${file.name}' is too large, please pick a smaller file`);
      }

      return clientPreview.push(await fileBase64(file));
    });

    setForm({
      ...form,
      serverFiles: [...files],
      clientPreview,
    });
  };

  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  function fileBase64(file) {
    if (typeof file !== "object") {
      throw new Error(
        "Could not generate base64 path. make sure you pass the Object format."
      );
    }

    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  }

  return (
    <div className="base font-vazir">
      <div className="relative header">
        <UserAvatar />
        <DropdownMenu />
      </div>
      <CreatePostForm onSubmit={onSubmitPost}>
        <PreviewUploadedImg images={form} alt="an image" />

        <CreatePostFooter>
          <FileInputButton src={briefcase} alt="briefcase icon" />
          <FileInputButton src={home} alt="home icon" />
          <FileInputButton
            src={bell}
            alt="bell icon"
            onClick={onOpenPictureInput}
            onChange={onChangePictureInput}
            referenc={pictureInputRef}
          />
        </CreatePostFooter>
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

function PreviewUploadedImg({ images, alt }) {
  return (
    <div className="post__filePreview">
      {images.clientPreview.map((base64Path, idx) => (
        <img
          key={`img_${idx}`}
          src={base64Path}
          alt={alt}
          className="post__filePreview--img"
        />
      ))}
    </div>
  );
}

function CreatePostForm(props) {
  return (
    <form onSubmit={props.onSubmit} className="post">
      <label htmlFor="postInput" className="post__label">
        عنوان مطلب
      </label>
      <textarea
        name="postInput"
        className="post__input"
        id="postInput"
        ref={props.ref}
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

function CreatePostFooter(props) {
  return (
    <div className="footer">
      <div className="footer__wrapper">
        <div className="footer__body">
          {/* File input button goes here */}
          {props.children}
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

function FileInputButton(props) {
  return (
    <>
      <button type="button" onClick={props.onClick}>
        <img
          src={props.src}
          draggable="false"
          alt={props.alt}
          width="25"
          height="25"
        />
      </button>
      <input
        ref={props.referenc}
        type="file"
        id="multiple"
        className="hidden"
        onChange={props.onChange}
        multiple
      />
    </>
  );
}

export default App;
