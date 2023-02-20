import { AxiosRequestConfig, AxiosResponse } from "axios"
import { api } from "../api"
import { ITrailer } from "../models/cinema";
import { TREND_ENDPOINT } from "../constants/endPoints";

export default class TrendsService {
    static fetchTrends = async (config?: AxiosRequestConfig): Promise<AxiosResponse<ITrailer[]>> => {
        return api.get<ITrailer[]>(TREND_ENDPOINT, config);
    }
} 