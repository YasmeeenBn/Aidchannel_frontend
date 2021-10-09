import { deleteRequest, getRequest, postRequest, putRequest } from "apis";

export const addLocalizationApi = async (localization) => {
  try {
    const res = await postRequest("localization/", localization);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getLocalizationsByProjectApi = async (idProject) => {
  try {
    const res = await getRequest(
      `localization/localizationOfProject/${idProject}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteLocalizationApi = async (localizationId) => {
  try {
    const res = await deleteRequest(`localization/${localizationId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
