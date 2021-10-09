import { deleteRequest, getRequest, postRequest, putRequest } from "./index";

// get all organization  with fields ID and Name just to improve performance
export const getAllHeadInterviewWithIdAndName = async () => {
  try {
    const res = await getRequest("interview/headInterviewWithIdAndName");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteInterviewApi = async (interviewId) => {
  try {
    const res = await deleteRequest(`interview/${interviewId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOneInterview = async (interviewId) => {
  try {
    const res = await getRequest(`interview/${interviewId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllInterviewByCountry = async (codeCountry) => {
  try {
    const res = await getRequest(`interview/ByCodeCountry/${codeCountry}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addInterview = async (interview) => {
  try {
    const res = await postRequest("interview", interview);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateInterview = async (idInterview, interview) => {
  try {
    const res = await putRequest(`interview/${idInterview}`, interview);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getInterviewByProjectAndType = async (
  idProject,
  idTypeInterview
) => {
  try {
    const res = await getRequest(
      `interview/getInterview/${idProject}/${idTypeInterview}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
