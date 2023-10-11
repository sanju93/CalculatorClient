import { Outlet } from "react-router-dom";
import { auth } from "../context/context";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {Button,Stack} from "@mui/material";

function NavBar() {
  let [data, setData] = useState(false);
  let [user, setUser] = useState({});
  let [verify, setVerify] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    let item = localStorage.getItem("token");
    if (item) {
      setData(true);
      let user = localStorage.getItem("user");
      user = JSON.parse(user);
      setUser(user);
    }
  }, []);

  async function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setData(false);
    setUser({});
    navigate("/");
  }

  return (
    <>
      <auth.Provider
        value={{ data, setData, setUser, user, verify, setVerify }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="sticky">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <NavLink
                  to={"/"}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Button variant="outlined" color="inherit">
                    Home
                  </Button>
                </NavLink>
              </Typography>

              <Stack spacing={"40px"} direction={"row"}>

              {data ? (
                <NavLink to={"Calculator"} style={{ textDecoration: "none" ,color: "white"}}>
                  <Button variant="outlined" color="inherit">
                    {user.name}
                  </Button>
                </NavLink>
              ) : (
                <NavLink
                  to={"login"}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Button variant="outlined" color="inherit">
                    Login
                  </Button>
                </NavLink>
              )}

              {data ? (
                ""
              ) : (
                <NavLink
                  to={"signup"}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Button variant="outlined" color="inherit">
                    SignUp
                  </Button>
                </NavLink>
              )}

              {data ? (
                <Button
                  onClick={handleLogout}
                  variant="outlined"
                  color="inherit"
                >
                  Logout
                </Button>
              ) : (
                ""
              )}
              </Stack>
            </Toolbar>
          </AppBar>
        </Box>

        <Outlet />
      </auth.Provider>
    </>
  );
}

export default NavBar;
