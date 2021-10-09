import React, { useState, useEffect } from "react";
import {
  getOneProjectOfMonthByCountryApi,
  getProjectOfMonthByCountryApi,
  getProjectsOfMonthApi,
} from "../../apis/projectApi";

import CardInfoDetails from "../../components/aidchannel/general/CardInfoDetails";

import CountryHeader from "../../components/layout/header/CountryHeader";
import PublicFooter from "../../components/layout/footer/PublicFooter";
import CardSmall from "../../components/aidchannel/general/CardSmall";
import { useParams } from "react-router-dom";
import { getOneInterviewTypesByName } from "apis/interviewTypeApi";
import { getInterviewByProjectAndType } from "apis/interviewApi";

const HomeCountry = (props) => {
  const [project, setProject] = useState();
  const [copTypeId, setCopTypeId] = useState();
  const [donorTypeId, setDonorTypeId] = useState();
  const [beneficiaryTypeId, setBeneficiaryTypeId] = useState();
  const [copInterview, setCopInterview] = useState();
  const [donorInterview, setDonorInterview] = useState();
  const [beneficiaryInterview, setBeneficiaryInterview] = useState();
  const { codeCountry } = useParams();

  useEffect(() => {
    getDataFromApi();
  }, []);

  const getDataFromApi = async () => {
    const proj = await getOneProjectOfMonthByCountryApi(codeCountry);
    setProject(proj);

    const cop = await getOneInterviewTypesByName("COP");
    setCopTypeId(cop);
    const donor = await getOneInterviewTypesByName("DONOR");
    setDonorTypeId(donor);
    const beneficiary = await getOneInterviewTypesByName("BENEFICIARY");
    setBeneficiaryTypeId(beneficiary);

    const copInterview = await getInterviewByProjectAndType(proj?._id, cop._id);
    setCopInterview(copInterview);
    const donorInterview = await getInterviewByProjectAndType(
      proj?._id,
      donor._id
    );
    setDonorInterview(donorInterview);
    const beneficiaryInterview = await getInterviewByProjectAndType(
      proj?._id,
      beneficiary._id
    );
    setBeneficiaryInterview(beneficiaryInterview);
  };
  const overview = {
    name: "overview",
    interviewImage: "/assets/overview.png",
  };
  console.log(copInterview, "copInter");
  console.log(donorInterview, "donorInter");
  console.log(beneficiaryInterview, "benefInter");
  return (
    <>
      <CountryHeader />
      <div className="container" style={{ minHeight: "100vh" }}>
        {project && (
          <>
            <h1 className="heading_background  mt-5 mb-5 pb-3 pt-3">
              Project<span className="sub-heading"> of the month</span>
            </h1>{" "}
            <CardInfoDetails data={project} />
          </>
        )}

        <div class="row">
          {copInterview && codeCountry && (
            <div class="col-12 col-md-6">
              <h1 className="heading_background  mt-3 mb-4 pb-3 pt-1">
                COP<span className="sub-heading"> Interview</span>
              </h1>
              <CardSmall data={copInterview} codeCountry={codeCountry} />
            </div>
          )}
          {donorInterview && codeCountry && (
            <div className="col-12 col-md-6">
              <h1 className="heading_background  mt-3 mb-4 pb-3 pt-1">
                Donor<span className="sub-heading"> Interview</span>
              </h1>
              <CardSmall data={donorInterview} codeCountry={codeCountry} />
            </div>
          )}
          {beneficiaryInterview && codeCountry && (
            <div className="col-12 col-md-6">
              <h1 className="heading_background  mt-3 mb-4 pb-3 pt-1">
                Beneficiary<span className="sub-heading"> Interview</span>
              </h1>
              <CardSmall
                data={beneficiaryInterview}
                codeCountry={codeCountry}
              />
            </div>
          )}
          {copInterview &&
            donorInterview &&
            beneficiaryInterview &&
            codeCountry && (
              <div className="col-12 col-md-6">
                <h1 className="heading_background  mt-3 mb-4 pb-3 pt-1">
                  Project<span className="sub-heading"> Overview</span>
                </h1>
                <CardSmall
                  data={overview}
                  codeCountry={codeCountry}
                  projectId={project?._id}
                />
              </div>
            )}
        </div>
      </div>

      <PublicFooter />
    </>
  );
};

export default HomeCountry;
