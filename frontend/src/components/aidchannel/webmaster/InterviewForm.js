import React, { useState, useRef, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import JoditEditor from "jodit-react";
import Select from "react-select";
import { getCountryByCode } from "../../../apis/countryApi";

import "./InterviewForm.css";
import { getInterviewTtpe } from "../../../apis/interviewTypeApi";
import { getAllProjectsOfMonthByCountry } from "../../../apis/projectApi";
import {
  addInterview,
  getOneInterview,
  updateInterview,
} from "../../../apis/interviewApi";

const InterviewForm = () => {
  const history = useHistory();
  const { codeCountry, idInterview } = useParams();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [optionsInterviewType, setOptionsInterviewType] = useState();
  const [interviewType, setInterviewType] = useState(null);
  const [project, setProject] = useState(null);
  const [optionsProject, setOptionsProject] = useState();

  const config = {
    readonly: false,
    placeholder: "Write Interview",
  };

  const {
    register,
    handleSubmit,
    setValue,
    //formState: { errors },
  } = useForm();

  const getDataFromApi = useCallback(async () => {
    const interviewTypes = await getInterviewTtpe();
    setOptionsInterviewType(
      interviewTypes?.map((interType) => {
        return {
          value: interType._id,
          label: interType.name,
        };
      })
    );
    const projects = await getAllProjectsOfMonthByCountry(codeCountry);
    setOptionsProject(
      projects?.map((proj) => {
        return {
          value: proj._id,
          label: proj.name,
        };
      })
    );
    if (idInterview !== undefined) {
      const interview = await getOneInterview(idInterview);
      setInterviewType({
        value: interview?.type_interview?._id,
        label: interview?.type_interview?.name,
      });
      setContent(interview?.interview);
      setValue("name", interview?.name);
      setProject({
        value: interview?.project?._id,
        label: interview?.project?.name,
      });
      //setValue("organization_size", subOrg?.organization_size);
      //setValue("youtube_url", subOrg?.youtube_url);
    }
  }, [idInterview, setValue, codeCountry]);

  useEffect(() => {
    getDataFromApi();
  }, [getDataFromApi]);

  const onSubmit = async (data) => {
    const country = await getCountryByCode(codeCountry);

    if (content === "") data.interview = null;
    else data.interview = content;
    data.type_interview = interviewType?.value;
    data.project = project?.value;
    data.country = country._id;

    if (idInterview !== undefined) {
      await updateInterview(idInterview, data);
    } else {
      await addInterview(data);
    }

    history.push(`/web-master/interview/${codeCountry}`);
  };

  const handleChangeInterviewType = (interviewType) => {
    setInterviewType(interviewType);
  };

  const handleChangeProject = (project) => {
    setProject(project);
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
                id="name"
                spellCheck="false"
                {...register("name", {
                  required: "Name required",
                })}
              />
              <span className="placeholder">Name</span>
            </div>
          </div>
          <div className="form-group">
            <label className="ml-4 logo-file" htmlFor="logo">
              Interview Image
            </label>
            <input
              type="file"
              className="form-control-file ml-4 shadow-none logo-file"
              id="image_url"
              name="image_url"
              multiple={false}
            />
          </div>
          <div className="col-12 col-lg-6 centralize mt-4">
            <Select
              placeholder="Select Interview Type"
              value={interviewType}
              onChange={handleChangeInterviewType}
              options={optionsInterviewType}
            />
          </div>
          <div className="col-12 col-lg-6 centralize mt-4">
            <Select
              placeholder="Select Project"
              value={project}
              onChange={handleChangeProject}
              options={optionsProject}
            />
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
            {idInterview !== undefined ? "Edit Interview" : "Add Interview"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InterviewForm;
