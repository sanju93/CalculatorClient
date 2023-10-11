import { useState } from "react";
import style from "../assets/styles/Login.module.css";
import axios from "axios";
import { toast } from "react-toastify";
function SignUp() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [ConfirmPassword, setConfirmPass] = useState("");
  let [submit, setSubmit] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (password === ConfirmPassword) {
      setSubmit(true);

      try {
        let res = await axios({
          url: "/users/signUp",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify({ name, email, password, ConfirmPassword }),
        });

        console.log(res.status);
        if (res.status === 200) {
          toast.success("User has been created");
          setSubmit(false);
        }
        setConfirmPass("");
        setEmail("");
        setName("");
        setPassword("");
      } catch (err) {
        setSubmit(false);

        if (err.response.status === 300) {
          toast.info("User already there pls Do sign IN");
        } else {
          toast.error("Something Error is getting in Sign Up");
        }
      }
    } else {
      toast.error("do Check your password and confirm password :");
      setConfirmPass("");
      setPassword("");
    }
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={style.container}>
          <div className={style.labels}>
            <label>Name : </label>
            <label>Email : </label>
            <label>Password :</label>
            <label>Confirm Password :</label>
          </div>
          <div className={style.inputs}>
            <input
              type="text"
              placeholder="Enter your Name.."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
            <input
              type="password"
              placeholder="Enter the Confirm Password"
              value={ConfirmPassword}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
          </div>
        </div>
        <input
          type="submit"
          value={!submit ? "SignUp" : "Signing Up..."}
          className={style.submit}
        ></input>
      </form>
    </>
  );
}

export default SignUp;
