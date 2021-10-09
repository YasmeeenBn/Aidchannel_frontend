import { deleteRequest, getRequest, postRequest, putRequest } from "apis";

export const addCommentApi = async (comment) => {
  try {
    const res = await postRequest("comment/", comment);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getCommentsApi = async ({ pageParam = 1, queryKey }) => {
  const [limitPage, idPost] = queryKey;
  const { data } = await getRequest(
    `comment/${idPost}?limit=${limitPage}&page=${pageParam}`
  );

  return { data: data.data, page: pageParam };
};

export const getNumberCommentsApi = async (idPost) => {
  try {
    const res = await getRequest(`comment/numberComment/${idPost}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
