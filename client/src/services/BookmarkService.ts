import { AxiosRequestConfig, AxiosResponse } from "axios";
import { authApi } from "../api";
import { ITrailer } from "../models/cinema";
import { BOOKMARK_ENDPOINT } from "../constants/endPoints";

export default class BookmarkService {
    static fetchBookmarks = async (config?: AxiosRequestConfig): Promise<AxiosResponse<ITrailer[]>> => {
        return authApi.get<ITrailer[]>(BOOKMARK_ENDPOINT, config);
    };
    static postBookmark = async (bookmark: ITrailer, config?: AxiosRequestConfig): Promise<AxiosResponse<ITrailer>> => {
        return authApi.post<ITrailer>(BOOKMARK_ENDPOINT, bookmark, config);
    };
    static deleteBookmark = async (id: string, config?: AxiosRequestConfig): Promise<AxiosResponse<void>> => {
        return authApi.delete<void>(`${BOOKMARK_ENDPOINT}/${id}`, config);
    };
}
