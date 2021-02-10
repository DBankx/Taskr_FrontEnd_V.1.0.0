
// TODO - ADD REVIEWS
import {ExperienceLevel} from "../enums/skill";

export interface IPrivateProfile{
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


