import Axios, { AxiosRequestConfig } from "axios";
import userStore from "../store/user";

const customAxios = Axios.create();

customAxios.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${userStore.token}`;

  return config;
});

export default customAxios;
