import { API } from "../configs/constants";
import includes from "lodash/includes";

function generalUrl(url: string | string[]) {
  let baseURL = API + url;
  return {
    baseURL,
  };
}

const get = (url: any, options = {}, token: any) => {
  return new Promise((resolve, reject) => {
    const { baseURL } = generalUrl(url);
    const contentType = "application/json";
    // console.log(baseURL);
    fetch(baseURL, {
      ...options,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": contentType,
        Authorization: token ? `Bearer ${token}` : null,
      },
    })
      .then((res) => {
        if (String(res.status)[0] === "2" || String(res.status)[0] === "4") {
          return res.json();
        } else if (String(res.status)[0] === "1") {
          resolve({ error_message: "Pending" });
        } else if (String(res.status)[0] === "3") {
          resolve({ error_message: "Redirection " });
        } else if (String(res.status)[0] === "5") {
          resolve({ error_message: "Can not connect to server " });
        }
      })
      .then((resJson) => {
        resolve(resJson);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const post = (url: any, data: any, method = "POST", token: any) => {
  return new Promise((resolve, reject) => {
    const { baseURL } = generalUrl(url);
    const contentType = includes(url, "upload")
      ? "multipart/form-data"
      : "application/json";
    fetch(baseURL, {
      method: method,
      headers: {
        Accept: "application/json",
        Authorization: token ? `Bearer ${token}` : null,
        "Content-Type": contentType,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (String(res.status)[0] === "2" || String(res.status)[0] === "4") {
          return res.json();
        } else if (String(res.status)[0] === "1") {
          resolve({ error_message: "Pending" });
        } else if (String(res.status)[0] === "3") {
          resolve({ error_message: "Redirection " });
        } else if (String(res.status)[0] === "5") {
          resolve({ error_message: "Can not connect to server " });
        }
      })
      .then((resJson) => {
        resolve(resJson);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default {
  get,
  post,
  put: (url: any, data: any, token: any) => post(url, data, "PUT", token),
  delete: (url: any, data: any, token: any) => post(url, data, "DELETE", token),
};
