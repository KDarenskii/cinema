import { AxiosRequestConfig, AxiosResponse } from "axios";
import { api } from "../api";
import { ICinema } from "../models/cinema";
import { CINEMA_ENDPOINT } from "../constants/endPoints";

export default class CinemaService {
    static fetchCinemaById = async (id: string, config?: AxiosRequestConfig): Promise<AxiosResponse<ICinema>> => {
        return api.get<ICinema>(`${CINEMA_ENDPOINT}/${id}`, config);
    }
}