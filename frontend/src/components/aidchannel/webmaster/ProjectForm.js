import React, { useState, useRef, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import JoditEditor from "jodit-react";
import moment from "moment";
import { AiFillFileAdd } from "react-icons/ai";
import Select from "react-select";
import { getCountryByCode } from "../../../apis/countryApi";
import {
  AddProject,
  getProject2,
  updateProject,
} from "../../../apis/projectApi";
import "./OrganizationForm.css";
import { getThematiques } from "apis/thematiqueApi";
import { getStatus } from "apis/statusApi";
import urlImageAdapter from "helpers/urlImageAdapter";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Row, FormGroup, FormLabel, Col } from "react-bootstrap";
import "./ProjectForm.css";
import { getOrganizationByType } from "apis/organizationApi";
import { getAllCops, getAllUsers } from "apis/userApi";


const AddProjectForm = () => {
  const history = useHistory();
  const { codeCountry, idProject } = useParams();
  const editor = useRef(null);
  const ObjEditor = useRef(null);
  const [content, setContent] = useState("");
  const [objectives, setObjectives] = useState("");
  const [thematiquesOptions, setThematiquesOptions] = useState();
  const [fundersOptions, setFundersOptions] = useState();
  const [selectedFunder, setSelectedFunder] = useState(null);
  const [subFundersOptions, setSubFundersOptions] = useState();
  const [selectedSubFunder, setSelectedSubFunder] = useState(null);
  const [implementersOptions, setImplementersOptions] = useState();
  const [selectedImplementer, setSelectedImplementer] = useState(null);
  const [subImplementersOptions, setSubImplementersOptions] = useState();
  const [selectedSubImplementer, setSelectedSubImplementer] = useState(null);

  const [statusOptions, setStatusOptions] = useState();
  const [copOptions, setCopOptions] = useState();
  const [selectedCop, setSelectedCop] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [status, setStatus] = useState(null);
  const [project, setProject] = useState();
  const [country, setCountry] = useState();
  const [projectLogoPreview, setProjectLogoPreview] = useState(null);
  const [projectLogo, setProjectLogo] = useState();
  const [approvalDate, setApprovalDate] = useState();
  const [actualStart, setActualStart] = useState();
  const [plannedEnd, setPlannedEnd] = useState();
  const [actualEnd, setActualEnd] = useState();
  const [loading, setLoading] = useState(false);

  const config = {
    readonly: false,
    placeholder: "Description of the project",
  };
  const configObj = {
    readonly: false,
    placeholder: "Ojectives of the project",
  };

  const { register, handleSubmit, setValue } = useForm();

  const getDataFromApi = useCallback(async () => {
    const thematiques = await getThematiques();
    setThematiquesOptions(
      thematiques?.map((thematique) => {
        return {
          value: thematique._id,
          label: thematique.name,
        };
      })
    );
    const funders = await getOrganizationByType("Funding Agencies");
    const subfund = funders?.map((funder) => {
      return {
        value: funder._id,
        label: funder.name,
      };
    });
    setFundersOptions(subfund);
    setSubFundersOptions(subfund);

    const implementers = await getOrganizationByType("Implementing NGO");
    const subImpl = implementers?.map((implementer) => {
      return {
        value: implementer._id,
        label: implementer.name,
      };
    });
    setImplementersOptions(subImpl);
    setSubImplementersOptions(subImpl);

    const status = await getStatus();
    setStatus(status);
    setStatusOptions(
      status?.map((sta) => {
        return {
          value: sta?._id,
          label: sta?.name,
        };
      })
    );
    const country = await getCountryByCode(codeCountry);
    setCountry(country);

    const cops = await getAllUsers();
    setCopOptions(
      cops?.map((cop) => {
        return {
          value: cop?._id,
          label: cop?.fullname,
        };
      })
    );

    if (idProject !== undefined) {
      const project = await getProject2(idProject);
      setProject(project);
      setProjectLogoPreview(urlImageAdapter(project?.image_url));
      if (project.thematique)
        setSelectedOption({
          value: project?.thematique?._id,
          label: project?.thematique?.name,
        });
      if (project.status)
        setSelectedStatus({
          value: project?.status?._id,
          label: project?.status?.name,
        });
      if (project.funder)
        setSelectedFunder({
          value: project?.funder?._id,
          label: project?.funder?.name,
        });
      if (project.sub_funder)
        setSelectedSubFunder({
          value: project?.sub_funder[0]?._id,
          label: project?.sub_funder[0]?.name,
        });
      if (project.implementer)
        setSelectedImplementer({
          value: project?.implementer?._id,
          label: project?.implementer?.name,
        });
      if (project.sub_implementer)
        setSelectedSubImplementer({
          value: project?.sub_implementer[0]?._id,
          label: project?.sub_implementer[0]?.name,
        });
      if (project.task_manager)
        setSelectedCop({
          value: project?.task_manager?._id,
          label: project?.task_manager?.fullname,
        });
      if (project.description) setContent(project?.description);
      if (project.objectives) setObjectives(project?.objectives);
      if (project.approval_date)
        setApprovalDate(moment(project?.approval_date).toDate());
      if (project.actual_start)
        setActualStart(moment(project?.actual_start).toDate());
      if (project.actual_end)
        setActualEnd(moment(project?.actual_end).toDate());
      if (project.planned_end)
        setPlannedEnd(moment(project?.planned_end).toDate());

      //setContent(project?.task_manager);
      if (project.name) setValue("name", project?.name);
      if (project.total_cost) setValue("total_cost", project?.total_cost);
      if (project.budget) setValue("budget", project?.budget);
      if (project.task_manager) setValue("task_manager", project?.task_manager);
      if (project.image_url) setValue("image_url", project?.image_url);
      if (project.row_data_org) setValue("row_data_org", project?.row_data_org);
    }
  }, [idProject, setValue]);

  useEffect(() => {
    getDataFromApi();
  }, [getDataFromApi]);

  const onSubmit = async (data) => {
    //const project = await getProject2(selectedOption?.value);
    let formData = new FormData();
    formData.append("namefr", "");
    formData.append("country", country?._id);

    if (selectedOption) formData.append("thematique", selectedOption?.value);

    if (selectedStatus) formData.append("status", selectedStatus?.value);

    if (selectedFunder) formData.append("funder", selectedFunder?.value);

    if (selectedSubFunder)
      formData.append("sub_funder", [selectedSubFunder?.value]);

    if (selectedImplementer)
      formData.append("implementer", selectedImplementer?.value);

    if (selectedSubImplementer)
      formData.append("sub_implementer", [selectedSubImplementer?.value]);

    if (data.total_cost !== "") formData.append("total_cost", data.total_cost);
    // if (data.budget === "") formData.append("budget", null);
    //else formData.append("budget", data.budget);

    if (approvalDate) formData.append("approval_date", approvalDate);

    if (actualStart) formData.append("actual_start", actualStart);

    if (actualEnd) formData.append("actual_end", actualEnd);

    if (plannedEnd) formData.append("planned_end", plannedEnd);

    if (selectedCop) formData.append("task_manager", selectedCop?.value);

    formData.append("name", data.name);

    formData.append("description", content);
    formData.append("objectives", objectives);
    if (projectLogo != undefined) formData.append("projectImage", projectLogo);

    if (idProject !== undefined) {
      setLoading(true);
      await updateProject(idProject, formData);
      setLoading(false);
    } else {
      formData.append("validation", 1);
      await AddProject(formData);
      history.push(`/web-master/validationProjects/projectsV/${codeCountry}`);
    }
  };

  const handleThematiqueChange = (selected) => {
    setSelectedOption(selected);
  };

  const handleChangeStatus = (selected) => {
    setSelectedStatus(selected);
  };
  const imagePreview = (e) => {
    setProjectLogoPreview(URL.createObjectURL(e.target.files[0]));
    setProjectLogo(e.target.files[0]);
  };
  return (
    <div className="container">
      <form>
        <div className="row">
          {/* {idProject !== undefined ? "Save Modifications" : "Add Project"} */}
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
              <span className="placeholder" style={{ color: "black" }}>
                Name
              </span>
            </div>
          </div>
          <div className="form-group m-auto">
            <label className="ml-4 logo-file d-inline" htmlFor="projectLogo">
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
          <div className="col-12 col-lg-6 centralize mt-4">
            <div className="input-block">
              <input
                className="input-org-form"
                type="text"
                id="total_cost"
                spellCheck="false"
                {...register("total_cost")}
              />
              <span className="placeholder" style={{ color: "black" }}>
                Total Cost
              </span>
            </div>
          </div>
          <div className="col-12 col-lg-6 centralize ">
            <FormLabel className="label__form">COP</FormLabel>
            <Select
              placeholder="Select COP "
              value={selectedCop}
              onChange={(selected) => setSelectedCop(selected)}
              options={copOptions}
            />
          </div>{" "}
          <div className="col-12 col-lg-6 centralize mt-4">
            <FormLabel className="label__form">Thematic</FormLabel>
            <Select
              placeholder="Select the thematic "
              value={selectedOption}
              onChange={handleThematiqueChange}
              options={thematiquesOptions}
            />
          </div>{" "}
          <div className="col-12 col-lg-6  centralize mt-4">
            <FormLabel className="label__form">Status</FormLabel>
            <Select
              placeholder="Select the Status "
              value={selectedStatus}
              onChange={handleChangeStatus}
              options={statusOptions}
            />
          </div>
          <div className="col-12 col-lg-6 centralize mt-4">
            <FormLabel className="label__form">Funder</FormLabel>
            <Select
              placeholder="Select the funder "
              value={selectedFunder}
              onChange={(selected) => setSelectedFunder(selected)}
              options={fundersOptions}
            />
          </div>{" "}
          <div className="col-12 col-lg-6 centralize mt-4">
            <FormLabel className="label__form">Sub-funder</FormLabel>
            <Select
              placeholder="Select the Sub-funder "
              value={selectedSubFunder}
              onChange={(selected) => setSelectedSubFunder(selected)}
              options={subFundersOptions}
            />
          </div>{" "}
          <div className="col-12 col-lg-6 centralize mt-4">
            <FormLabel className="label__form">Implementer</FormLabel>
            <Select
              placeholder="Select the Implementer "
              value={selectedImplementer}
              onChange={(selected) => setSelectedImplementer(selected)}
              options={implementersOptions}
            />
          </div>{" "}
          <div className="col-12 col-lg-6 centralize mt-4">
            <FormLabel className="label__form">Sub-Implementer</FormLabel>
            <Select
              placeholder="Select the Sub-Implementer "
              value={selectedSubImplementer}
              onChange={(selected) => setSelectedSubImplementer(selected)}
              options={subImplementersOptions}
            />
          </div>{" "}
          <div className="col-12 col-lg-6 centralize mt-4">
            <FormLabel className="label__form">Approval Date</FormLabel>

            <DatePicker
              className="input-org-form"
              selected={approvalDate}
              onChange={(date) => setApprovalDate(date)}
            />
          </div>
          <div className="col-12 col-lg-6 centralize mt-4">
            <FormLabel className="label__form">Actual Start</FormLabel>
            <FormGroup>
              <DatePicker
                className="input-org-form"
                selected={actualStart}
                onChange={(date) => setActualStart(date)}
              />
            </FormGroup>
          </div>
          <div className="col-12 col-lg-6 centralize mt-4">
            <FormLabel className="label__form">Actual End</FormLabel>{" "}
            <FormGroup>
              <DatePicker
                className="input-org-form"
                selected={actualEnd}
                onChange={(date) => setActualEnd(date)}
              />{" "}
            </FormGroup>
          </div>
          <div className="col-12 col-lg-6 centralize mt-4">
            <FormLabel className="label__form">Planned End</FormLabel>{" "}
            <FormGroup>
              <DatePicker
                className="input-org-form"
                placeholder="Placeholder"
                selected={plannedEnd}
                onChange={(date) => setPlannedEnd(date)}
              />{" "}
            </FormGroup>
          </div>
          <div className="col-12 mt-4">
            <FormLabel className="label__form">Description</FormLabel>
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              tabIndex={1}
              onBlur={(newContent) => setContent(newContent)}
            />
          </div>{" "}
          <div className="col-12 mt-4">
            <FormLabel className="label__form">Objectives</FormLabel>{" "}
            <JoditEditor
              ref={ObjEditor}
              value={objectives}
              config={configObj}
              tabIndex={1}
              onBlur={(newContent) => setObjectives(newContent)}
            />
          </div>{" "}
          {/* {project && (
            <div className="container my-5 box-shadow-card-info p-4">
              <FormLabel className="label__form">
                Informations Related{" "}
              </FormLabel>{" "}
              <ReactJson src={project?.raw_data_org} />{" "}
            </div>
          )} */}
          {!loading ? (
            <button
              onClick={handleSubmit(onSubmit)}
              type="submit"
              className={
                idProject !== undefined
                  ? `btn btn-warning w-100 h-25 shadow-none my-3`
                  : `btn btn-primary w-100 h-25 shadow-none my-3`
              }
            >
              {idProject !== undefined ? "Save Modifications" : "Add Project"}
            </button>
          ) : (
            <div className="spinner-border text-warning m-auto" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>
      </form>
     
    </div>
  );
};

export default AddProjectForm;
