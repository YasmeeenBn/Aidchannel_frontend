import React, { useState, useRef, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import JoditEditor from "jodit-react";
import Select from "react-select";
import { getCountryByCode } from "../../../apis/countryApi";
import {
  AddOrganization,
  getAllHeadOrganizationsWithIdAndName,
  getOrganization,
  updateOrganization,
} from "../../../apis/organizationApi";
import "./OrganizationForm.css";
import fakeLogo from "../../../assets/images/fakeLogo.png";
import urlImageAdapter from "helpers/urlImageAdapter";

const AddOrganizationForm = () => {
  const history = useHistory();
  const { codeCountry, idSubOrganization } = useParams();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [options, setOptions] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
  const [suborganization, setSubOrganization] = useState();
  const [isResResData, setIsResData] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [logo, setLogo] = useState();

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
    const organizations = await getAllHeadOrganizationsWithIdAndName();
    setOptions(
      organizations?.map((org) => {
        return {
          value: org._id,
          label: org.name,
        };
      })
    );
    if (idSubOrganization !== undefined) {
      const subOrg = await getOrganization(idSubOrganization);
      setSubOrganization(subOrg);
      setLogoPreview(suborganization?.logo);

      setSelectedOption({
        value: subOrg?.head_office_id?._id,
        label: subOrg?.head_office_id?.name,
      });

      setContent(subOrg?.description);
      setValue("name", subOrg?.name);
      setValue("organization_size", subOrg?.organization_size);
      setValue("youtube_url", subOrg?.youtube_url);

      if (subOrg.twitter_username) {
        setValue(
          "twitter_username",
          `https://twitter.com/${subOrg?.twitter_username}`
        );
      }
    } else {
      setLogoPreview(fakeLogo);
    }
    setIsResData(true);
  }, [idSubOrganization, setValue, isResResData]);

  useEffect(() => {
    getDataFromApi();
  }, [getDataFromApi]);

  const onSubmit = async (data) => {
    const country = await getCountryByCode(codeCountry);
    const headOffice = await getOrganization(selectedOption?.value);

    let formData = new FormData();

    formData.append("head_office_id", headOffice?._id);

    formData.append(
      "organization_types",
      JSON.stringify(headOffice?.organization_types)
    );
    //  f

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
    formData.append("country", country._id);
    console.log(formData);
    if (idSubOrganization !== undefined) {
      await updateOrganization(idSubOrganization, formData);
    } else {
      await AddOrganization(formData);
    }

    history.push(`/web-master/organizations/${codeCountry}`);
  };

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
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
                <span className="placeholder">Name</span>
              </div>
            </div>
            <div className="form-group m-auto">
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
              <Select
                placeholder="Select head office"
                value={selectedOption}
                onChange={handleChange}
                options={options}
              />
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
              {idSubOrganization !== undefined
                ? "Save Modifications"
                : "Add Local organizations office"}
            </button>
          </div>
        </form>
      }
    </div>
  );
};

export default AddOrganizationForm;
