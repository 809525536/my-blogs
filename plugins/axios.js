import * as qs from "qs";

export default function({ store, redirect, app: { $axios } }) {
  console.log(process.env.NODE_ENV);
  const env = process.env.NODE_ENV;
  // 数据访问前缀
  $axios.defaults.baseURL =
    env == "development" ? "http://localhost/" : "http://39.99.186.35/";

  $axios.defaults.withCredentials = true;

  // request拦截器，我这里设置了一个token，当然你可以不要
  $axios.onRequest(config => {});
  $axios.onError(error => {});
  // response拦截器，数据返回后，你可以先在这里进行一个简单的判断
  $axios.interceptors.request.use(config => {
    if (config.method === "post") {
      // 序列化
      // config.data = qs.stringify(config.data);
      // config.data = JSON.stringify(config.data);
    }
    return config;
  });
  // response拦截器，数据返回后，你可以先在这里进行一个简单的判断
  $axios.interceptors.response.use(response => {
    return response.data;
  });
}
