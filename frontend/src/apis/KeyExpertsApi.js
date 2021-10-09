import { deleteRequest, getRequest, postRequest, putRequest } from "apis";

export const addKeyExpertsApi = async (expert) => {
  try {
    const res = await postRequest("keyExpert/", expert);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getKeyExpertsByProjectApi = async (idProject) => {
  try {
    const res = await getRequest(`keyExpert/keyExpertOfProjects/${idProject}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteKeyExpertsApi = async (expertId) => {
  try {
    const res = await deleteRequest(`keyExpert/${expertId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
