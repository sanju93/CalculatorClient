import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import { Button, Stack } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import { styled } from "@mui/material/styles";
import style from '../assets/styles/videos.module.css';

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

function Music() {
  let file = useRef(null);
 
  let [music, setMusic] = useState([]);
  let [progress, setProgress] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    async function fetchingAudio() {
      try {
        let res = await axios({
          method: "GET",
          url: "/users/musics",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.status === 200) {
          setMusic(res.data);
        }
      } catch (err) {
        console.log(err);
        toast.error("Error getting in fetching the musics");
      }
    }

    fetchingAudio();
  }, []);


  async function handleDelete(name){

    try{

      let res = await axios({
        method : "DELETE",
        url : `/users/delete_music?name=${name}`,
        headers : {
          'Authorization' : `Bearer ${localStorage.getItem('token')}`
        }
      })
  
      if (res.status === 200){

        toast.success("File deleted Successfully");

        setMusic(music.filter((item) => item.name !== name));
  
      }

    }catch(err){
      
      if (err.response.status === 500){
        toast.error("Internal server Error");
      }else {
        toast.error("Token Expired Relogin Again");
        navigate('/login');
      }

    }
   
   


  }


  async function handleUpload() {

    if (file.current.files.length !== 0) {
      let name = file.current.files[0].name;
      let temp = music.find((item) => item.name === name);
      if (temp) {
        toast.info("File Already Uploaded");
      } else {
        let form = new FormData();
        form.append("music", file.current.files[0]);
        try {
          let res = await axios({
            url: "/users/upload/audio",
            method: "POST",
            headers: {
              "Content-Type": "multipart/formdata",
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            data: form,
            onUploadProgress: (process) =>
              setProgress((process.event.loaded / process.event.total) * 100),
          });

          if (res.status === 200) {
            toast.success("Music uploaded Succesfully");

            setTimeout(() => {
              setProgress(null);
            }, 5000);
          }
        } catch (err) {
          toast.error("Something error is getting");
        }
      }

      file.current.value = "";

    } else {
      toast.info("Select atleast One file");
    }
  }

  function handleClick(name) {
    navigate(`/musicOne/${name}`);
  }

  return (
    <>
    {/* mui content */}

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
          <VisuallyHiddenInput type="file" accept="audio/*" ref={file} />
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




      {/* <input
        type="file"
        ref={file}
        onChange={handleFile}
        accept="audio/mp3"
      ></input>
      <input type="button" value="upload" onClick={handleUpload}></input> */}
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
        {music.map((item, index) => (
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

export default Music;
