import { deleteRequest, postRequest, putRequest } from "apis";

export const addOutPutApi = async (output) => {
  try {
    const res = await postRequest("output/", output);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOutPutApi = async (outcomesIds) => {
  try {
    const res = await postRequest("output/getOutputByoutcome", {
      outcomesIds,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateOutputApi = async (outputId, output) => {
  try {
    const res = await putRequest(`output/${outputId}`, output);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteOutPutApi = async (outputId) => {
  try {
    const res = await deleteRequest(`output/${outputId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
