import axios from "axios";
import { erroInterceptor, responseInterceptor } from "./interceptors";
import { Environment } from "../../../environment";

const Api = axios.create({
    baseURL: Environment.URL_BASE,
});

Api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => erroInterceptor(error),
);

export { Api };