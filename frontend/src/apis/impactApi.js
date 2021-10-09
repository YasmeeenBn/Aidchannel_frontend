import { deleteRequest, getRequest, postRequest, putRequest } from "apis";

export const getImpactsByProject = async (projectId) => {
  try {
    const res = await getRequest(`impact/${projectId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProjectImpactsAllData = async (projectId) => {
  try {
    const res = await getRequest(`impact/withAllData/${projectId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addImpactApi = async (impact) => {
  try {
    const res = await postRequest("impact/", impact);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const updateImpactApi = async (impactId, impact) => {
  try {
    const res = await putRequest(`impact/${impactId}`, impact);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteImpactApi = async (impactId) => {
  try {
    const res = await deleteRequest(`impact/${impactId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteGraphApi = async (projectId) => {
  try {
    const res = await deleteRequest(`impact/deletegraph/${projectId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
