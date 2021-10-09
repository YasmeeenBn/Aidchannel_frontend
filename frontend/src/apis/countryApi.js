import { getRequest, putRequest } from "./index";

export const getEnabledCountries = async () => {
  try {
    const res = await getRequest("country/enabled");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const index = async () => {
  try {
    const res = await getRequest("country/");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDisabledCountries = async () => {
  try {
    const res = await getRequest("country/disabled");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const enableCountryAPi = async (idCountry) => {
  try {
    const res = await putRequest(`country/enable/${idCountry}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const disableCountryApi = async (idCountry) => {
  try {
    const res = await putRequest(`country/disable/${idCountry}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCountryByCode = async (codeCountry) => {
  try {
    const res = await getRequest(`country/country_by_code/${codeCountry}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
