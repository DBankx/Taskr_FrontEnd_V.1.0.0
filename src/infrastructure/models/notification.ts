import {NotificationStatus, NotificationType} from "../enums/notification";

export interface INotification{
    toUserId: string;
    fromUserId: string;
    fromUserName: string 
    fromUserAvatar : string; 
    message: string;
    notificationStatus : NotificationStatus;
    CreatedAt : Date; 
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