import { deleteRequest, getRequest, postRequest, putRequest } from "apis";

export const addMainBeneficiaryApi = async (result) => {
  try {
    const res = await postRequest("mainBeneficiary/", result);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getMainBeneficiaryByProjectApi = async (idProject) => {
  try {
    const res = await getRequest(
      `mainBeneficiary/MainBeneficiaryOfProject/${idProject}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteMainBeneficiaryApi = async (beneficiaryId) => {
  try {
    const res = await deleteRequest(`mainBeneficiary/${beneficiaryId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
