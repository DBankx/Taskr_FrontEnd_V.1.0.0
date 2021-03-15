
// TODO - ADD REVIEWS
import {ExperienceLevel} from "../enums/skill";
import {IReview} from "./order";

export interface IPrivateProfile{
    id: string;
    firstName: string;
    lastName: string;
    bio: string;
    city: string;
    createdAt: Date;
    avatar: string;
    email: string;
    username: string;
    languages: ILanguage[],
    skillSet: ISkill[],
    tagline: string;
    socials: ISocials;
    emailConfirmed: boolean;
    bankAccount: IBankAccount;
}

export interface IPublicProfile{
    id: string;
    bio: string;
    city: string;
    createdAt: Date;
    avatar: string;
    email: string;
    username: string;
    languages: ILanguage[],
    skillSet: ISkill[],
    tagline: string;
    socials: ISocials; 
    isUser: boolean;
}

export interface ISocials{
    twitter: string;
    instagram: string;
    pinterest: string;
    facebook: string;
}

export interface ISkill {
    skillName: string;
    experienceLevel: ExperienceLevel;
}


export interface ILanguage{
    languageName: string;
    experienceLevel: ExperienceLevel;
}

export interface IBankAccount{
    id: string;
    accountNumber: string;
    accountHolderName: string;
    accountHolderType: string;
    bankName: string;
    routingNumber: string;
}

export interface IReturnReviews{
    avgReviews: number;
    reviewsCount: number;
    reviews: IReview[];
}