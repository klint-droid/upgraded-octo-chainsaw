import axios from "axios";

const envApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim().replace(/\/$/, "") || undefined;
const apiBaseUrl = import.meta.env.DEV ? undefined : envApiBaseUrl;

export const apiClient = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        "Accept": "application/json"
    }
});
