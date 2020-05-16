import axios from "axios";

const client = axios.create({
  baseURL: "https://localhost:44348/api/",
});

const request = function (options) {
  const onSuccess = function (response) {
    console.debug("Request Successful!", response);
    return { data: response.data, status: response.status };
  };

  const onError = function (error) {
    console.log("Request Failed:", error.config);

    if (error.response) {
      console.log("Status:", error.response.status);
      console.log("Data:", error.response.data);
      console.log("Headers:", error.response.headers);
    } else {
      console.log("Error Message:", error.message);
    }

    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;
