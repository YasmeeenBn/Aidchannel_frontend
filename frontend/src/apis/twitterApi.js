import { getRequest, putRequest, postRequest } from ".";

export const getAllTweetsByCountryPagination = async ({
  pageParam = 1,
  queryKey,
}) => {
  const [codeCountry, limit] = queryKey;
  try {
    const { data } = await getRequest(
      `twitter/allTweetsPagination/${codeCountry}?limit=${limit}&page=${pageParam}`
    );
    return { data: data.data, page: pageParam };
  } catch (error) {
    console.log(error);
  }
};

//get tweets with search
export const getAllTweetsByCountryPaginationSearch = async ({
  pageParam = 1,
  queryKey,
}) => {
  const [codeCountry, search, limit] = queryKey;
  try {
    const { data } = await getRequest(
      `twitter/allTweetsPagination/${codeCountry}?limit=${limit}&page=${pageParam}`,
      {
        searchText: search,
      }
    );
    return { data: data.data, page: pageParam };
  } catch (error) {
    console.log(error);
  }
};

export const acceptTweet = async (tweetId) => {
  try {
    await putRequest(`twitter/acceptTweet/${tweetId}`);
  } catch (error) {
    console.log(error);
  }
};

export const refuseTweet = async (tweetId) => {
  try {
    await putRequest(`twitter/refuseTweet/${tweetId}`);
  } catch (error) {
    console.log(error);
  }
};
export const getTweetsAccepted = async ({ pageParam = 1, queryKey }) => {
  const [codeCountry, limit] = queryKey;
  try {
    const { data } = await getRequest(
      `twitter/TweetsAccepted/${codeCountry}?limit=${limit}&page=${pageParam}`
    );
    return { data: data.data, page: pageParam };
  } catch (error) {
    console.log(error);
  }
};

export const getNumberTweetsByCountry = async (codeCountry) => {
  try {
    const res = await getRequest(`twitter/numberByCodeCountry/${codeCountry}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getTweetsByName = async ({ pageParam = 1, queryKey }) => {
  const [search, limitPage, codeCountry] = queryKey;
  const { data } = await postRequest(
    `twitter/SearchByName?limit=${limitPage}&page=${pageParam}`,
    {
      searchText: search,
      code: codeCountry,
    }
  );

  return { data: data.data, page: pageParam };
};

export const getAcceptedTweetsByCountry = async (codeCountry, limit) => {
  try {
    const res = await getRequest(
      `twitter/acceptedTweetsByCodeCountry/${codeCountry}/${limit}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const gettweetsScrolling = async ({ pageParam = 1, queryKey }) => {
  const [search, codeCountry, limitPage] = queryKey;
  const {
    data,
  } = await postRequest(
    `twitter/tweetsOfCountry?limit=${limitPage}&page=${pageParam}`,
    { code: codeCountry, searchText: search }
  );
  return { data: data?.data, page: pageParam };
};
