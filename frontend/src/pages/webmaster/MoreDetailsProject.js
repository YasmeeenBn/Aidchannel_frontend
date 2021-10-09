import Flag from "react-world-flags";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import "../../components/aidchannel/webmaster/OrganizationForm.css";
import "react-datepicker/dist/react-datepicker.css";
import "../../components/aidchannel/webmaster/ProjectForm.css";
import {
  addExpectedResultApi,
  deleteExpectedResultApi,
  getExpectedResultByProjectApi,
} from "apis/expectedResultApi";
import {
  addMainBeneficiaryApi,
  deleteMainBeneficiaryApi,
  getMainBeneficiaryByProjectApi,
} from "apis/MainBeneficiaryApi";
import {
  addKeyExpertsApi,
  deleteKeyExpertsApi,
  getKeyExpertsByProjectApi,
} from "apis/KeyExpertsApi";
import { addKpsiApi, deleteKpiApi, getKpisByProjectApi } from "apis/kpisApi";
import { FiDelete } from "react-icons/fi";
import {
  addLocalizationApi,
  deleteLocalizationApi,
  getLocalizationsByProjectApi,
} from "apis/localizationApi";

const MoreDetailsProject = () => {
  const [expectedResults, setExpectedResults] = useState([]);
  const [expectedResultInput, setExpectedResultInput] = useState("");
  const [mainBeneficiaries, setMainBeneficiaries] = useState([]);
  const [mainBeneficiaryInput, setMainBeneficiaryInput] = useState("");
  const [keysExperts, setKeysExperts] = useState([]);
  const [keyExpertInput, setKeyExpertInput] = useState("");
  const [kpis, setKpis] = useState([]);
  const [kpisInput, setKpisInput] = useState("");
  const [localizations, setLocalisations] = useState([]);
  const [localizationInput, setLocalizationInput] = useState("");

  const { codeCountry, idProject, multimedia } = useParams();
  const history = useHistory();

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
  }, [idProject]);

  useEffect(() => {
    getDataFromApi();
  }, [getDataFromApi]);

  const addExpectedResult = async (e) => {
    e.preventDefault();
    if (expectedResultInput !== "") {
      const result = await addExpectedResultApi({
        result: expectedResultInput,
        project_id: idProject,
      });
      setExpectedResults([...expectedResults, result]);
      setExpectedResultInput("");
    }
  };
  const addMainBeneficiary = async (e) => {
    e.preventDefault();
    if (mainBeneficiaryInput !== "") {
      const beneficiary = await addMainBeneficiaryApi({
        beneficiary: mainBeneficiaryInput,
        project_id: idProject,
      });
      setMainBeneficiaries([...mainBeneficiaries, beneficiary]);
      setMainBeneficiaryInput("");
    }
  };
  const addKpis = async (e) => {
    e.preventDefault();
    if (kpisInput !== "") {
      const kpi = await addKpsiApi({
        kpi: kpisInput,
        project_id: idProject,
      });
      setKpis([...kpis, kpi]);
      setKpisInput("");
    }
  };
  const addLocalization = async (e) => {
    e.preventDefault();
    if (localizationInput !== "") {
      const localization = await addLocalizationApi({
        localization: localizationInput,
        project_id: idProject,
      });
      setLocalisations([...localizations, localization]);
      setLocalizationInput("");
    }
  };
  const addKeyExperts = async (e) => {
    e.preventDefault();
    if (keyExpertInput !== "") {
      const expert = await addKeyExpertsApi({
        key_expert: keyExpertInput,
        project_id: idProject,
      });
      setKeysExperts([...keysExperts, expert]);
      setKeyExpertInput("");
    }
  };

  const deleteExpectedResult = async (idResult) => {
    if (window.confirm(`Are you sure you wish to delete this result ?`)) {
      await deleteExpectedResultApi(idResult);
      const newResults = expectedResults.filter((result) => {
        if (result?._id === idResult) return false;
        return true;
      });
      setExpectedResults(newResults);
    }
  };

  const deleteMainBeneficiarie = async (idBeneficiary) => {
    if (window.confirm(`Are you sure you wish to delete this beneficiary ?`)) {
      await deleteMainBeneficiaryApi(idBeneficiary);
      const newBeneficiries = mainBeneficiaries.filter((newBeneficiries) => {
        if (newBeneficiries?._id === idBeneficiary) return false;
        return true;
      });
      setMainBeneficiaries(newBeneficiries);
    }
  };

  const deleteKeyExpert = async (idExpert) => {
    if (window.confirm(`Are you sure you wish to delete this expert ?`)) {
      await deleteKeyExpertsApi(idExpert);
      const newExperts = keysExperts.filter((expert) => {
        if (expert?._id === idExpert) return false;
        return true;
      });
      setKeysExperts(newExperts);
    }
  };

  const deleteKpi = async (idKpi) => {
    if (window.confirm(`Are you sure you wish to delete this Kpis ?`)) {
      await deleteKpiApi(idKpi);
      const newKpis = kpis.filter((kpi) => {
        if (kpi?._id === idKpi) return false;
        return true;
      });
      setKpis(newKpis);
    }
  };

  const deleteLocalizarion = async (idLocalization) => {
    if (window.confirm(`Are you sure you wish to delete this localization ?`)) {
      await deleteLocalizationApi(idLocalization);
      const newLocalization = localizations.filter((localization) => {
        if (localization?._id === idLocalization) return false;
        return true;
      });
      setLocalisations(newLocalization);
    }
  };
  const ListExpectedResult = expectedResults?.map((expResult) => {
    return (
      <div
        className="row w-100 border my-2 p-3"
        style={{ backgroundColor: "#acdff4" }}
      >
        <div className="col-11">{expResult?.result}</div>
        <div className="col-1">
          {" "}
          <FiDelete
            size={27}
            onClick={() => deleteExpectedResult(expResult?._id)}
            color="red"
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    );
  });

  const ListMainBeneficiaries = mainBeneficiaries.map((mainBeneficiary) => {
    return (
      <div
        className="row w-100 border my-2 p-3"
        style={{ backgroundColor: "#acdff4" }}
      >
        <div className="col-11">{mainBeneficiary?.beneficiary}</div>{" "}
        <div className="col-1">
          <FiDelete
            size={27}
            onClick={() => deleteMainBeneficiarie(mainBeneficiary?._id)}
            color="red"
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    );
  });

  const ListKeyExperts = keysExperts.map((keyExpert) => {
    return (
      <div
        className=" row w-100 border my-2 p-3"
        style={{ backgroundColor: "#acdff4" }}
      >
        <div className="col-11">{keyExpert?.key_expert}</div>
        <div className="col-1">
          <FiDelete
            size={27}
            onClick={() => deleteKeyExpert(keyExpert?._id)}
            color="red"
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    );
  });

  const ListKpis = kpis.map((kpi) => {
    return (
      <div
        className="row w-100 border my-2 p-3"
        style={{ backgroundColor: "#acdff4" }}
      >
        <div className="col-11">{kpi?.kpi}</div>
        <div className="col-1">
          <FiDelete
            size={27}
            onClick={() => deleteKpi(kpi?._id)}
            color="red"
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    );
  });

  const ListLocalisation = localizations.map((localization) => {
    return (
      <div
        className=" row w-100 border my-2 p-3"
        style={{ backgroundColor: "#acdff4" }}
      >
        <div className="col-11">{localization?.localization}</div>
        <div className="col-1">
          <FiDelete
            size={27}
            onClick={() => deleteLocalizarion(localization?._id)}
            color="red"
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    );
  });

  return (
    <div className="container mt-4">
      <form>
        <div className="row">
          <div className="col-12 p-4 m-3 border shadow-radio">
            <div className="col-12">
              <h3 className="mb-4">Expected Result</h3>
              {ListExpectedResult}
            </div>
            <div className="col-12 col-lg-10 centralize mt-4">
              <div className="input-block">
                <input
                  className="input-org-form"
                  type="text"
                  id="thematic"
                  spellCheck="false"
                  value={expectedResultInput}
                  onChange={(e) => {
                    setExpectedResultInput(e.target.value);
                  }}
                />
                <span className="placeholder" style={{ color: "black" }}>
                  Expected Result
                </span>
              </div>
            </div>
            <div className="col-12 col-lg-2 centralize mt-4">
              <button
                onClick={addExpectedResult}
                className="btn btn-success shadow-none"
              >
                Add{" "}
              </button>
            </div>{" "}
          </div>
          <div className="col-12 p-4 m-3 border shadow-radio">
            <div className="col-12">
              {" "}
              <h3 className="mb-4">Main Beneficiary</h3>
              {ListMainBeneficiaries}
            </div>
            <div className="col-12 col-lg-10 centralize mt-4">
              <div className="input-block">
                <input
                  className="input-org-form"
                  type="text"
                  id="thematic"
                  spellCheck="false"
                  value={mainBeneficiaryInput}
                  onChange={(e) => {
                    setMainBeneficiaryInput(e.target.value);
                  }}
                />
                <span className="placeholder" style={{ color: "black" }}>
                  Main Beneficiary
                </span>
              </div>
            </div>{" "}
            <div className="col-12 col-lg-2 centralize mt-4">
              <button
                onClick={addMainBeneficiary}
                className="btn btn-success shadow-none"
              >
                Add{" "}
              </button>
            </div>{" "}
          </div>
          <div className="col-12 p-4 m-3 border shadow-radio">
            <div className="col-12">
              {" "}
              <h3 className="mb-4">Key Experts</h3>
              {ListKeyExperts}
            </div>
            <div className="col-12 col-lg-10 centralize mt-4">
              <div className="input-block">
                <input
                  className="input-org-form"
                  type="text"
                  id="thematic"
                  spellCheck="false"
                  value={keyExpertInput}
                  onChange={(e) => {
                    setKeyExpertInput(e.target.value);
                  }}
                />
                <span className="placeholder" style={{ color: "black" }}>
                  Key Experts
                </span>
              </div>
            </div>{" "}
            <div className="col-12 col-lg-2 centralize mt-4">
              <button
                onClick={addKeyExperts}
                className="btn btn-success shadow-none"
              >
                Add{" "}
              </button>
            </div>{" "}
          </div>
          <div className="col-12 p-4 m-3 border shadow-radio">
            <div className="col-12">
              {" "}
              <h3 className="mb-4">Kpis</h3>
              {ListKpis}
            </div>
            <div className="col-12 col-lg-10 centralize mt-4">
              <div className="input-block">
                <input
                  className="input-org-form"
                  type="text"
                  id="thematic"
                  spellCheck="false"
                  value={kpisInput}
                  onChange={(e) => {
                    setKpisInput(e.target.value);
                  }}
                />
                <span className="placeholder" style={{ color: "black" }}>
                  Kpis
                </span>
              </div>
            </div>{" "}
            <div className="col-12 col-lg-2 centralize mt-4">
              <button onClick={addKpis} className="btn btn-success shadow-none">
                Add
              </button>
            </div>{" "}
          </div>
          <div className="col-12 p-4 m-3 border shadow-radio">
            <div className="col-12">
              {" "}
              <h3 className="mb-4">Localizations</h3>
              {ListLocalisation}
            </div>
            <div className="col-12 col-lg-10 centralize mt-4">
              <div className="input-block">
                <input
                  className="input-org-form"
                  type="text"
                  id="thematic"
                  spellCheck="false"
                  value={localizationInput}
                  onChange={(e) => {
                    setLocalizationInput(e.target.value);
                  }}
                />
                <span className="placeholder" style={{ color: "black" }}>
                  Localization
                </span>
              </div>
            </div>
            <div className="col-12 col-lg-2 centralize mt-4">
              <button
                onClick={addLocalization}
                className="btn btn-success shadow-none"
              >
                Add
              </button>
            </div>{" "}
          </div>
        </div>
      </form>
    </div>
  );
};

export default MoreDetailsProject;
