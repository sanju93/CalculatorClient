import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function MusicOne() {
  let param = useParams();
  let navigate = useNavigate();
  let [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    async function handleThumbnail() {
      let res = await fetch(`/users/thumbnail/${param.name}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      let data = await res.blob();
      setThumbnail(URL.createObjectURL(data));
    }

    handleThumbnail();
  }, []);
  return (
    <>
      <button onClick={() => navigate("/music")}>return back</button>
      Music One
      {thumbnail ? (
        <img src={thumbnail} height="400px" width="500px" alt="ImageOne"></img>
      ) : (
        ""
      )}
      <audio controls style={{ width: "100%" }} autoPlay>
        <source src={`/users/music/${param.name}`}></source>
      </audio>
    </>
  );
}

export default MusicOne;
