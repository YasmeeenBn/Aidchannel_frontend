import React, { useState, useRef, useEffect, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import Flag from "react-world-flags";
import { getCountryByCode } from "apis/countryApi";

import { Checkbox } from "@material-ui/core";
import {
  addExpertArticle,
  getOneExpertArticle,
  updateExpertArticle,
} from "apis/ExpertArticleApi";
import ProjectOfTheMontInterview from "components/aidchannel/webmaster/ProjectOfTheMontInterview";
import {
  disabledExpertOfMonth,
  enableExpertOfMonth,
  getExpert,
} from "apis/userApi";
import urlImageAdapter from "helpers/urlImageAdapter";

const AddExpertArticle = () => {
  const { codeCountry, idExpert } = useParams();

  const editor = useRef(null);
  const [articleContent, setArticleContent] = useState("");
  const [articleEditLoading, setArticleEditLoading] = useState(false);
  const history = useHistory();
  const [article, setArticle] = useState();
  const [articleAddLoading, setArticleAddLoading] = useState(false);
  const [test, setTest] = useState(false);
  const [expertLogo, setExpetLogo] = useState();
  const [expertLogoPreview, setExpetLogoPreview] = useState(null);

  const [checked, setChecked] = useState(false);

  const articleConfig = {
    readonly: false,
    placeholder: "Expert's Article",
  };

  const getDataFromApi = useCallback(async () => {
    const article = await getOneExpertArticle(idExpert);
    console.log(article);
    if (article) {
      setArticle(article);
      setArticleContent(article?.article);
      setExpetLogoPreview(urlImageAdapter(article?.articleImage));
    }
    const expert = await getExpert(idExpert);

    if (expert) {
      setChecked(expert?.expert_of_month);
    }

    if (article !== null) setArticleContent(article?.article);
  }, [idExpert]);

  useEffect(() => {
    getDataFromApi();
  }, [getDataFromApi, test]);

  const addArticle = async () => {
    let formData = new FormData();
    formData.append("article", articleContent);
    formData.append("expert", idExpert);
    formData.append("articleImage", expertLogo);

    setArticleAddLoading(true);
    await addExpertArticle(formData);
    setTest(!test);
    setArticleAddLoading(false);
  };

  const editArticle = async () => {
    let formData = new FormData();
    formData.append("article", articleContent);
    if (expertLogo != undefined) formData.append("articleImage", expertLogo);

    setArticleEditLoading(true);
    await updateExpertArticle(article?._id, formData);
    setArticleEditLoading(false);
  };

  const handleChangeCheckbox = async () => {
    setChecked(!checked);
    if (checked === true) {
      await disabledExpertOfMonth(idExpert);
    } else {
      await enableExpertOfMonth(idExpert);
    }
  };

  return (
    <div className="container">
      {codeCountry && (
        <>
          <h1>
            <Flag
              code={codeCountry}
              height="70"
              width="70"
              style={{ marginRight: "2px" }}
              className="flag"
            />{" "}
            Add Expert's Article
          </h1>{" "}
          <hr />
          <div className="form-check">
            <Checkbox
              checked={checked}
              onChange={handleChangeCheckbox}
              inputProps={{ "aria-label": "primary checkbox" }}
              style={{ color: "blue" }}
            />

            <label className="form-check-label" for="defaultCheck1">
              Expert of the month
            </label>
          </div>
          <div
            className="my-5 p-3"
            style={{
              border: "1px solid #e6e6fa",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            }}
          >
            <ProjectOfTheMontInterview
              imageLabel="Expert Interview Image"
              editorValue={articleContent}
              editorRef={editor}
              editorConfig={articleConfig}
              setContent={setArticleContent}
              projectInterview={article}
              addLoading={articleAddLoading}
              loading={articleEditLoading}
              addLabel="Add article"
              editLabel="Edit article"
              editFunction={editArticle}
              addFunction={addArticle}
              logoPreview={expertLogoPreview}
              logo={expertLogo}
              setLogoPreview={setExpetLogoPreview}
              setLogo={setExpetLogo}
              inputId="copInterview"
            />
          </div>
          {/* </div> */}
          <hr />
        </>
      )}
    </div>
  );
};

export default AddExpertArticle;
