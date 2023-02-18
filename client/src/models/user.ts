export interface IUser {
    nickname: string;
    email: string;
    id: string;
    roles: number[];
}

export interface ICredentials extends IUser {
    password: string;
}

export type TLoginCredentials = Pick<ICredentials, "email" | "password">