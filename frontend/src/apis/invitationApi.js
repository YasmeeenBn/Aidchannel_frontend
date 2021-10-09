import { deleteRequest, getRequest, postRequest, putRequest } from "apis";

export const sendInvitationApi = async (invitation) => {
  try {
    const res = await postRequest("invitation/", invitation);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getInvitationsApi = async (idRecever) => {
  try {
    const res = await getRequest(`invitation/${idRecever}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const ignoreInvitationsApi = async (idInvitation) => {
  try {
    const res = await deleteRequest(`invitation/${idInvitation}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOneInvitationApi = async (idUser1, idUser2) => {
  try {
    const res = await getRequest(
      `invitation/getInvitation/${idUser1}/${idUser2}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const acceptInvitationApi = async (idInvitation) => {
  try {
    const res = await putRequest(
      `invitation//acceptInvitation/${idInvitation}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
