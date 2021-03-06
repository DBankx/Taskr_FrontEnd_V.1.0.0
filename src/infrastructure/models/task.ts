﻿import {IUser} from "./auth";
import {Category} from "../enums/category";
import {DeliveryTypes} from "../enums/deliveryTypes";
import {TaskStatus} from "../enums/taskStatus";
import {IBid} from "./bid";

export interface ITask{
    id: string;
    title: string;
    description: string;
    initialPrice: number;
    createdAt: Date;
    deliveryDate: Date;
    photos: IPhoto[];
    address: string;
    postCode: string;
    views: number;
    bidsCount: number;
    watchCount: number;
    creator: IUser;
    isBidActive: boolean;
    isWatching: boolean;
    deliveryType: number;
    category: number;
    isOwner: boolean;
    isChatActive: boolean;
    jobStatus: TaskStatus;
    assignedUser: IUser;
    acceptedBid: IBid;
}

export interface IPhoto{
    id: string;
    url: string;
}

export interface IPaginatedTaskResponse{
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
    data: ITask[]
}

export interface ITaskQueryValues{
    title?: string;
    minPrice: number;
    maxPrice: number;
    pageSize: number;
    pageNumber: number;
    city?: string;
    category?: Category;
    sortBy?: string;
    deliveryType?: DeliveryTypes;
} 

export interface ITaskSubmission{
    id: string;
    title: string;
    price: number;
    imageFiles: Blob[];
    category: number;
    deliveryType: number;
    address: string;
    postCode: string;
    deliveryDate: string;
    description: string;
}