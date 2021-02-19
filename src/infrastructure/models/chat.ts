import {IPhoto} from "./task";
import {IUser} from "./auth";

export interface IChat{
    id: string;
    jobTitle: string;
    jobId: string;
    jobBudget: string;
    jobPhotos: IPhoto[];
    createdAt: Date;
    taskr: IUser;
    runner: IUser;
    newestMessage: string;
    messages: IMessage[];
    runnerId: string;
    taskrId: string;
}

export interface IMessage{
    id: string;
    text: string;
    sentAt: Date;
    sender: IUser;
    outgoing: boolean;
}