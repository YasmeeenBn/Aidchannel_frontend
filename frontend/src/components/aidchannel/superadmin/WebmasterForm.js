import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AiFillFileAdd } from "react-icons/ai";
import Select from "react-select";
import {
  getOneWebmaster,
  AddWebmaster,
  updateWebmaster,
} from "../../../apis/userApi";
import {
  getCountryByCode,
  getEnabledCountries,
} from "../../../apis/countryApi";
import "../../../components/aidchannel/webmaster/OrganizationForm";
// import AddWebmaster from "pages/superadmin/AddWebmaster";
import urlImageAdapter from "helpers/urlImageAdapter";

const AddWebmasterForm = () => {
  const history = useHistory();
  const { codeCountry, idWebmaster } = useParams();
  const [webmasterImagePreview, setwebmasterImagePreview] = useState(null);
  const [webmasterImage, setwebmasterImage] = useState();
  const [country, setCountry] = useState(null);
  const { register, handleSubmit, setValue } = useForm();

  const [selectedOption, setSelectedOption] = useState(null);
  const [optionscountry, setOptionscountry] = useState();

  const getDataFromApi = useCallback(async () => {
    if (idWebmaster !== undefined) {
      const webmaster = await getOneWebmaster(idWebmaster);
      setValue("fullname", webmaster?.fullname);
      setValue("email", webmaster?.email);
      setValue("phone", webmaster?.phone);
      setwebmasterImagePreview(urlImageAdapter(webmaster?.image_url));
    }

    const country = await getEnabledCountries(codeCountry);
    setOptionscountry(
      country?.map((country) => {
        return {
          value: country._id,
          label: country.name,
        };
      })
    );
  }, [idWebmaster, setValue]);

  useEffect(() => {
    getDataFromApi();
  }, [getDataFromApi]);

  const onSubmit = async (data) => {
    let formData = new FormData();
    data.country = selectedOption?.value;
    formData.append("role", 1);
    formData.append("email", data.email);
    formData.append("fullname", data.fullname);
    formData.append("phone", data.phone);
    //formData.append("country", country._id);
    if (webmasterImage !== undefined)
      formData.append("image_url", webmasterImage);

    if (idWebmaster !== undefined) {
      await updateWebmaster(idWebmaster, formData);
    } else {
      await AddWebmaster(formData);
    }

    history.push(`/super-admin/webMaster`);
  };

  const imagePreview = (e) => {
    setwebmasterImagePreview(URL.createObjectURL(e.target.files[0]));
    setwebmasterImage(e.target.files[0]);
  };

  const handleChangecountry = (selected) => {
    setSelectedOption(selected);
  };

  return (
    <div className="container">
      <form>
        <div className="row pb-5">
          <div className="form-group m-auto">
            <label className="logo-file d-inline" htmlFor="webMasterImage">
              {webmasterImagePreview && (
                <img
                  src={webmasterImagePreview}
                  alt="avatar"
                  style={{ cursor: "pointer" }}
                  width="15%"
                  height="15%"
                  className="avatar"
                />
              )}
              {!webmasterImagePreview && (
                <span style={{ cursor: "pointer" }}>
                  <AiFillFileAdd color="blue" size={40} />
                </span>
              )}
            </label>
            <input
              type="file"
              className="form-control-file ml-4 shadow-none logo-file d-none"
              id="webMasterImage"
              name="webMasterImage"
              onChange={imagePreview}
              multiple={false}
            />
          </div>
          <div className="centralize mt-4 col-12 ">
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

          <div className="col-12  centralize mt-4">
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

          <div className="col-12  centralize mt-4">
            <div className="input-block">
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
          <div className="col-12  centralize mt-4">
            <Select
              placeholder="Select the Country"
              value={selectedOption}
              onChange={handleChangecountry}
              options={optionscountry}
            />
          </div>
          <button
            onClick={handleSubmit(onSubmit)}
            type="submit"
            className={
              idWebmaster !== undefined
                ? "btn btn-warning w-100 h-25  py-3 my-5"
                : "btn btn-primary w-100 h-25 py-3 my-5"
            }
          >
            {idWebmaster !== undefined ? "Edit WebMaster" : "Add WebMaster"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddWebmasterForm;
