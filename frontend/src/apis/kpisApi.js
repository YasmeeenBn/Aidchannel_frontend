import { deleteRequest, getRequest, postRequest, putRequest } from "apis";

export const addKpsiApi = async (result) => {
  try {
    const res = await postRequest("kpi/", result);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getKpisByProjectApi = async (idProject) => {
  try {
    const res = await getRequest(`kpi/KpisOfProject/${idProject}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteKpiApi = async (kpiId) => {
  try {
    const res = await deleteRequest(`kpi/${kpiId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
