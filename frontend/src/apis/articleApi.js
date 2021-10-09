import { getRequest, putRequest, postRequest } from ".";

export const getAllArticlesByCountryPagination = async ({
  pageParam = 1,
  queryKey,
}) => {
  const [codeCountry, limit] = queryKey;
  try {
    const { data } = await getRequest(
      `article/articlesByCountry/${codeCountry}?limit=${limit}&page=${pageParam}`
    );
    return { data: data.data, page: pageParam };
  } catch (error) {
    console.log(error);
  }
};
export const getArticlesByCountry = async (codeCountry, limit, page) => {
  try {
    const { data } = await getRequest(
      `article/articlesByCountry/${codeCountry}?limit=${limit}&page=${page}`
    );
    return data?.data;
  } catch (error) {
    console.log(error);
  }
};
export const acceptArticle = async (articleId) => {
  try {
    await putRequest(`article/acceptArticle/${articleId}`);
  } catch (error) {
    console.log(error);
  }
};

export const refuseArticle = async (articleId) => {
  try {
    await putRequest(`article/refuseArticle/${articleId}`);
  } catch (error) {
    console.log(error);
  }
};
export const getArticlesAccepted = async ({ pageParam = 1, queryKey }) => {
  const [codeCountry, limit] = queryKey;
  try {
    const { data } = await getRequest(
      `article/ArticlesAccepted/${codeCountry}`
    );
    return { data: data.data, page: pageParam };
  } catch (error) {
    console.log(error);
  }
};
export const getArticlesbyKeyword = async ({ pageParam = 1, queryKey }) => {
  const [search, limitPage, codeCountry] = queryKey;
  const { data } = await postRequest(
    `article/searchByKeyword?limit=${limitPage}&page=${pageParam}`,
    {
      searchText: search,
      code: codeCountry,
    }
  );

  return { data: data.data, page: pageParam };
};
export const getArticleAcceptedByCountry = async (codeCountry, limit, page) => {
  try {
    const { data } = await getRequest(
      `article/ArticlesAccepted/${codeCountry}?limit=${limit}&page=${page}`
    );
    return data?.data;
  } catch (error) {
    console.log(error);
  }
};
export const getNumberArticlesByCountry = async (codeCountry) => {
  try {
    const res = await getRequest(`article/numberByCodeCountry/${codeCountry}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getarticlesScrolling = async ({ pageParam = 1, queryKey }) => {
  const [search, codeCountry, limitPage] = queryKey;
  const {
    data,
  } = await postRequest(
    `article/articlesOfCountry?limit=${limitPage}&page=${pageParam}`,
    { code: codeCountry, searchText: search }
  );
  return { data: data?.data, page: pageParam };
};
