import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Select from "react-select";
import {
  getCountryByCode,
  getEnabledCountries,
} from "../../../apis/countryApi";
import "../../../components/aidchannel/webmaster/OrganizationForm";
import { AddExpert } from "apis/userApi";
import AddWebmaster from "pages/superadmin/AddWebmaster";

const DetailsProject = () => {
  const history = useHistory();
  const { codeCountry, idInterview } = useParams();
  const [content, setContent] = useState("");
  const [country, setCountry] = useState(null);

  const [selectedOption, setSelectedOption] = useState(null);
  const [optionscountry, setOptionscountry] = useState();

  const { register, handleSubmit, setValue } = useForm();

  const getDataFromApi = useCallback(async () => {});

  useEffect(() => {
    getDataFromApi();
  }, [getDataFromApi]);

  return (
    <div className="container">
      <form>
        <div className="row pb-5">
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
                // disabled={disabled}
              />

              <span className="placeholder">Full Name</span>
            </div>
          </div>

          <button
            // onClick={handleSubmit(onSubmit)}
            type="submit"
            className="btn btn-primary w-100 h-25 submit-login my-5 "
          >
            Update Country
          </button>
        </div>
      </form>
    </div>
  );
};

export default DetailsProject;
