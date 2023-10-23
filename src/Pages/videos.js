import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import { Button, Stack } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import { styled } from "@mui/material/styles";
import style from "../assets/styles/videos.module.css";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";

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

function Videos() {
  let fileRef = useRef(null);
  let [videos, setVideos] = useState([]);
  let [progress, setProgress] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    async function fetchVideos() {
      try {
        let res = await axios({
          method: "GET",
          url: "/users/videos",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.status === 200) {
          setVideos(res.data);
        }
      } catch (err) {
        console.log(err);
        toast.error("something went wrong");
      }
    }

    fetchVideos();
  }, []);

  async function handleUpload() {
    if (fileRef.current.files.length !== 0) {
      let name = fileRef.current.files[0].name;

      let temp = videos.find((item) => item.name === name);

      if (temp) {
        toast.info("File Already There");
      } else {
        let formData = new FormData();
        formData.append("video", fileRef.current.files[0]);
        //calling api
        try {
          let res = await axios({
            method: "POST",
            url: "/users/upload/video",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/formdata",
            },
            data: formData,
            onUploadProgress: (process) =>
              setProgress(Math.trunc((process.loaded / process.total) * 100)),
          });

          if (res.status === 200) {
            toast.success("Video uploaded Successfully");

            setTimeout(() => {
              setProgress(null);
            }, 5000);
          }
        } catch (err) {
          console.log(err);
        }
      }

      fileRef.current.value = "";
    } else {
      toast.info("Select atleast One file");
    }
  }

  function handleClick(name) {
    navigate(`/VideoOne/${name}`);
  }

  async function handleDelete(name) {
    try {
      let res = await axios({
        method: "Delete",
        url: `/users/delete_video?name=${name}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.status === 200) {
        setVideos(videos.filter((item) => item.name !== name));
        toast.success("Video Deleted Successfully");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
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
          <VisuallyHiddenInput type="file" accept="video/*" ref={fileRef} />
        </Button>

        <Button
          startIcon={<UploadFileIcon />}
          size="medium"
          color="primary"
          variant="outlined"
          onClick={handleUpload}
        >
          Upload
        </Button>
      </Stack>

      {progress ? (
        <>
          {" "}
          <LinearProgress
            value={progress}
            variant="determinate"
          ></LinearProgress>
          <span>{progress}%</span>
        </>
      ) : (
        ""
      )}
      <Stack marginTop={3} border={1} direction={"column"} spacing={3}>
        {videos.map((item, index) => (
          <p key={index} className={`${style.video}`}>
            <Button
              variant="text"
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

export default Videos;
