import axios, { type InternalAxiosRequestConfig } from "axios";
import { devPrint } from "../utils";
import { LOCAL_API_ENDPOINT, PROD_API_ENDPOINT } from "../constants";

const api = axios.create({
    baseURL: import.meta.env.DEV ? LOCAL_API_ENDPOINT : PROD_API_ENDPOINT,
    withCredentials: true,
});

export const getCSRF = async () => {
    try {
        const response = await api.get("/auth/csrf/");
        const csrfToken = response.headers["x-csrftoken"];
        if (csrfToken) {
            api.defaults.headers.common["X-CSRFToken"] = csrfToken;
            console.log("CSRF token updated:", csrfToken);
        }
    } catch (error) {
        console.log("Failed to fetch CSRF token:", error);
    }
};
let cond = false;
api.interceptors.request.use(async (config) => {
    if (config.url === "/auth/csrf/") {
        return config;
    }
    if (!cond && !api.defaults.headers.common["X-CSRFToken"]) {
        cond = true;
        await getCSRF();
        return config;
    }
    return config;
});

export default api;
