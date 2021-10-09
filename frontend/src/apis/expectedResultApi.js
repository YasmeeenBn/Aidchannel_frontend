import { deleteRequest, getRequest, postRequest, putRequest } from "apis";

export const addExpectedResultApi = async (result) => {
  try {
    const res = await postRequest("expectedResult/", result);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getExpectedResultByProjectApi = async (idProject) => {
  try {
    const res = await getRequest(
      `expectedResult/ExpectedResultsOfProject/${idProject}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteExpectedResultApi = async (resultId) => {
  try {
    const res = await deleteRequest(`expectedResult/${resultId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
