import {
  disabledPojectOfMonth,
  enablePojectOfMonth,
  getProject2,
  updateProject,
} from "apis/projectApi";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Flag from "react-world-flags";
import JoditEditor from "jodit-react";
import { getOneInterviewTypesByName } from "apis/interviewTypeApi";
import {
  addInterview,
  getInterviewByProjectAndType,
  updateInterview,
} from "apis/interviewApi";
import { getCountryByCode } from "apis/countryApi";
import ProjectOfTheMontInterview from "components/aidchannel/webmaster/ProjectOfTheMontInterview";
import fakeLogo from "../../assets/images/fakeLogo.png";
import { Checkbox } from "@material-ui/core";
import { AiFillFileAdd } from "react-icons/ai";
import urlImageAdapter from "helpers/urlImageAdapter";

const ProjectOfMonth = () => {
  const { codeCountry, idProject } = useParams();
  const [checked, setChecked] = useState();

  const editor = useRef(null);
  const [copContent, setCopContent] = useState("");
  const [donorContent, setDonorContent] = useState("");
  const [beneficiaryContent, setBeneficiaryContent] = useState("");
  const [projectContent, setProjectContent] = useState("");
  const [copType, setCopType] = useState(null);
  const [donorType, setDonorType] = useState();
  const [beneficiaryType, setBeneficiaryType] = useState();
  const [projectInterviewCop, setProjectInterviewCop] = useState();
  const [projectInterviewDonor, setProjectInterviewDonor] = useState();
  const [
    projectInterviewBeneficiary,
    setProjectInterviewBeneficiary,
  ] = useState();
  const [test, setTest] = useState(false);
  const [copLoading, setCopLoading] = useState(false);
  const [donorLoading, setdonorLoading] = useState(false);
  const [beneficiaryLoading, setBeneficiaryLoading] = useState(false);
  const [copAddLoading, setCopAddLoading] = useState(false);
  const [donorAddLoading, setdonorAddLoading] = useState(false);
  const [beneficiaryAddLoading, setBeneficiaryAddLoading] = useState(false);
  const [projectEditLoading, setProjectEditLoading] = useState(false);

  // logos state
  const [copLogoPreview, setCopLogoPreview] = useState(null);
  const [copLogo, setCopLogo] = useState();
  const [donorLogoPreview, setDonorLogoPreview] = useState(null);
  const [donorLogo, setDonorLogo] = useState();
  const [beneficiaryLogoPreview, setBeneficiaryLogoPreview] = useState(null);
  const [beneficiaryLogo, setBeneficiaryLogo] = useState();
  const [country, setCountry] = useState();
  const [projectLogoPreview, setProjectLogoPreview] = useState(null);
  const [projectLogo, setProjectLogo] = useState();

  const copConfig = {
    readonly: false,
    placeholder: "COP Interview",
  };
  const donorConfig = {
    readonly: false,
    placeholder: "DONOR Interview",
  };
  const beneficiaryConfig = {
    readonly: false,
    placeholder: "Beneficiary Interview",
  };
  const projectConfig = {
    readonly: false,
    placeholder: "Project of the month description",
  };

  const getDataFromApi = useCallback(async () => {
    const country = await getCountryByCode(codeCountry);
    setCountry(country);
    const project = await getProject2(idProject);
    setProjectLogoPreview(urlImageAdapter(project?.image_url));
    setChecked(project?.project_of_month);
    setProjectContent(project?.description);
    const cop = await getOneInterviewTypesByName("COP");
    setCopType(cop);

    const donor = await getOneInterviewTypesByName("DONOR");
    setDonorType(donor);
    const beneficiary = await getOneInterviewTypesByName("BENEFICIARY");
    setBeneficiaryType(beneficiary);
    const copInterview = await getInterviewByProjectAndType(
      project?._id,
      cop._id
    );
    setProjectInterviewCop(copInterview);
    if (copInterview)
      setCopLogoPreview(
        `${process.env.REACT_APP_BACKEND}${copInterview?.interviewImage}`
      );

    const donorInterview = await getInterviewByProjectAndType(
      project?._id,
      donor._id
    );
    setProjectInterviewDonor(donorInterview);
    if (donorInterview)
      setDonorLogoPreview(
        `${process.env.REACT_APP_BACKEND}${donorInterview?.interviewImage}`
      );

    const beneficiaryInterview = await getInterviewByProjectAndType(
      project?._id,
      beneficiary._id
    );
    setProjectInterviewBeneficiary(beneficiaryInterview);
    if (beneficiaryInterview)
      setBeneficiaryLogoPreview(
        `${process.env.REACT_APP_BACKEND}${beneficiaryInterview?.interviewImage}`
      );

    if (copInterview !== null) setCopContent(copInterview?.interview);
    if (donorInterview !== null) setDonorContent(donorInterview?.interview);
    if (beneficiaryInterview !== null)
      setBeneficiaryContent(beneficiaryInterview?.interview);
    //alert(JSON.stringify(copInterview));
  }, [idProject]);

  useEffect(() => {
    getDataFromApi();
  }, [getDataFromApi, test]);

  const handleChangeCheckbox = async () => {
    setChecked(!checked);
    if (checked === true) {
      await disabledPojectOfMonth(idProject);
    } else {
      await enablePojectOfMonth(idProject, codeCountry);
    }
  };

  const addCop = async () => {
    // initialiser les donnees

    let formData = new FormData();
    formData.append("interview", copContent);
    formData.append("type_interview", copType?._id);
    formData.append("project", idProject);
    formData.append("interviewImage", copLogo);
    formData.append("country", country._id);
    setCopAddLoading(true);
    await addInterview(formData);
    setTest(!test);
    setCopAddLoading(false);
  };

  const addDonor = async () => {
    // initialiser les donnees
    const country = await getCountryByCode(codeCountry);
    let formData = new FormData();
    formData.append("interview", donorContent);
    formData.append("type_interview", donorType?._id);
    formData.append("project", idProject);
    formData.append("interviewImage", donorLogo);
    formData.append("country", country._id);
    setdonorAddLoading(true);
    await addInterview(formData);
    setTest(!test);
    setdonorAddLoading(false);
  };

  const addBeneficiary = async () => {
    // initialiser les donnees
    const country = await getCountryByCode(codeCountry);
    let formData = new FormData();
    formData.append("interview", beneficiaryContent);
    formData.append("type_interview", beneficiaryType?._id);
    formData.append("project", idProject);
    formData.append("interviewImage", beneficiaryLogo);
    formData.append("country", country._id);
    setBeneficiaryAddLoading(true);
    await addInterview(formData);
    setTest(!test);
    setBeneficiaryAddLoading(false);
  };

  const EditCop = async () => {
    let formData = new FormData();
    formData.append("interview", copContent);
    if (copLogo != undefined) formData.append("interviewImage", copLogo);
    setCopLoading(true);
    await updateInterview(projectInterviewCop._id, formData);
    setTest(!test);
    setCopLoading(false);
  };

  const editDonor = async () => {
    let formData = new FormData();
    formData.append("interview", donorContent);
    if (donorLogo != undefined) formData.append("interviewImage", donorLogo);
    setdonorLoading(true);
    await updateInterview(projectInterviewDonor._id, formData);
    setTest(!test);
    setdonorLoading(false);
  };

  const editBeneficiary = async () => {
    let formData = new FormData();
    formData.append("interview", beneficiaryContent);
    if (beneficiaryLogo != undefined)
      formData.append("interviewImage", beneficiaryLogo);
    setBeneficiaryLoading(true);
    await updateInterview(projectInterviewBeneficiary._id, formData);
    setTest(!test);
    setBeneficiaryLoading(false);
  };

  const editProject = async () => {
    let formData = new FormData();
    formData.append("description", projectContent);
    if (projectLogo != undefined) formData.append("projectImage", projectLogo);
    setProjectEditLoading(true);
    await updateProject(idProject, formData);
    setProjectEditLoading(false);
  };
  const imagePreview = (e) => {
    setProjectLogoPreview(URL.createObjectURL(e.target.files[0]));
    setProjectLogo(e.target.files[0]);
  };
  return (
    <div className="container my-4">
      {codeCountry &&
        projectInterviewCop !== undefined &&
        projectInterviewDonor !== undefined &&
        projectInterviewBeneficiary !== undefined && (
          <>
            <h1>
              <Flag
                code={codeCountry}
                height="70"
                width="70"
                style={{ marginRight: "2px" }}
                className="flag"
              />{" "}
              Project Of The Month
            </h1>
            <hr />
            <div className="form-check">
              <Checkbox
                checked={checked}
                onChange={handleChangeCheckbox}
                inputProps={{ "aria-label": "primary checkbox" }}
                style={{ color: "blue" }}
              />

              <label className="form-check-label" for="defaultCheck1">
                Project of the month
              </label>
            </div>
            <div
              className="my-5 p-3"
              style={{
                border: "1px solid #e6e6fa",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              }}
            >
              <div className="form-group m-auto">
                <label
                  className="ml-4 logo-file d-inline"
                  htmlFor="projectLogo"
                >
                  {projectLogoPreview && (
                    <img
                      src={projectLogoPreview}
                      alt="avatar"
                      style={{ cursor: "pointer" }}
                      width="15%"
                      height="15%"
                      className="avatar"
                    />
                  )}
                  {!projectLogoPreview && (
                    <span style={{ cursor: "pointer" }}>
                      Project of Month Image{" "}
                      <AiFillFileAdd color="blue" size={40} />
                    </span>
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
              <div className="mt-4">
                <JoditEditor
                  ref={editor}
                  value={projectContent}
                  config={projectConfig}
                  tabIndex={1}
                  onBlur={(newContent) => setProjectContent(newContent)}
                />
                {!projectEditLoading ? (
                  <button
                    onClick={() => editProject()}
                    className="btn btn-warning  mt-3  shadow-none"
                  >
                    Edit
                  </button>
                ) : (
                  <div className="spinner-border text-danger m-3" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
              </div>
            </div>
            <div
              className="my-5 p-3"
              style={{
                border: "1px solid #e6e6fa",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              }}
            >
              <ProjectOfTheMontInterview
                imageLabel="COP Interview Image"
                editorValue={copContent}
                editorRef={editor}
                editorConfig={copConfig}
                setContent={setCopContent}
                projectInterview={projectInterviewCop}
                addLoading={copAddLoading}
                loading={copLoading}
                addLabel="Add cop interview"
                editLabel="Edit cop interview"
                editFunction={EditCop}
                addFunction={addCop}
                logoPreview={copLogoPreview}
                logo={copLogo}
                setLogoPreview={setCopLogoPreview}
                setLogo={setCopLogo}
                inputId="copInterview"
              />
            </div>
            <div
              className="my-5 p-3"
              style={{
                border: "1px solid #e6e6fa",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              }}
            >
              <ProjectOfTheMontInterview
                imageLabel="DONOR Interview Image"
                editorValue={donorContent}
                editorRef={editor}
                editorConfig={donorConfig}
                setContent={setDonorContent}
                projectInterview={projectInterviewDonor}
                addLoading={donorAddLoading}
                loading={donorLoading}
                addLabel="Add donor interview"
                editLabel="Edit donor interview"
                editFunction={editDonor}
                addFunction={addDonor}
                logoPreview={donorLogoPreview}
                logo={donorLogo}
                setLogoPreview={setDonorLogoPreview}
                setLogo={setDonorLogo}
                inputId="donorInterview"
              />
            </div>{" "}
            <div
              className="my-5 p-3"
              style={{
                border: "1px solid #e6e6fa",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              }}
            >
              <ProjectOfTheMontInterview
                imageLabel="Beneficiary Interview Image"
                editorValue={beneficiaryContent}
                editorRef={editor}
                editorConfig={beneficiaryConfig}
                setContent={setBeneficiaryContent}
                projectInterview={projectInterviewBeneficiary}
                addLoading={beneficiaryAddLoading}
                loading={beneficiaryLoading}
                addLabel="Add beneficiary interview"
                editLabel="Edit beneficiary interview"
                editFunction={editBeneficiary}
                addFunction={addBeneficiary}
                logoPreview={beneficiaryLogoPreview}
                logo={beneficiaryLogo}
                setLogoPreview={setBeneficiaryLogoPreview}
                setLogo={setBeneficiaryLogo}
                inputId="beneficiaryInterview"
              />
            </div>
          </>
        )}
    </div>
  );
};

export default ProjectOfMonth;
