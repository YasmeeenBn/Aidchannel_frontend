import { deleteRequest, postRequest, putRequest } from "apis";

export const addActivityApi = async (activity) => {
  try {
    const res = await postRequest("activity/", activity);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getActivityApi = async (activitiesIds) => {
  try {
    const res = await postRequest("activity/getAcivityByoutcome", {
      activitiesIds,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateActivityApi = async (activityId, activity) => {
  try {
    const res = await putRequest(`activity/${activityId}`, activity);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteActivityApi = async (activityId) => {
  try {
    const res = await deleteRequest(`activity/${activityId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};