
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Stack } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import { styled } from "@mui/material/styles";
import style from '../assets/styles/videos.module.css';
import { LinearProgress } from "@mui/material";

import { useNavigate } from "react-router-dom";

function Gallery() {

  let Files = useRef(null);
  let [images, setImages] = useState([]);
  let[progress,setProgress] = useState(0);

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


  const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;



  async function handleUpload() {

    if (Files.current.files.length !== 0) {
      let temp = images.find((item) => item.name === Files.current.files[0].name);
      if (temp) {
        toast.info("File Already added");
      } else {
        let form = new FormData();
        form.append("gallery", Files.current.files[0]);

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
            onUploadProgress : (process) => {
               setProgress(Math.trunc((process.event.loaded / process.event.total) * 100))
            }
          });

          toast.success("file Uploaded");
        } catch (err) {
          console.log(err);
          toast.error("Something error getting");
        }
      }
      Files.current.value = "";
     
    } else {
      toast.info("Select atleast one file");
    }
  }

   function handleClick(name) {
    navigate(`/image/${name}`);
  }

  function handleDelete(name){
     
  }

  return (
    <>
      {/* <div className={style.upload}>
        <input
          type="file"
          accept="image/*"
          ref={Files}
          onChange={(e) => handleFile(e)}
        ></input>
        <input type="button" value="upload" onClick={handleUpload}></input>
      </div> */}
      <h1>Gallery</h1>


      <Stack direction={"row"} spacing={5} marginTop={"30px"}>
        <Button
          component="label"
          variant="contained"
          startIcon={<ArrowBackSharpIcon />}
          onClick={() => navigate("/stuff")}
        >
          Back
        </Button>
        <Button
          component="label"
          variant="contained"
          startIcon={<VideoFileIcon />}
          href="#file-upload"
        >
          choose a File
          <VisuallyHiddenInput type="file" accept="image/*" ref={Files} />
        </Button>

        <Button
          startIcon={<UploadFileIcon />}
          size="medium"
          color="primary"
          variant="outlined"
          onClick={() => {
            handleUpload();
          }}
        >
          Upload
        </Button>
      </Stack>


      {/* {images.map((item, index) => (
        <p key={index} onClick={() => handleClick(item.name)}>
          {item.name}
        </p>
      ))} */}
          {progress ? (
        <>
          {" "}
          <LinearProgress variant="determinate" value={progress} />{" "}
          <span>{progress}%</span>
        </>
      ) : (
        ""
      )}

<Stack marginTop={3} border={1} direction={"column"} spacing={3}>
        {images.map((item, index) => (
          <p key={index} className={`${style.video}`}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleClick(item.name)}
            >
              {item.name}
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleDelete(item.name)}
            >
              Delete
            </Button>
          </p>
        ))}
      </Stack>
    </>
  );
}

export default Gallery;
