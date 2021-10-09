import "./authentication.css";
import toastr from "toastr";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import "toastr/build/toastr.css";
import { useHistory } from "react-router-dom";
const RegistrationForm = (props) => {
  const history = useHistory();
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    adress: "",
    telphone: "",
    job_title: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const submitSignUp = (e) => {
    e.preventDefault();
    fetch("http://localhost:3010/auth/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          toastr.warning(res.error, "Please check your informations!", {
            positionClass: "toast-bottom-left",
          });
        } else {
          toastr.success("You have been signed up successfuly", "New Account", {
            positionClass: "toast-bottom-left",
          });
          history.push("/login");
        }
      })

      .catch((err) =>
        toastr.error(err, "Server error !", {
          positionClass: "toast-bottom-left",
        })
      );
  };

  return (
    <form onSubmit={submitSignUp}>
      <div className="text-center">
        <h1 className="login-title">Sign up</h1>
      </div>
      <div className="centralize mt-4">
        <div className="input-block">
          <input
            onChange={handleChange}
            className="input"
            type="text"
            id="fullname"
          />
          <span className="placeholder">Full Name</span>
        </div>
      </div>

      <div className="centralize mt-4">
        <div className="input-block">
          <input
            onChange={handleChange}
            className="input"
            type="text"
            id="email"
            spellCheck="false"
          />
          <span className="placeholder">Email address</span>
        </div>
      </div>

      <div className="centralize mt-4">
        <div className="input-block">
          <input
            onChange={handleChange}
            className="input"
            type="text"
            id="adress"
            spellCheck="false"
          />
          <span className="placeholder">Address</span>
        </div>
      </div>

      <div className="centralize mt-4">
        <div className="input-block">
          <input
            onChange={handleChange}
            className="input"
            type="text"
            id="telphone"
            spellCheck="false"
          />
          <span className="placeholder">Phone Number</span>
        </div>
      </div>

      <div className="centralize mt-4">
        <div className="input-block">
          <input
            onChange={handleChange}
            className="input"
            type="text"
            id="job_title"
            spellCheck="false"
          />
          <span className="placeholder">Job Title</span>
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
          />
          <span className="placeholder">Password</span>
        </div>
      </div>
      
      <button
      
        type="submit"
        className="btn btn-primary form-control submit-login mt-4"
      >
        SIGN UP
      </button>
      <div className="col-12 text-center my-4">
        <h1 className="login-sub-title">
          Already have an account?
          <span className="login-sub-title-purple">
            {"  "}
            <Link
              className="text-decoration-none"
              style={{ color: "#3f51b5" }}
              to="/login"
            >
              {"    "}Sign in
            </Link>
          </span>
        </h1>
      </div>
    </form>
  );
};

export default RegistrationForm;
