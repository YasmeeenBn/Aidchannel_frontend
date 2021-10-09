import { getRequest, postRequest, deleteRequest, putRequest } from "./index";

//projects from DATABASE  projectsByStatus
export const getProject = async ({ pageParam = 1, queryKey }) => {
  const [search, limitPage] = queryKey;
  const { data } = await getRequest(
    `project/globalProjectsByKeyWord?searchText=${search}&limit=${limitPage}&page=${pageParam}`
  );
  return {
    data: data.data,
    page: pageParam,
  };
};
// get projects by name and status
export const getProjectByStatus = async ({ pageParam = 1, queryKey }) => {
  const [search, limitPage, searchStatus] = queryKey;
  const { data } = await getRequest(
    `project/projectsByStatus?searchText=${search}&limit=${limitPage}&page=${pageParam}&status_project=${searchStatus}`
  );
  return {
    data: data.data,
    page: pageParam,
  };
};
//project of the month
export const getProjectsOfMonthApi = async (limit, page) => {
  try {
    const res = await postRequest(
      `project/projectOfMonth?limit=${limit}&page=${page}`,
      {
        searchText: "",
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
  return [];
};

export const getOneProjectOfMonthByCountryApi = async (codeCountry) => {
  try {
    const res = await getRequest(
      `project/oneProjectOfMonthByCodeCountry/${codeCountry}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
  return [];
};

export const getProjectOfMonthScrolling = async ({
  pageParam = 1,
  queryKey,
}) => {
  const [search, limitPage] = queryKey;
  const { data } = await postRequest(
    `project/projectOfMonth?limit=${limitPage}&page=${pageParam}`,
    {
      searchText: search,
    }
  );
  return { data: data?.data, page: pageParam };
};

export const getAllProjectsByThematic = async ({
  pageParam = 1,
  queryKey,
}) => {
  try {
    const [search, limitPage, codeCountry, id] = queryKey;
    console.log(queryKey)
    const res = await getRequest(
      `project/projectsByCountryThematic?limit=${limitPage}&page=${pageParam}&search=${search}&count=${codeCountry}&thematic=${id}`,
      
    );
    // console.log(res.data.data)
    return {data: res.data?.data, page:pageParam };
  } catch (error) {
    console.log(error);
  }
};

export const getAllProjectsByDonor = async ({
  pageParam = 1,
  queryKey,
}) => {
  try {
    const [search, limitPage, codeCountry, id] = queryKey;
    console.log(queryKey)
    const res = await getRequest(
      `project/projectsByOrg?limit=${limitPage}&page=${pageParam}&search=${search}&count=${codeCountry}&org=${id}&type=funder`,
      
    );
    // console.log(res.data.data)
    return {data: res.data?.data, page:pageParam };
  } catch (error) {
    console.log(error);
  }
};

export const getAllProjectsByImplementer = async ({
  pageParam = 1,
  queryKey,
}) => {
  try {
    const [search, limitPage, codeCountry, id] = queryKey;
    console.log(queryKey)
    const res = await getRequest(
      `project/projectsByOrg?limit=${limitPage}&page=${pageParam}&search=${search}&count=${codeCountry}&org=${id}&type=implementer`,
      
    );
    // console.log(res.data.data)
    return {data: res.data?.data, page:pageParam };
  } catch (error) {
    console.log(error);
  }
};

export const getAllProjectsOfMonthByThematic = async (id, codeCountry) => {
  try {
    const res = await getRequest(
      `project/projectsOfMonthByThematic/${id}/${codeCountry}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getProjectByFunder = async (idFunder, limit, page) => {
  try {
    const res = await getRequest(
      `project/byFunder/${idFunder}?limit=${limit}&page=${page}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProjectsKeywordCountry = async ({
  pageParam = 1,
  queryKey,
}) => {
  const [search, limitPage, codeCountry] = queryKey;
  const { data } = await postRequest(
    `project/searchByKeyword?limit=${limitPage}&page=${pageParam}`,
    {
      searchText: search,
      code: codeCountry,
    }
  );

  return { data: data.data, page: pageParam };
};

// get project
export const getProject2 = async (project_id) => {
  try {
    const res = await getRequest(`project/projectDetailData/${project_id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
  return [];
};

export const getNumberProjectsByCountry = async (codeCountry) => {
  try {
    const res = await getRequest(
      `project/numberProjectsbyCodeCountry/${codeCountry}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getNumberProjectsByCountryNULL = async (codeCountry) => {
  try {
    const res = await getRequest(
      `project/numberProjectsbyCodeCountryNull/${codeCountry}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getNumberProjects = async () => {
  try {
    const res = await getRequest(`project/numberProjects`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const AddProject = async (project) => {
  try {
    const res = await postRequest("project", project);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteProject = async (projectID) => {
  try {
    const res = await deleteRequest(`project/${projectID}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const updateProject = async (IdProject, project) => {
  try {
    const res = await putRequest(`project/${IdProject}`, project);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllHeadProjectsWithIdAndName = async () => {
  try {
    const res = await getRequest("project/headProjectWithIdAndName");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllProjectsByCountry = async (codeCountry) => {
  try {
    const res = await getRequest(`project/ByCodeCountry/${codeCountry}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllProjectsOfMonthByCountry = async (codeCountry) => {
  try {
    const res = await getRequest(
      `project/projectsOfMonthByCodeCountry/${codeCountry}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const enablePojectOfMonth = async (projectId, codeCountry) => {
  try {
    const res = await putRequest(
      `project/enabelProjectOfMonth/${projectId}/${codeCountry}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const disabledPojectOfMonth = async (projectId) => {
  try {
    const res = await putRequest(`project/disabledProjectOfMonth/${projectId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllProjectsByCountryNull = async (codeCountry) => {
  try {
    const res = await getRequest(`project/ByCodeCountryNull/${codeCountry}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const acceptProject = async (projectId) => {
  try {
    await putRequest(`project/acceptProject/${projectId}`);
  } catch (error) {
    console.log(error);
  }
};

export const refuseProject = async (projectId) => {
  try {
    await putRequest(`project/refuseProject/${projectId}`);
  } catch (error) {
    console.log(error);
  }
};
export const getAllProjectsByCountryPagination = async ({
  pageParam = 1,
  queryKey,
}) => {
  const [codeCountry, limit] = queryKey;
  try {
    const { data } = await postRequest(
      `project/byCodeCountryPagination/${codeCountry}?limit=${limit}&page=${pageParam}`
    );
    return { data: data.data, page: pageParam };
  } catch (error) {
    console.log(error);
  }
};
export const getProjectsAccepted = async ({ pageParam = 1, queryKey }) => {
  const [codeCountry, limit] = queryKey;
  try {
    const { data } = await postRequest(
      `project/projectsAccepted/${codeCountry}`
    );
    return { data: data.data, page: pageParam };
  } catch (error) {
    console.log(error);
  }
};


export const getAllProjectsOfMonthByDonors = async (idOrg, codeCountry) => {
  try {
    const res = await getRequest(
      `project/projectsOfMonthByDonors/${idOrg}/${codeCountry}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllProjectsOfMonthByImplementers = async (
  idOrg,
  codeCountry
) => {
  try {
    const res = await getRequest(
      `project/projectsOfMonthByImplementers/${idOrg}/${codeCountry}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
