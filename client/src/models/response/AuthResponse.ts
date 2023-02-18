import { IUser } from "../user";

export interface IAuthResponse {
    accessToken: string;
    user: IUser;
}
