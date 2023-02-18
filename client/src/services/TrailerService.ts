import { AxiosRequestConfig, AxiosResponse } from "axios";
import { api } from "../api";
import { ITrailer } from "../models/cinema";

export default class TrailerService {
    static fetchTrailers = async (config?: AxiosRequestConfig): Promise<AxiosResponse<ITrailer[]>> => {
        return api.get<ITrailer[]>("trailers", config);
    }
    static fetchTrailerById = async (id: string, config?: AxiosRequestConfig): Promise<AxiosResponse<ITrailer>> => {
        return api.get<ITrailer>("trailers/" + id, config);
    }
}