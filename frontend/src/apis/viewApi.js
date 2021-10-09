import { deleteRequest, getRequest, postRequest, putRequest } from "apis";

export const InsertViewApi = async (view) => {
         try {
           const res = await postRequest("view/", view);
           return res.data;
         } catch (error) {
           console.log(error);
         }
       };

export const getNumberProfiles = async (idUser) => {
  try {
    const res = await getRequest(`view/${idUser}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};       