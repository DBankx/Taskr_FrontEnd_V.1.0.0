export interface ISignInFormValues{
    email: string;
    password: string;
}

export interface ISignUpFormValues{
    country: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    username: string;
    confirmPassword: string;
}

export interface IAuthSuccessResponse {
    token: string;
    user: IUser;
}

export interface IUser{
    id: string;
    username: string;
    userName: string;
    email: string;
    bio: string;
    firstName: string;
    lastName: string;
    city: string;
    createdAt: Date;
    avatar: string;
    hasUnReadNotifications: boolean;
    hasActiveBankAccount: boolean;
}