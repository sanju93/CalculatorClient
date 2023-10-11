import style from "../assets/styles/stuff.module.css";
import { NavLink } from "react-router-dom";

function Stuff() {
  return (
    <>
      <div className={style.container}>
        <div className={`${style.child}`}>
          <NavLink to={"/gallery"}>
            {" "}
            <img
              src={require("../assets/images/background/images.png")}
              alt="gallery"
            />
          </NavLink>
        </div>
        <div className={`${style.child} ${style.music}`}>
          {" "}
          <NavLink to={"/music"} style={{ textDecoration: "none" }}>
            <img
              src={require("../assets/images/background/music.png")}
              alt={"music"}
            />
          </NavLink>
        </div>
        <div className={`${style.child} ${style.video}`}>
          {" "}
          <NavLink to={"/videos"} style={{ textDecoration: "none" }}>
            <img
              src={require("../assets/images/background/video.png")}
              alt="video"
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
      </div>
    </>
  );
}

export default Stuff;
