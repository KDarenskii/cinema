import { AxiosRequestConfig, AxiosResponse } from "axios";
import { api } from "../api";
import { ITrailer } from "../models/cinema";
import { TRAILER_ENDPOINT } from "../constants/endPoints";

export default class TrailerService {
    static fetchTrailers = async (config?: AxiosRequestConfig): Promise<AxiosResponse<ITrailer[]>> => {
        return api.get<ITrailer[]>(TRAILER_ENDPOINT, config);
    }
    static fetchTrailerById = async (id: string, config?: AxiosRequestConfig): Promise<AxiosResponse<ITrailer>> => {
        return api.get<ITrailer>(`${TRAILER_ENDPOINT}/${id}`, config);
    }
}