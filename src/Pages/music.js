import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LinearProgress } from "@mui/material";
function Music() {
  let file = useRef(null);
  let [audio, setAudio] = useState(null);
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
        toast.error("Error getting in fetching the musics");
      }
    }

    fetchingAudio();
  }, []);

  function handleFile(e) {
    setAudio(file.current.files[0]);
  }

  async function handleUpload() {
    if (audio) {
      let temp = music.find((item) => item.name === audio.name);
      if (temp) {
        toast.info("File Already Uploaded");
      } else {
        let form = new FormData();
        form.append("music", audio);
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
      setAudio(null);
    } else {
      toast.info("Select atleast One file");
    }
  }

  function handleClick(name) {
    navigate(`/musicOne/${name}`);
  }

  return (
    <>
      <input
        type="file"
        ref={file}
        onChange={handleFile}
        accept="audio/mp3"
      ></input>
      <input type="button" value="upload" onClick={handleUpload}></input>
      {progress ? (
        <>
          {" "}
          <LinearProgress variant="determinate" value={progress} />{" "}
          <span>{progress}%</span>
        </>
      ) : (
        ""
      )}

      {music.map((item, index) => {
        return (
          <p key={index} onClick={() => handleClick(item.name)}>
            {" "}
            {item.name}{" "}
          </p>
        );
      })}
    </>
  );
}

export default Music;
