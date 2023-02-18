import { AxiosRequestConfig, AxiosResponse } from "axios";
import { api } from "../api"
import { IActor } from "../models/actor";

export default class ActorService {
    static fetchActortById = async (id: string, config?: AxiosRequestConfig): Promise<AxiosResponse<IActor>> => {
        return api.get<IActor>("actors/" + id, config);
    }
}