import {IPhoto} from "./task";
import {IUser} from "./auth";

export interface IChat{
    id: string;
    jobTitle: string;
    jobBudget: string;
    jobPhotos: IPhoto[];
    createdAt: Date;
    taskr: IUser;
    runner: IUser;
    newestMessage: string;
    messages: IUser;
}

export interface IMessage{
    text: string;
    sentAt: Date;
    sender: IUser;
}