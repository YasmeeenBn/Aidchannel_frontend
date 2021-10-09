import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AiFillFileAdd } from "react-icons/ai";
import { getCountryByCode } from "../../apis/countryApi";
import "../../components/aidchannel/webmaster/OrganizationForm.css";
import {
  AddExpert,
  AddUserApi,
  getAllHeadExpertsWithIdAndName,
  getExpert,
  updateExpert,
} from "../../apis/userApi";
import urlImageAdapter from "helpers/urlImageAdapter";

const AddUser = () => {
  const history = useHistory();
  const { codeCountry, idUser } = useParams();

  const [content, setContent] = useState("");
  const [userImagePreview, setUserImagePreview] = useState(null);
  const [userImage, setUserImage] = useState();

  const {
    register,
    handleSubmit,
    setValue,
    //formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    let formData = new FormData();
    formData.append("adress", data.adress);
   
    formData.append("role", 2);
    formData.append("email", data.email);
    formData.append("fullname", data.fullname);
    formData.append("phone", data.phone);
    if (userImage !== undefined) formData.append("image_url", userImage);

    await AddUserApi(formData);

    history.push(`/web-master/users/listUsers/${codeCountry}`);
  };

  const imagePreview = (e) => {
    setUserImagePreview(URL.createObjectURL(e.target.files[0]));
    setUserImage(e.target.files[0]);
  };

  return (
    <div className="container">
      <form>
        <div className="row pb-5">
          <div className="col-12 col-lg-6 centralize mt-4"></div>
          <div className="col-12 col-lg-6 centralize mt-4"></div>

          <div className="form-group m-auto">
            <label className="logo-file d-inline" htmlFor="expertImage">
              {userImagePreview && (
                <img
                  src={userImagePreview}
                  alt="avatar"
                  style={{ cursor: "pointer" }}
                  width="15%"
                  height="15%"
                  className="avatar"
                />
              )}
              {!userImagePreview && (
                <span style={{ cursor: "pointer" }}>
                  <AiFillFileAdd color="blue" size={40} />
                </span>
              )}
            </label>
            <input
              type="file"
              className="form-control-file ml-4 shadow-none logo-file d-none"
              id="expertImage"
              name="expertImage"
              onChange={imagePreview}
              multiple={false}
            />
          </div>
          <div className="col-12 col-lg-6 centralize mt-4"></div>

          <div className="col-12 col-lg-6 centralize mt-4">
            <div className="input-block">
              <input
                className="input-org-form"
                type="text"
                id="fullname"
                spellCheck="false"
                {...register("fullname")}
              />
              <span className="placeholder">Full Name</span>
            </div>
          </div>
          <div className="col-12 col-lg-6 centralize mt-4">
            <div className="input-block">
              <input
                className="input-org-form"
                type="text"
                id="email"
                spellCheck="false"
                {...register("email", {
                  required: "Email Required",
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
              />
              <span className="placeholder">Email</span>
            </div>
          </div>

          <div className="col-12 col-lg-6 centralize mt-4">
            <div className="input-block">
              <input
                className="input-org-form"
                type="text"
                id="adress"
                spellCheck="false"
                {...register("adress")}
              />
              <span className="placeholder">Address</span>
            </div>
          </div>
          <div className="col-12 col-lg-6 centralize mt-4">
            <div className="input-block">
              {" "}
              <input
                className="input-org-form"
                type="text"
                id="phone"
                spellCheck="false"
                {...register("phone")}
              />
              <span className="placeholder">Phone</span>
            </div>
          </div>
          <button
            onClick={handleSubmit(onSubmit)}
            type="submit"
            className={"btn btn-primary w-100 h-25 py-3 my-5"}
          >
            Add User
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
