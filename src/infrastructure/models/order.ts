import {IUser} from "./auth";
import {ITask} from "./task";
import {OrderStatus} from "../enums/orderStatus";
import {IBid} from "./bid";
import {IChat} from "./chat";

export interface IOrder{
    id: string;
    orderNumber: string;
    user: IUser;
    payTo: IUser;
    job: ITask;
    orderPlacementDate: Date;
    paymentCompletedDate: Date;
    status: OrderStatus;
    orderBid: IBid;
    totalAmount: number;
    orderCompletedDate: Date;
    checkoutSessionId: string;
    orderStartedDate: Date;
    chat: IChat;
    isRunner: boolean;
}