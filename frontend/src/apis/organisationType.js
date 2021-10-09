import { getRequest } from "./index";

export const getOrganizationsType = async () => {
  
  try {
    const res = await getRequest("organizationtypes");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
