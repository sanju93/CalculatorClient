import style from "../assets/styles/Login.module.css";
import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { auth } from "../context/context";
import { useNavigate } from "react-router-dom";

function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [submit, setSubmit] = useState(false);
  let item = useContext(auth);
  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmit(true);

    try {
      let res = await axios({
        url: "/users/signIN",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ email, password }),
      });

      if (res.status === 200) {
        toast.success("Login successfully completed");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setSubmit(false);
        item.setData(true);
        item.setUser(res.data.user);
        navigate("/Calculator");
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        toast.error("Password is inCorrect");
      } else if (err.response.status === 501) {
        toast.error("User is not there");
        navigate("/signup");
      } else {
        toast.error("Something error is getting :");
      }

      setSubmit(false);
    }

    setEmail("");
    setPassword("");
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={style.container}>
          <div className={style.labels}>
            <label>Email : </label>
            <label>Password :</label>
          </div>
          <div className={style.inputs}>
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>

            <input
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>
          </div>
        </div>
        <input
          type="submit"
          value={!submit ? "Login" : "Logging..."}
          className={style.submit}
        ></input>
      </form>
    </>
  );
}

export default Login;
