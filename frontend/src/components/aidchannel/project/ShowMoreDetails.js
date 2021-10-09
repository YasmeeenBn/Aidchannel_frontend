import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { getExpectedResultByProjectApi } from "apis/expectedResultApi";
import { getKeyExpertsByProjectApi } from "apis/KeyExpertsApi";
import { getKpisByProjectApi } from "apis/kpisApi";
import { getMainBeneficiaryByProjectApi } from "apis/MainBeneficiaryApi";
import { getProject2 } from "apis/projectApi";
import { getLocalizationsByProjectApi } from "apis/localizationApi";

const ShowMoreDetails = () => {
  const [expectedResults, setExpectedResults] = useState([]);
  const [mainBeneficiaries, setMainBeneficiaries] = useState([]);
  const [keysExperts, setKeysExperts] = useState([]);
  const [kpis, setKpis] = useState([]);
  const [localizations, setLocalisations] = useState([]);
  const [project, setProject] = useState();

  const { idProject } = useParams();

  const getDataFromApi = useCallback(async () => {
    const expectedResults = await getExpectedResultByProjectApi(idProject);
    setExpectedResults(expectedResults);
    const mainBeneficiaries = await getMainBeneficiaryByProjectApi(idProject);
    setMainBeneficiaries(mainBeneficiaries);
    const keyExperts = await getKeyExpertsByProjectApi(idProject);
    setKeysExperts(keyExperts);
    const kpis = await getKpisByProjectApi(idProject);
    setKpis(kpis);
    const localizations = await getLocalizationsByProjectApi(idProject);
    setLocalisations(localizations);
    const project = await getProject2(idProject);
    setProject(project);
  }, [idProject]);

  useEffect(() => {
    getDataFromApi();
  }, [getDataFromApi]);
  return (
    <div class="container">
      <div class="row">
        <div class="col-sm-8 my-3 ">
          <h2 style={{ backgroundColor: "#f1f6f9", alignSelf: "flex-start" }}>
            Expected Results
          </h2>
          {expectedResults?.map((result) => (
            <div class="card my-3">
              <div class="card-body">
                <p class="card-text"> {result?.result} </p>
              </div>
            </div>
          ))}
        </div>
        <div class="col-sm-4 my-3 ">
          <h2 style={{ backgroundColor: "#f1f6f9", alignSelf: "flex-start" }}>
            Main Beneficiaries
          </h2>
          {mainBeneficiaries?.map((beneficiary) => (
            <div class="card my-3">
              <div class="card-body">
                <p class="card-text"> {beneficiary?.beneficiary} </p>
              </div>
            </div>
          ))}
        </div>
        <div class="col-sm-8 my-3">
          <h2 style={{ backgroundColor: "#f1f6f9", alignSelf: "flex-start" }}>
            Key Experts
          </h2>
          {keysExperts?.map((expert) => (
            <div class="card my-3">
              <div class="card-body">
                <p class="card-text"> {expert?.key_expert} </p>
              </div>
            </div>
          ))}
        </div>
        <div class="col-sm-4 my-3">
          <h2 style={{ backgroundColor: "#f1f6f9", alignSelf: "flex-start" }}>
            Kpis
          </h2>
          {kpis?.map((kpi) => (
            <div class="card my-3">
              <div class="card-body">
                <p class="card-text"> {kpi?.kpi} </p>
              </div>
            </div>
          ))}
        </div>
        <div class="col-sm-8 my-3">
          <h2 style={{ backgroundColor: "#f1f6f9", alignSelf: "flex-start" }}>
            Localization
          </h2>
          {localizations?.map((localization) => (
            <div class="card my-3">
              <div class="card-body">
                <p class="card-text"> {localization?.localization} </p>
              </div>
            </div>
          ))}
        </div>
        <div class="col-sm-4 my-3">
          <h2 style={{ backgroundColor: "#f1f6f9", alignSelf: "flex-start" }}>
            Thematic
          </h2>
          <div class="card my-3">
            <div class="card-body">
              <p class="card-text">{project?.thematique?.name}</p>
            </div>
          </div>
        </div>
        {/* <div class="col-sm-4 my-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">KPIs</h5>
              <p class="card-text">{data.kpi}</p>
            </div>
          </div>
        </div>  */}
      </div>
    </div>
  );
};
export default ShowMoreDetails;
//   <a href="#" class="btn btn-primary">
//   <a href="#" class="card-link"> Another link </a>;
