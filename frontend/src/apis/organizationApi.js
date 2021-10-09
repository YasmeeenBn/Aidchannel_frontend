import { deleteRequest, getRequest, postRequest, putRequest } from "./index";

export const getOrganization = async (organizationId) => {
  try {
    const { data } = await getRequest(`organization/${organizationId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getDonorsOfMonth = async (limit, page, searchText) => {
  try {
    const res = await getRequest(
      `organization/funderOfMonth?searchText=${searchText}&limit=${limit}&page=${page}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDonorsOfMonthScrolling = async ({
  pageParam = 1,
  queryKey,
}) => {
  const [search, limitPage] = queryKey;
  const { data } = await getRequest(
    `organization/funderOfMonth?searchText=${search}&limit=${limitPage}&page=${pageParam}`
  );

  return { data: data?.data, page: pageParam };
};

export const getImplementersOfMonth = async (limit, page) => {
  try {
    const res = await getRequest(
      `organization/implementerOfMonth?searchText=&limit=${limit}&page=${page}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getImplementersOfMonthScrolling = async ({
  pageParam = 1,
  queryKey,
}) => {
  const [search, limitPage] = queryKey;
  const { data } = await getRequest(
    `organization/implementerOfMonth?searchText=${search}&limit=${limitPage}&page=${pageParam}`
  );

  return {
    data: data.data,
    page: pageParam,
  };
};

export const getDonors = async () => {
  try {
    const res = await getRequest("organization");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllOrganizations = async () => {
  try {
    const res = await getRequest("organization");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
// get all organization  with fields ID and Name just to improve performance
export const getAllHeadOrganizationsWithIdAndName = async () => {
  try {
    const res = await getRequest("organization/headOrganizationWithIdAndName");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const AddOrganization = async (organization) => {
  try {
    const res = await postRequest("organization", organization);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSubsidiaryOrganization = async () => {
  try {
    const res = await getRequest("organization/subsidiaryOrganization");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteOrganization = async (orgId) => {
  try {
    const res = await deleteRequest(`organization/${orgId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getNumberOrganizationsByCountry = async (codeCountry) => {
  try {
    const res = await getRequest(
      `organization/numberByCodeCountry/${codeCountry}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllOrganizationsByCountry = async (codeCountry) => {
  try {
    const res = await getRequest(`organization/ByCodeCountry/${codeCountry}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// export const getAllOrganizationsByPagination = async ({
//   pageParam = 1,
//   queryKey,
// }) => {
//   const [limit] = queryKey;
//   try {
//     const { data } = await postRequest(
//       `organization/getAllOrganizationsByPagination?limit=${limit}&page=${pageParam}`
//     );
//     return { data: data.data, page: pageParam };
//   } catch (error) {
//     console.log(error);
//   }
// };

export const updateOrganization = async (idOrganization, organization) => {
  try {
    const res = await putRequest(
      `organization/${idOrganization}`,
      organization
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrganizationByType = async (orgType) => {
  try {
    const res = await getRequest(`organization/byType/${orgType}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getDonorsApi = async (codeCountry, searchDonor) => {
  try {
    const res = await getRequest(`organization/donors/${codeCountry}?search=${searchDonor}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getImplementersApi = async (codeCountry, searchImplementer) => {
  try {
    const res = await getRequest(`organization/implementers/${codeCountry}?search=${searchImplementer}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const enableDonorOfMonth = async (donorId) => {
  try {
    const res = await putRequest(`organization/enableDonorOfMonth/${donorId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const disabledDonorOfMonth = async (donorId) => {
  try {
    const res = await putRequest(
      `organization/disabledDonorOfMonth/${donorId}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const enableImplementerOfMonth = async (implementerId) => {
  try {
    const res = await putRequest(
      `organization/enabelImplementerOfMonth/${implementerId}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const disabledImplementerOfMonth = async (implementerId) => {
  try {
    const res = await putRequest(
      `organization/disabledImplementerOfMonth/${implementerId}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
