import {Stack} from '@mui/material';
import { NavLink } from "react-router-dom";

function Stuff() {
  return (
    <>

    <Stack direction={"row"} spacing = {15} padding={9}>
    
        <div>
          <NavLink to={"/gallery"}>
            {" "}
            <img
              src={require("../assets/images/background/images.png")}
              alt="gallery"
              height={"300px"}
              width = {"300px"}
            />
          </NavLink>
        </div>
        <div>
          {" "}
          <NavLink to={"/music"} style={{ textDecoration: "none" }}>
            <img
              src={require("../assets/images/background/music.png")}
              alt={"music"}
              height={"250px"}
              width = {"250px"}
            />
          </NavLink>
        </div>
        <div>
          {" "}
          <NavLink to={"/videos"} style={{ textDecoration: "none" }}>
            <img
              src={require("../assets/images/background/video.png")}
              alt="video"
              height={"300px"}
              width={"300px"}
            />
          </NavLink>
        </div>
        {/* <div className={`${style.child} ${style.document}`}>
          {" "}
          <NavLink to={"/documents"} style={{ textDecoration: "none" }}>
            <img
              src={require("../assets/images/background/documents.png")}
              alt="document"
            />
          </NavLink>
        </div> */}

        </Stack>
      
    </>
  );
}

export default Stuff;
