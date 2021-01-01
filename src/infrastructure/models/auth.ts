export interface ISignInFormValues{
    email: string;
    password: string;
}

export interface IAuthSuccessResponse {
    token: string;
    user: IUser;
}

export interface IUser{
    id: string;
    username: string;
    email: string;
    bio: string;
    firstName: string;
    lastName: string;
    city: string;
    createdAt: Date;
    avatar: string;
}