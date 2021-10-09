import "./authentication.css";
import toastr from "toastr";
import { Link, history } from "react-router-dom";
import React, { useState } from "react";
import "toastr/build/toastr.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { LinkedIn } from "react-linkedin-login-oauth2";
import { setAuthorizationToken } from "apis";
import { authenticate } from "helpers/authorization";
import linkedin from "react-linkedin-login-oauth2/assets/linkedin.png";
import LinkedinPage from "./LinkedinPage"

const LoginFormLinkedin = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [state,setState] = useState({
    code: '',
    errorMessage: '',
  });

  const history = useHistory();
  const sendLinkedinToken = (tokenId) => {
    axios
      .post(`${process.env.REACT_APP_BACKEND}user/linkedinlogin`, {
        idToken: tokenId,
      })
      .then((res) => {
        console.log(res.data);
        informParent(res);
      })
      .catch((error) => {
        console.log("Linkedin SIGNIN ERROR", error.response);
      });
  };
  const informParent = (response) => {
    authenticate(response, () => {
      history.push("/linkdin");
    });
  };
  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };
  const responseLinkedin = (response) => {
    console.log(response);
    sendLinkedinToken(response.tokenId);
  };
  const submitSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND}user/login`,
        user
      );
      setAuthorizationToken(res?.data?.token);
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      toastr.info("Welcome among us ", {
        positionClass: "toast-bottom-left",
      });
      history.push("/linkdin");
    } catch (error) {
      console.log(error);
      toastr.warning("Please check your informations!", {
        positionClass: "toast-bottom-left",
      });
    }
  };

   const handleSuccess = (data) => {
 setState({
      code: data.code,
      errorMessage: '',
    });
  }
  const handleFailure=(error)=>{
    console.log(error)
  }


  return (
    <form onSubmit={submitSignIn}>
      <div className="centralize">
        <h1>Sign in</h1>
        <h5 className="sub__title_link">
          Stay updated on your professional world
        </h5>
        <div className="input-block">
          <input
            onChange={handleChange}
            className="input__link"
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
            className="input__link"
            type="password"
            id="password"
            spellCheck="false"
            required
          />
          <span className="placeholder">Password</span>
        </div>
      </div>
      <div className="centralize mt-4">
        <div className="input-block">
          <button className="btn shadow-none forgot__password">
            Forgot password?
          </button>
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-primary form-control mt-4 shadow-none submit__login__link"
      >
        SIGN IN
      </button>
     
    <LinkedinPage />
  
    </form>
  );
};

export default LoginFormLinkedin;
