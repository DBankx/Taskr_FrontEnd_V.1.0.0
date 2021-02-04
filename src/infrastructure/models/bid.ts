import {IUser} from "./auth";
import {BidStatus} from "../enums/bid";

export interface IBidSubmission{
    description?: string;
    price: number;
}

export interface IBid{
    id: string;
    description: string;
    jobId: string;
    price: number;
    createdAt: Date;
    status: BidStatus;
    userName: string;
    avatar: string;
    bidCreator: IUser
}