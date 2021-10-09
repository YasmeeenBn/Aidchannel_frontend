import "./authentication.css";
import toastr from "toastr";
import axios from "axios";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import "toastr/build/toastr.css";
import { useHistory } from "react-router-dom";
import formDataHelper from "helpers/FormDataHelper";
const RegistrationFormLink = (props) => {
  const history = useHistory();
  const [profilPreview, setProfilPreview] = useState(null);
  const [profil, setProfil] = useState();
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    adress: "",
    phone: "",
    job_title: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const submitSignUp = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_BACKEND}user/register`,
        formDataHelper(profil, "image_url", user)
      )
      .then((res) => {
        toastr.success("You have been signed up successfuly", "New Account", {
          positionClass: "toast-bottom-left",
        });
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        history.push("/linkdin");
      })

      .catch(({ response }) => {
        toastr.warning(response, "Please check your informations!", {
          positionClass: "toast-bottom-left",
        });
      });
  };

  const imagePreview = (e) => {
    setProfilPreview(URL.createObjectURL(e.target.files[0]));
    setProfil(e.target.files[0]);
  };

  return (
    <form onSubmit={submitSignUp}>
      <div className="text-center">
        <h1 className="login-title">Sign up</h1>
      </div>
      <div className="form-group m-auto">
        <label className="ml-4 logo-file d-inline" htmlFor="projectLogo">
          {profilPreview && (
            <div className="text-center">
              <img
                src={profilPreview}
                alt="avatar"
                style={{ cursor: "pointer" }}
                width="15%"
                height="15%"
                className="avatar"
              />
            </div>
          )}
          {!profilPreview && (
            <div className="text-center">
              <span className="mx-auto" style={{ cursor: "pointer" }}>
                <img
                  src="/assets/profilAvatar.jpg"
                  className=" profil__avatar"
                />
                <p style={{ color: "#0e76a8" }}> Profil image</p>
              </span>
            </div>
          )}
        </label>
        <input
          type="file"
          className="form-control-file ml-4 shadow-none logo-file d-none"
          id="projectLogo"
          name="projectLogo"
          onChange={imagePreview}
          multiple={false}
        />
      </div>
      <div className="centralize mt-4">
        <div className="input-block">
          <input
            onChange={handleChange}
            className="input__link"
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
            className="input__link"
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
            className="input__link"
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
            className="input__link"
            type="text"
            id="phone"
            spellCheck="false"
          />
          <span className="placeholder">Phone Number</span>
        </div>
      </div>

      <div className="centralize mt-4">
        <div className="input-block">
          <input
            onChange={handleChange}
            className="input__link"
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
            className="input__link"
            type="password"
            id="password"
            spellCheck="false"
          />
          <span className="placeholder">Password</span>
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary form-control submit__register__link shadow-none mt-4"
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
              to="/linkdin/login"
            >
              {"    "}Sign in
            </Link>
          </span>
        </h1>
      </div>
    </form>
  );
};

export default RegistrationFormLink;
