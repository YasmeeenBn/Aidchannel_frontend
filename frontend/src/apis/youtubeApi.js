import { getRequest, putRequest, postRequest } from ".";

export const getAllVideosByCountryPagination = async ({
  pageParam = 1,
  queryKey,
}) => {
  const [codeCountry, limit] = queryKey;
  try {
    const { data } = await getRequest(
      `youtube/videosByCountry/${codeCountry}?limit=${limit}&page=${pageParam}`
    );
    return { data: data.data, page: pageParam };
  } catch (error) {
    console.log(error);
  }
};
export const getVideosScrolling = async ({ pageParam = 1, queryKey }) => {
  const [search, codeCountry, limitPage] = queryKey;
  const {
    data,
  } = await postRequest(
    `youtube/videosOfCountry?limit=${limitPage}&page=${pageParam}`,
    { code: codeCountry, searchText: search }
  );
  return { data: data?.data, page: pageParam };
};

export const getVideosByCountry = async (codeCountry, limit, page) => {
  try {
    const { data } = await getRequest(
      `youtube/videosByCountry/${codeCountry}?limit=${limit}&page=${page}`
    );
    return data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAcceptedVideosByCountryLimit = async (codeCountry, limit) => {
  try {
    const { data } = await getRequest(
      `youtube/videosAcceptedByCountryLimit/${codeCountry}?limit=${limit}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const acceptVideo = async (videoId) => {
  try {
    await putRequest(`youtube/acceptVideo/${videoId}`);
  } catch (error) {
    console.log(error);
  }
};

export const refuseVideo = async (videoId) => {
  try {
    await putRequest(`youtube/refuseVideo/${videoId}`);
  } catch (error) {
    console.log(error);
  }
};
export const getVideoAccepted = async ({ pageParam = 1, queryKey }) => {
  const [codeCountry, limit] = queryKey;
  try {
    const { data } = await getRequest(
      `youtube/VideosAccepted/${codeCountry}?page=${pageParam}&limit=${limit}`
    );
    return { data: data.data, page: pageParam };
  } catch (error) {
    console.log(error);
  }
};

export const getNumberVideosByCountry = async (codeCountry) => {
  try {
    const res = await getRequest(`youtube/numberByCodeCountry/${codeCountry}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getVideosbyChannelName = async ({ pageParam = 1, queryKey }) => {
  const [search, limitPage, codeCountry] = queryKey;
  const { data } = await postRequest(
    `youtube/searchByChannelName?limit=${limitPage}&page=${pageParam}`,
    {
      searchText: search,
      code: codeCountry,
    }
  );

  return { data: data.data, page: pageParam };
};
