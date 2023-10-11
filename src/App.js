import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import Stuff from "./Pages/Stuff";
import Calculator from "./Pages/Calculator";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Gallery from "./Pages/Gallery";
import Music from "./Pages/music";
import Videos from "./Pages/videos";
import Documents from "./Pages/documents";
import Error from "./Pages/Error";
import ImageOne from "./Pages/ImageOne";
import MusicOne from "./Pages/MusicOne";
import VideoOne from "./Pages/VideoOne";
import DocumentOne from "./Pages/DocumentOne";

function App() {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <NavBar />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
        {
          path: "Calculator",
          element: <Calculator />,
        },
        {
          path: "stuff",
          element: <Stuff />,
        },
        {
          path: "gallery",
          element: <Gallery />,
        },
        {
          path: "music",
          element: <Music />,
        },
        {
          path: "videos",
          element: <Videos />,
        },
        {
          path: "documents",
          element: <Documents />,
        },
        {
          path: "image/:name",
          element: <ImageOne />,
        },
        {
          path: "musicOne/:name",
          element: <MusicOne />,
        },
        {
          path: "VideoOne/:name",
          element: <VideoOne />,
        },
        {
          path : "DocumentOne/:name",
          element : <DocumentOne/>
        }
      ],
    },
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
