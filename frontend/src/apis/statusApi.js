import { getRequest } from "apis";

export const getStatus = async () => {
  try {
    const res = await getRequest("status");
    return res.data;
  } catch (error) {
    console.log(error);
  }
  return [];
};
