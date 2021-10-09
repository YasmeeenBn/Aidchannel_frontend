import { deleteRequest, getRequest, postRequest, putRequest } from "./index";

export const deleteExpertArticleApi = async (ExpertArticleId) => {
  try {
    const res = await deleteRequest(`ExpertArticle/${ExpertArticleId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOneExpertArticle = async (ExpertArticleId) => {
  try {
    const res = await getRequest(`ExpertArticle/${ExpertArticleId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getExpertArticleByIdExpert = async (expert_id) => {
  try {
    const res = await getRequest(`ExpertArticle/${expert_id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addExpertArticle = async (ExpertArticle) => {
  try {
    const res = await postRequest("ExpertArticle", ExpertArticle);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateExpertArticle = async (idExpertArticle, ExpertArticle) => {
  console.log(ExpertArticle.values(), "expAr");
  try {
    const res = await putRequest(
      `ExpertArticle/${idExpertArticle}`,
      ExpertArticle
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
