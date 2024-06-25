import _ from "../assets/utils";
import qs from "qs";
import { message } from "antd";

/* 核心方法 */
const http = function http(config) {
  if (!_.isPlainObject(config)) config = {};
  config = Object.assign(
    {
      url: "",
      method: "GET",
      credentials: "include",
      headers: null,
      body: null,
      params: null,
      responseType: "json",
      signal: null,
    },
    config
  );
  if (!config.url) throw new TypeError("url must bes required");
  if (!_.isPlainObject(config.headers)) config.headers = {};
  if (config.params !== null && !_.isPlainObject(config.params)) {
    config.params = null;
  }

  //处理各种细节
  let {
    url,
    method,
    credentials,
    headers,
    body,
    params,
    responseType,
    signal,
  } = config;
  //处理问号传参
  if (params) {
    url += `${url.includes("?") ? "&" : "?"}${qs.stringify(params)}`;
  }
  //处理请求主体信息
  if (_.isPlainObject(body)) {
    body = qs.stringify(body);
    headers["Content-Type"] = "application/x-www-form-urlencoded";
  }

  //类似于axios中的请求拦截器:每一个请求，传递给服务器的相同内容可以在这里处理
  let token = localStorage.getItem("token");
  if (token) headers["Authorization"] = token;

  //发送请求
  method = method.toUpperCase();
  config = {
    method,
    credentials,
    headers,
    cache: "no-cache",
  };
  if (/^(POST|PUT|PATCH)$/i.test(method) && body) config.body = body;
  return fetch(url, config)
    .then((response) => {
      let { status, statusText } = response;
      if (/^(2|3)\d{2}$/.test(status)) {
        let result;
        switch (responseType.toLowerCase()) {
          case "text":
            result = response.text();
            break;
          case "blob":
            result = response.blob();
            break;
          case "arraybuffer":
            result = response.arrayBuffer();
            break;
          default:
            result = response.json();
        }

        return result;
      }
      return Promise.reject({
        code: -100,
        status,
        statusText,
      });
    })
    .catch((reason) => {
      if (reason && typeof reason === "object") {
        let { code, status, statusText } = reason;
        if (code === -100) {
          message.error(`${status} ${statusText}`);
        }
      } else {
        message.error("当前网络繁忙，请您稍后再试");
      }
      return Promise.reject(reason); //统一处理完提示后，在组件中获取到的依然还是失败
    });
};

/* 快捷方法 */
["GET", "HEAD", "DELETE", "OPTIONS"].forEach((item) => {
  http[item.toLowerCase()] = function http(url, config) {
    if (!_.isPlainObject(config)) config = {};
    config["url"] = url;
    config["method"] = item;
    return http(config);
  };
});

["POST", "PUT", "PATCH"].forEach((item) => {
  http[item.toLowerCase()] = function http(url, data, config) {
    if (!_.isPlainObject(config)) config = {};
    config["url"] = url;
    config["method"] = item;
    config["data"] = data;
  };
});

export default http;
