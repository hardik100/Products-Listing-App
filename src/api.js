import axios from "axios";
import _ from "lodash";

export const api = {
  get,
  put,
  deleteApi,
};

export const DEV_API_URL =
  "http://dummy.restapiexample.com/api/v1/";

function get(url) {
  return axios
    .get(DEV_API_URL + url, {
      headers: {},
    })
    .then((result) => {
      var data;
      if (result.data) {
        data = result.data.data;
      } else if (result.result) {
        data = result.result;
      }
      return data;
    })
    .catch(function (error) {
      return errorMessageHandling(error);
    });
}

function put(url, data) {
  console.log("In Api Put.. ", url, data);
  return axios
    .put(DEV_API_URL + url, data, {
      headers: {},
    })
    .then((response) => {
      const data = response.data && response.data.result;
      console.log(data);
      return data;
    })
    .catch(function (error) {
      console.log("dfd", error);
      return errorMessageHandling(error);
    });
}

function deleteApi(url, data) {
  var config = {
    headers: {},
    data: data,
  };
  return axios
    .delete(DEV_API_URL + url, config)
    .then((result) => {
      var data = result.data.result;
      console.log(data);
      return data;
    })
    .catch(function (error) {
      return errorMessageHandling(error);
    });
}

function getErrors(arr) {
  let op = "";
  Object.keys(arr).forEach((e) => {
    op = op + arr[e][0] + "\n";
  });
  return op;
}

function errorMessageHandling(error) {
  // return;
  let errorObject = JSON.parse(
    JSON.stringify((error.response && error.response.data) || "")
  );

  if (_.isEmpty(errorObject)) {
    throw "Error";
  }
  console.log("errorObject3", errorObject);
  let op = "";
  if (errorObject.response && errorObject.response.data.message !== undefined) {
    op = errorObject.response.data.message;
  } else if (errorObject.response && errorObject.response.data.result) {
    op = getErrors(errorObject.response.data.result.errors);
  }
  return new Promise((resolve, reject) => {
    if (errorObject.message === undefined)
      reject(errorObject.response ? op : "No internet connection");
    else reject(errorObject.message);
  });
}
