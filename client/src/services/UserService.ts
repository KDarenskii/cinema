import { AxiosRequestConfig, AxiosResponse } from "axios";
import { api, authApi } from "../api";
import { IAuthResponse } from "../models/response/AuthResponse";
import { ICredentials, TLoginCredentials } from "../models/user";
import { LOGIN_ENDPOINT, USER_ENDPOINT } from "../constants/endPoints";

export default class UserService {
    static loginUser = async (credentials: TLoginCredentials, config?: AxiosRequestConfig): Promise<AxiosResponse<IAuthResponse>> => {
        return api.post<IAuthResponse>(LOGIN_ENDPOINT, credentials, config);
    }

    static refreshUser = async (config?: AxiosRequestConfig): Promise<AxiosResponse<void>> => {
        return authApi.get<void>("refresh", config);
    }

    static registerUser = async (credentials: ICredentials, config?: AxiosRequestConfig): Promise<AxiosResponse<IAuthResponse>> => {
        return api.post<IAuthResponse>(USER_ENDPOINT, credentials, config);
    }
}