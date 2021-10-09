import { getRequest } from "./index";

export const getInterviewTtpe = async () => {
  try {
    const res = await getRequest("interviewtypes/");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getOneInterviewTypesByName = async (name) => {
  try {
    const res = await getRequest(`interviewtypes/${name}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
