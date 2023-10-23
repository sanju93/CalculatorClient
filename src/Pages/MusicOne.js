import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Stack ,Typography} from "@mui/material";

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
    <Stack direction={"row"} spacing={5} marginTop={"30px"}>
      <Button variant="contained"  type="button" onClick={() => navigate("/music")}>return back</Button>
 
      {thumbnail ? (
        <img src={thumbnail} style={{marginLeft : "190px"}} height="400px" width="700px" alt="Thumnail"></img>
      ) : (
        ""
      )}
     <Button variant="button" type="button" color="primary" disabled>
           {param.name}
     </Button>

       

    
      </Stack>
      <audio controls style={{ width: "100%", position : "fixed", top : "90vh", left : "0px"}}  autoPlay>
        <source src={`/users/music/${param.name}`}></source>
      </audio>
    
    </>
  );
}

export default MusicOne;
