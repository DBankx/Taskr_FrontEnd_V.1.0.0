import {NotificationStatus, NotificationType} from "../enums/notification";

export interface INotification{
    id: string;
    toUserId: string;
    fromUserId: string;
    fromUserName: string 
    fromUserAvatar : string; 
    message: string;
    status : NotificationStatus;
    createdAt : Date; 
    type : NotificationType;
    notifierObjectId : string;
}

export interface IPaginatedNotificationsResponse{
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
    data: INotification[];
}