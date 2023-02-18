import { AxiosRequestConfig, AxiosResponse } from "axios";
import { api } from "../api";
import { ICinema } from "../models/cinema";

export default class CinemaService {
    static fetchCinemaById = async (id: string, config?: AxiosRequestConfig): Promise<AxiosResponse<ICinema>> => {
        return api.get<ICinema>("cinemaDescriptions/" + id, config);
    }
}