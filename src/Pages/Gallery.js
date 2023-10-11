import style from "../assets/styles/gallery.module.css";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

function Gallery() {
  let [file, setFile] = useState(null);
  let Files = useRef(null);
  let [images, setImages] = useState([]);

  let navigate = useNavigate();
  useEffect(() => {
    async function fetchImages() {
      let res = await axios({
        method: "GET",
        url: "/users/images",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.status === 200) {
        console.log(res.data);
        setImages(res.data);
      }
    }

    fetchImages();
  }, []);

  function handleFile(e) {
    setFile(e.target.files[0]);
  }

  async function handleUpload() {
    if (file !== null) {
      let temp = images.find((item) => item.name === file.name);
      if (temp) {
        toast.info("File Already added");
      } else {
        let form = new FormData();
        form.append("gallery", file);

        try {
          await axios({
            url: "/users/upload/gallery",
            method: "POST",
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            data: form,
          });

          toast.success("file Uploaded");
        } catch (err) {
          console.log(err);
          toast.error("Something error getting");
        }
      }
      Files.current.value = "";
      setFile(null);
    } else {
      toast.info("Select atleast one file");
    }
  }

  async function handleClick(name) {
    navigate(`/image/${name}`);
  }

  return (
    <>
      <div className={style.upload}>
        <input
          type="file"
          accept="image/*"
          ref={Files}
          onChange={(e) => handleFile(e)}
        ></input>
        <input type="button" value="upload" onClick={handleUpload}></input>
      </div>
      <h1>Gallery</h1>

      {images.map((item, index) => (
        <p key={index} onClick={() => handleClick(item.name)}>
          {item.name}
        </p>
      ))}
    </>
  );
}

export default Gallery;
