import { getRequest, postRequest, deleteRequest, putRequest } from "./index";

export const getExpertsofMonth = async (limit, page) => {
  try {
    const { data } = await postRequest(
      `user/expertOfMonth?limit=${limit}&page=${page}`,
      {
        searchText: "",
      }
    );
    return data?.data;
  } catch (error) {
    console.log(error);
  }
  return [];
};

// get details expert
export const getExpertDetails = async (expert_id) => {
  try {
    const res = await getRequest(`user/expertDetails/${expert_id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
  return [];
};

export const getExpertsofMonthScrolling = async ({
  pageParam = 1,
  queryKey,
}) => {
  const [search, limitPage] = queryKey;
  const { data } = await postRequest(
    `user/expertOfMonth?limit=${limitPage}&page=${pageParam}`,
    {
      searchText: search,
    }
  );
  return { data: data?.data, page: pageParam };
};

export const getExpert = async (expert_id) => {
  try {
    const { data } = await getRequest(`user/expertDetailData/${expert_id}`);

    return data;
  } catch (error) {
    console.log(error);
  }
  return [];
};
export const deleteExpert = async (ExpId) => {
  try {
    const res = await deleteRequest(`user/${ExpId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllExpertsByCountry = async (codeCountry) => {
  try {
    const res = await getRequest(`user/Experts`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateExpert = async (idExpert, expert) => {
  try {
    const res = await putRequest(`user/${idExpert}`, expert);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const AddExpert = async (expert) => {
  try {
    const res = await postRequest("user", expert);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllHeadExpertsWithIdAndName = async () => {
  try {
    const res = await getRequest("user/headExpertWithIdAndName");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const enableExpertOfMonth = async (expertId) => {
  try {
    const res = await putRequest(`user/enableExpertOfMonth/${expertId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const disabledExpertOfMonth = async (expertId) => {
  try {
    const res = await putRequest(`user/disabledExpertOfMonth/${expertId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//webmaster
export const AddWebmaster = async (webmaster) => {
  try {
    const res = await postRequest("user/addWebmaster", webmaster);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteWebmaster = async (webmasterId) => {
  try {
    const res = await deleteRequest(`user/${webmasterId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllwebmasters = async () => {
  try {
    const res = await getRequest("user/getAllwebmasters");
    return res.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOneWebmaster = async (webmasterId) => {
  try {
    const res = await getRequest(`user/${webmasterId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateWebmaster = async (idWebmaster, webmaster) => {
  try {
    const res = await putRequest(`user/webmaster/${idWebmaster}`, webmaster);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCops = async () => {
  try {
    const res = await getRequest(`user/allCop`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const AddUserApi = async (user) => {
  try {
    const res = await postRequest("user/add", user);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async () => {
  try {
    const res = await getRequest(`user/getAllUsers`);
    return res.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAddedUsersByWebmaster = async () => {
  try {
    const res = await getRequest(`user/getAddedUsersByWebmaster`);
    return res.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getNumberExperts = async () => {
  try {
    const res = await getRequest(`user/numberExpertsbyCodeCountry`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteUser = async (UserId) => {
  try {
    const res = await deleteRequest(`user/${UserId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//////////////////// LINKEDIN ///////////////////////////////
export const getRecommandationUsers = async () => {
  try {
    const res = await getRequest(`user/linkedinUsersRecommandation`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOneUser = async (userId) => {
  try {
    const res = await getRequest(`user/oneUser/${userId}`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
