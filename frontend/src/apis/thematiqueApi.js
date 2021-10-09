import { getRequest } from "./index";

export const getThematiques = async () => {
  try {
    const res = await getRequest("thematiques");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
