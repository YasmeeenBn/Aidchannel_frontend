import React from "react";
import JoditEditor from "jodit-react";
import { AiFillFileAdd } from "react-icons/ai";

const ProjectOfTheMontInterview = (props) => {
  const {
    imageLabel,
    editorValue,
    editorRef,
    editorConfig,
    setContent,
    projectInterview,
    addLoading,
    loading,
    addLabel,
    editLabel,
    editFunction,
    addFunction,
    logoPreview,
    logo,
    setLogoPreview,
    setLogo,
    inputId,
  } = props;

  const imagePreview = (e) => {
    setLogoPreview(URL.createObjectURL(e.target.files[0]));
    setLogo(e.target.files[0]);
  };

  return (
    <div>
      <div className="my-3">
        <div className="form-group m-auto">
          <label className="ml-4 logo-file d-inline" htmlFor={inputId}>
            {logoPreview && (
              <img
                src={logoPreview}
                alt="avatar"
                style={{ cursor: "pointer" }}
                width="15%"
                height="15%"
                className="avatar"
              />
            )}
            {!logoPreview && (
              <span style={{ cursor: "pointer" }}>
                {" "}
                {imageLabel + " : "}
                <AiFillFileAdd color="blue" size={40} />
              </span>
            )}
          </label>
          <input
            type="file"
            className="form-control-file ml-4 shadow-none logo-file d-none"
            id={inputId}
            name={inputId}
            onChange={imagePreview}
            multiple={false}
          />
        </div>
        <div className="mt-4">
          <JoditEditor
            ref={editorRef}
            value={editorValue}
            config={editorConfig}
            tabIndex={1}
            onBlur={(newContent) => {
              setContent(newContent);
            }}
          />
          {!projectInterview ? (
            !addLoading ? (
              <button
                onClick={() => addFunction()}
                className="btn btn-secondary mt-3  shadow-none"
              >
                {addLabel}
              </button>
            ) : (
              <div className="spinner-border text-danger m-3" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )
          ) : !loading ? (
            <button
              onClick={() => editFunction()}
              className="btn btn-warning mt-3  shadow-none"
            >
              {editLabel}
            </button>
          ) : (
            <div className="spinner-border text-danger m-3" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectOfTheMontInterview;
