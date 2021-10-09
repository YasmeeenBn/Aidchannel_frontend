import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AiFillFileAdd } from "react-icons/ai";
import { getCountryByCode } from "../../../apis/countryApi";
import "./OrganizationForm.css";
import {
  AddExpert,
  getAllHeadExpertsWithIdAndName,
  getExpert,
  updateExpert,
} from "../../../apis/userApi";
import urlImageAdapter from "helpers/urlImageAdapter";

const ExpertForm = () => {
  const history = useHistory();
  const { codeCountry, idExpert } = useParams();
  const [expertImagePreview, setExpertImagePreview] = useState(null);
  const [expertImage, setExpertImage] = useState();
  const { register, handleSubmit, setValue } = useForm();

  const getDataFromApi = useCallback(async () => {
    if (idExpert !== undefined) {
      const expert = await getExpert(idExpert);
      setValue("fullname", expert?.fullname);
      setValue("email", expert?.email);
      setValue("adress", expert?.adress);
      setValue("job_title", expert?.job_title);
      setValue("phone", expert?.phone);
      setExpertImagePreview(urlImageAdapter(expert?.image_url));
    }
  }, [idExpert, setValue]);

  useEffect(() => {
    getDataFromApi();
  }, [getDataFromApi]);

  const onSubmit = async (data) => {
    console.log(data);
    const country = await getCountryByCode(codeCountry);
    //const expert = await getExpert(idExpert);
    let formData = new FormData();
    formData.append("adress", data.adress);
    formData.append("country", country._id);
    formData.append("role", 3);
    formData.append("email", data.email);
    formData.append("fullname", data.fullname);
    formData.append("job_title", data.job_title);
    formData.append("phone", data.phone);
    if (expertImage !== undefined) formData.append("image_url", expertImage);

    if (idExpert !== undefined) {
      await updateExpert(idExpert, formData);
    } else {
      await AddExpert(formData);
    }

    history.push(`/web-master/experts/${codeCountry}`);
  };

  const imagePreview = (e) => {
    setExpertImagePreview(URL.createObjectURL(e.target.files[0]));
    setExpertImage(e.target.files[0]);
  };

  return (
    <div className="container">
      <form>
        <div className="row pb-5">
          <div className="centralize mt-4 col-12 col-lg-6">
            <div className="input-block">
              <input
                className="input-org-form"
                type="text"
                id="fullname"
                spellCheck="false"
                {...register("fullname", {
                  required: "Name required",
                })}
              />
              <span className="placeholder">Full Name</span>
            </div>
          </div>
          <div className="form-group m-auto">
            <label className="ml-4 logo-file d-inline" htmlFor="expertImage">
              {expertImagePreview && (
                <img
                  src={expertImagePreview}
                  alt="avatar"
                  style={{ cursor: "pointer" }}
                  width="15%"
                  height="15%"
                  className="avatar"
                />
              )}
              {!expertImagePreview && (
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
                id="job_title"
                spellCheck="false"
                {...register("job_title")}
              />
              <span className="placeholder">Job of the expert</span>
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
            className={
              idExpert !== undefined
                ? "btn btn-warning w-100 h-25  py-3 my-5"
                : "btn btn-primary w-100 h-25 py-3 my-5"
            }
          >
            {idExpert !== undefined ? "Edit Expert" : "Add Expert"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpertForm;
