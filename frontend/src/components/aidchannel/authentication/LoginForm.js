import "./authentication.css";
import "./authentication.css";
import toastr from "toastr";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import "toastr/build/toastr.css";
import { useHistory } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const submitSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3010/auth/signin", user);
      alert(JSON.stringify(res));
      console.log(res, "res");
      localStorage.setItem("jwt_info", JSON.stringify(res.data));
      toastr.info("Welcome among us ", {
        positionClass: "toast-bottom-left",
      });
      history.push("/");
    } catch (error) {
      console.log(error);
      toastr.warning("Please check your informations!", {
        positionClass: "toast-bottom-left",
      });
    }
  };

  return (
    <form onSubmit={submitSignIn}>
      <div className="centralize">
        <div className="input-block">
          <input
            onChange={handleChange}
            className="input"
            type="text"
            id="email"
            spellCheck="false"
            required
          />
          <span className="placeholder">Email address</span>
        </div>
      </div>
      <div className="centralize mt-4">
        <div className="input-block">
          <input
            onChange={handleChange}
            className="input"
            type="password"
            id="password"
            spellCheck="false"
            required
          />
          <span className="placeholder">Password</span>
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary form-control submit-login mt-4"
      >
        SIGN IN
      </button>
    </form>
  );
};

export default LoginForm;
