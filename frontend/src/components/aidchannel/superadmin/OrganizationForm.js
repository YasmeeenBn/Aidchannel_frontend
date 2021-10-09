import React, { useState, useRef, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import JoditEditor from "jodit-react";
import Select from "react-select";
import { getCountryByCode } from "../../../apis/countryApi";
import {
  AddOrganization,
  getAllOrganizationsByPagination,
  getOrganization,
  updateOrganization,
  getOrganizationByType,
  disabledImplementerOfMonth,
  disabledDonorOfMonth,
  enableImplementerOfMonth,
  enableDonorOfMonth,
} from "../../../apis/organizationApi";
import { index } from "../../../apis/countryApi";
import "../webmaster/OrganizationForm.css";
import fakeLogo from "../../../assets/images/fakeLogo.png";
import urlImageAdapter from "helpers/urlImageAdapter";
import { Checkbox } from "@material-ui/core";

const AddOrganizationForm = () => {
  const history = useHistory();
  // const { codeCountry, idSubOrganization } = useParams();
  const { idOrganization } = useParams();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [options, setOptions] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
  const [organization, setOrganization] = useState();
  const [isResResData, setIsResData] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [logo, setLogo] = useState();
  const [checkedD, setCheckedD] = useState();
  const [checkedI, setCheckedI] = useState();

  const config = {
    readonly: false,
    placeholder: "Write Organization description",
  };

  const {
    register,
    handleSubmit,
    setValue,
    //formState: { errors },
  } = useForm();

  const getDataFromApi = useCallback(async () => {
    const organizations = await getOrganization();
    setOrganization(organizations);
    setOptions(
      organizations?.map((org) => {
        return {
          value: org._id,
          label: org.name,
        };
      })
    );
    if (idOrganization !== undefined) {
      const Org = await getOrganization(idOrganization);
      setOrganization(Org);
      setLogoPreview(organization?.logo);

      setSelectedOption({
        value: Org?.head_office_id?._id,
        label: Org?.head_office_id?.name,
      });

      setContent(Org?.description);
      setValue("name", Org?.name);
      setValue("organization_size", Org?.organization_size);
      setValue("youtube_url", Org?.youtube_url);

      if (Org.twitter_username) {
        setValue(
          "twitter_username",
          `https://twitter.com/${Org?.twitter_username}`
        );
      }
    } else {
      setLogoPreview(fakeLogo);
    }
    setIsResData(true);
  }, [idOrganization, setValue, isResResData]);

  useEffect(() => {
    getDataFromApi();
  }, [getDataFromApi]);

  const onSubmit = async (data) => {
    // const country = await getCountryByCode(codeCountry);
    const orgTypes = await getOrganizationByType(selectedOption?.value);
    const countries_with_offices = await index(selectedOption?.value);

    let formData = new FormData();

    formData.append(
      "organization_types",
      JSON.stringify(orgTypes?.organization_types)
    );
    formData.append(
      "countries_with_offices",
      JSON.stringify(countries_with_offices?.countries_with_offices)
    );

    if (data.twitter_username === "") formData.append("twitter_username", null);
    else
      formData.append(
        "twitter_username",
        data?.twitter_username?.substring(20)
      );

    if (data.youtube_url === "") formData.append("youtube_url", null);
    else formData.append("youtube_url", data.youtube_url);
    if (data.organization_size === "")
      formData.append("organization_size", null);
    else formData.append("organization_size", data.organization_size);
    if (content === "") formData.append("description", null);
    else formData.append("description", content);
    if (logo != undefined) formData.append("logoOrg", logo);

    formData.append("name", data.name);

    console.log(formData);
    if (idOrganization !== undefined) {
      await updateOrganization(idOrganization, formData);
    } else {
      await AddOrganization(formData);
    }

    // history.push(`/web-master/organizations/${codeCountry}`);
  };

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleChangeCheckboxImplementer = async () => {
    setCheckedI(!checkedI);
    if (checkedI === true) {
      await disabledImplementerOfMonth(idOrganization);
    } else {
      await enableImplementerOfMonth(idOrganization);
    }
  };
  const handleChangeCheckboxDonor = async () => {
    setCheckedD(!checkedD);
    if (checkedD === true) {
      await disabledDonorOfMonth(idOrganization);
    } else {
      await enableDonorOfMonth(idOrganization);
    }
  };

  const imagePreview = (e) => {
    setLogoPreview(URL.createObjectURL(e.target.files[0]));
    setLogo(e.target.files[0]);
  };

  return (
    <div className="container">
      {
        /*isResResData === true && logoPreview && */ <form>
          <div className="row pb-5">
            <div className="form-group m-auto col-12">
              <label className="ml-4 logo-file d-inline" htmlFor="logoOrg">
                {logoPreview && (
                  <img
                    src={urlImageAdapter(logoPreview)}
                    alt="avatar"
                    width="6%"
                    className="avatar"
                  />
                )}
              </label>
              <input
                type="file"
                className="form-control-file ml-4 shadow-none logo-file d-none"
                id="logoOrg"
                name="logoOrg"
                onChange={imagePreview}
                multiple={false}
              />
            </div>
            <div className="centralize mt-4 col-12 col-lg-6">
              <div className="input-block">
                <input
                  className="input-org-form"
                  type="text"
                  id="name"
                  spellCheck="false"
                  {...register("name", {
                    required: "Name required",
                  })}
                />
                <span className="placeholder">Name </span>
              </div>
            </div>
            <div className="col-12 col-lg-6 centralize mt-4">
              <div className="input-block">
                <input
                  className="input-org-form"
                  type="text"
                  id="organization_size"
                  spellCheck="false"
                  {...register("organization_size")}
                />
                <span className="placeholder">Organization Size</span>
              </div>
            </div>
            <div className="col-12 col-lg-6 centralize mt-4">
              <div className="input-block">
                <input
                  className="input-org-form"
                  type="text"
                  id="youtube_url"
                  spellCheck="false"
                  {...register("youtube_url")}
                />
                <span className="placeholder">Youtube Channel URL</span>
              </div>
            </div>
            <div className="col-12 col-lg-6 centralize mt-4">
              <div className="input-block">
                <input
                  className="input-org-form"
                  type="text"
                  id="twitter_username"
                  spellCheck="false"
                  {...register("twitter_username")}
                />
                <span className="placeholder">Twitter URL</span>
              </div>
            </div>
            <div className="col-12 col-lg-6 centralize mt-4">
              <Select
                placeholder="Select Organization type"
                value={selectedOption}
                onChange={handleChange}
                options={options}
              />
            </div>{" "}
            <div className="col-12 col-lg-6 centralize mt-4">
              <Select
                placeholder="Select the Country office"
                value={selectedOption}
                onChange={handleChange}
                options={options}
              />
            </div>
            <div>
              {/* <h5> imp</h5> */}
              <div className="form-check mt-4">
                <Checkbox
                  classname="col-12 col-lg-6  mr-5"
                  checked={checkedD}
                  onChange={handleChangeCheckboxDonor}
                  inputProps={{ "aria-label": "primary checkbox" }}
                  style={{ color: "blue" }}
                />
                <label className="form-check-label  mr-5" for="defaultCheck1">
                  Donor
                </label>

                <Checkbox
                  classname=""
                  checked={checkedI}
                  onChange={handleChangeCheckboxImplementer}
                  inputProps={{ "aria-label": "primary checkbox" }}
                  style={{ color: "blue" }}
                />
                <label className="form-check-label" for="defaultCheck1">
                  Implementer
                </label>
              </div>
            </div>
            <div className="col-12 mt-4">
              <JoditEditor
                ref={editor}
                value={content}
                config={config}
                tabIndex={1}
                onBlur={(newContent) => setContent(newContent)}
              />
            </div>
            <button
              onClick={handleSubmit(onSubmit)}
              type="submit"
              className="btn btn-primary w-100 h-25 submit-login my-5 "
            >
              {idOrganization !== undefined
                ? "Save Modifications"
                : "Add Organization"}
            </button>
          </div>
        </form>
      }
    </div>
  );
};

export default AddOrganizationForm;
