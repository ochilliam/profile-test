import React, { useState, useRef } from "react";
import "../assets/css/App.css";
import briefcase from "../assets/icons/briefcase.png";
import bell from "../assets/icons/bell.png";
import home from "../assets/icons/home.png";
import { ReactComponent as Close } from "../assets/icons/x.svg";
import DropdownMenu from "./Dropdown";

function App() {
  const [imgList, setImgList] = useState([]);
  const [textInput, setTextInput] = useState({});
  const [imgFile, setImgFile] = useState([]);

  const pictureInputRef = useRef(null);

  const onSubmitPost = (evt) => {
    evt.preventDefault();

    return console.log({
      ...textInput,
      ...imgFile,
    });
  };

  const onRemoveImg = (selectedItem) => {
    setImgList(imgList.filter((prevItem) => prevItem !== selectedItem));
  };

  const onChangeTextarea = (evt) => {
    evt.persist();

    return setTextInput((prevInput) => ({
      ...prevInput,
      inputText: evt.target.value,
    }));
  };

  const onOpenPictureInput = () => {
    return pictureInputRef.current?.click();
  };

  const onChangePictureInput = async (evt) => {
    evt.persist();

    const accepetedTypes = ["image/png", "image/jpeg", "image/gif"];
    const files = Array.from(evt.target.files);
    const clientPreview = [];

    // #1 Not allowing more than 3 files
    if (files.length > 3) {
      console.log("Only 3 images can be uploaded at a time");
    }

    await asyncForEach(files, async (file, idx) => {
      // #2 Catching wrong file types on the client
      if (accepetedTypes.every((type) => file.type !== type)) {
        console.log(`'${file.type}' is not a supported format`);
      }

      // #3 Catching files that are too large on the client | max 10mb
      if (file.size > 10000000) {
        console.log(`'${file.name}' is too large, please pick a smaller file`);
      }
      let picBase64 = await fileBase64(file);

      clientPreview.push(picBase64);
    });

    setImgList((prevList) => [...prevList, ...clientPreview]);
    setImgFile((prevFiles) => [...prevFiles, ...files]);
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
      <CreatePostForm onChange={onChangeTextarea} onSubmit={onSubmitPost}>
        <PreviewUploadedImg
          images={imgList}
          alt="an image"
          onClick={onRemoveImg}
        />

        <CreatePostFooter>
          <FileInputButton src={briefcase} alt="briefcase icon" id="input3" />
          <FileInputButton src={bell} alt="bell icon" id="input2" />
          <FileInputButton
            id="input1"
            src={home}
            alt="home icon"
            onClick={onOpenPictureInput}
            onChange={onChangePictureInput}
            reference={pictureInputRef}
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

function PreviewUploadedImg(props) {
  return (
    <div className="post__filePreview">
      {props.images?.map((base64Path, idx) => (
        <div
          key={`img-${idx}`}
          style={{ backgroundImage: `url(${base64Path})` }}
          className={`post__filePreview--img${idx}`}
        >
          <Close
            onClick={props.onClick.bind(null, base64Path)}
            className={`post__filePreview--svg${idx}`}
          />
        </div>
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
        onChange={props.onChange}
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
        ref={props.reference}
        type="file"
        id={props.id}
        className="hidden"
        onChange={props.onChange}
        multiple
      />
    </>
  );
}

export default App;
