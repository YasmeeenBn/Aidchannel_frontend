import { deleteRequest, postRequest, putRequest } from "apis";

export const addOutComeApi = async (outcome) => {
  try {
    const res = await postRequest("outcome/", outcome);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOutComeApi = async (impactsIds) => {
  try {
    const res = await postRequest("outcome/getOutcomeByImpacts", {
      impactsIds,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateOutcomeApi = async (outcomeId, outcome) => {
  try {
    const res = await putRequest(`outcome/${outcomeId}`, outcome);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteOutComeApi = async (outcome) => {
  try {
    const res = await deleteRequest(`outcome/${outcome}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
