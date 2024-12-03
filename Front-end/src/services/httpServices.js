import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

axios.defaults.withCredentials = true;

const get = async (url) => {
  try {
    const data = await axios.get(apiBaseUrl + url);
    return data;
  } catch (error) {
    console.log(error);
    return { error: ["Error fetching data!"] };
  }
};

const post = async (url, payload) => {
  try {
    const data = await axios.post(apiBaseUrl + url, payload);
    return data;
  } catch (error) {
    console.error(error.response.data);
    return error.response.data;
  }
};

const del = async (url) => {
  try {
    const data = await axios.delete(apiBaseUrl + url);
    return data;
  } catch (err) {
    console.error(err.response.data);
    return error.response.data;
  }
};

export default {
  get,
  post,
  del,
};
