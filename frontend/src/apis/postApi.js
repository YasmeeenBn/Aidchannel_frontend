import { deleteRequest, getRequest, postRequest, putRequest } from "apis";

export const addPostApi = async (post) => {
  try {
    const res = await postRequest("post/", post);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPostsApi = async () => {
  try {
    const res = await getRequest("post/");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addLikeToPostApi = async (userId, postId) => {
  try {
    const res = await postRequest(`post/like/${userId}/${postId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteLikeFromPostApi = async (likeId, postId) => {
  try {
    const res = await postRequest(`post/dislike/${likeId}/${postId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const incrementViewApi = async (postId, userId) => {
  try {
    const res = await putRequest(`post/incrementView/${postId}/${userId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getLastPostApi = async (userId) => {
  try {
    const res = await getRequest(`post/getLastPost/${userId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
