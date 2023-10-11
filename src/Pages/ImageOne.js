import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ImageOne() {
  let [data, setData] = useState("");
  let { name } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      let res = await fetch(`/users/image/${name}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      let data = await res.blob();

      setData(URL.createObjectURL(data));
    }
    fetchData();
  }, []);

  return (
    <>
      <button onClick={() => navigate("/gallery")}>return back</button>
      <img src={data} alt="gallery"></img>
    </>
  );
}

export default ImageOne;
