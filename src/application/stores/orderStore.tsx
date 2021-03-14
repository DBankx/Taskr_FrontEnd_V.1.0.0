import {RootStore} from "./rootstore";
import {action, makeAutoObservable, observable, runInAction} from "mobx";
import {alertErrors} from "../../infrastructure/utils/getErrors";
import {OrderRequest} from "../api/agent";
import {IOrder, IReview} from "../../infrastructure/models/order";
import {OrderStatus} from "../../infrastructure/enums/orderStatus";
import {v4} from "uuid";

export class OrderStore{
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }
    
    @observable confirmingOrder = false;
    @observable payoutOrders: IOrder[] | null = null;
    @observable completedOrders: IOrder[] | null = null;
    @observable loadingOrders = false;
    @observable activeOrders : IOrder[] | null = null;
    @observable order : IOrder | null = null;
    @observable runnerOrders : IOrder[] | null = null;
    @observable loadingOrderAction = false;
    
    @action deleteOrderById = async (orderNumber: string) => {
        try{
            await OrderRequest.deleteOrderByNumber(orderNumber);
        } catch (e) {
           alertErrors(e);
           throw e;
        }
    }
    
    @action confirmOrderByNumber = async (orderNumber: string) => {
        this.confirmingOrder = true;
        try{
            await OrderRequest.confirmOrderByNumber(orderNumber);
            runInAction(() => {
                this.confirmingOrder = false;
            })
        }catch (e) {
            runInAction(() => this.confirmingOrder = false);
            alertErrors(e);
            throw e;
        }
    }
    
    @action getAllOrders = async (predicate: string) => {
        this.loadingOrders = true;
        try{
            const orders = await OrderRequest.getAllOrders(predicate);
            runInAction(() => {
                switch (predicate) {
                    case "ACTIVE":
                        this.activeOrders = orders;
                        break;
                    case "RUNNER":    
                        this.runnerOrders = orders;
                        break;
                    case "PAYOUT":
                        this.payoutOrders = orders;
                        break;
                    case "COMPLETED":
                        this.completedOrders = orders;
                        break;
                    default:
                        break;
                }
                this.loadingOrders = false;
            })
        }catch (e) {
           runInAction(() => this.loadingOrders = false);
           alertErrors(e);
           throw e;
        }
    }
    
    @action getOrderByNumber = async (orderNumber: string) => {
        this.loadingOrders = true;
        try{
            const order = await OrderRequest.getOrderByNumber(orderNumber);
            runInAction(() => {
                this.order = order;
                if(this.rootStore.authStore.user!.id === order.payTo.id){
                    this.order.isRunner = true;
                }
                this.loadingOrders = false;
            })
        }catch (e) {
            runInAction(() => this.loadingOrders = false);
            alertErrors(e);
            throw e;
        }
    }
    
    @action markOrderAsStarted = async (orderNumber: string) => {
        this.confirmingOrder = true;
        try{
            await OrderRequest.markOrderAsStarted(orderNumber);
            runInAction(() => {
                this.order!.status = OrderStatus.Started;
                this.order!.orderStartedDate = new Date();
                this.confirmingOrder = false;
            })
        }catch (e) {
           runInAction(() => this.confirmingOrder = false);
           alertErrors(e);
           throw e;
        }
    }
    
    @action requestPayout = async (orderNumber: string) => {
        this.loadingOrderAction = true;
        try{
            await OrderRequest.requestPayout(orderNumber);
            runInAction(() => {
                this.order!.status = OrderStatus.AwaitingPayout;
                this.loadingOrderAction = false;
            })
        }catch(error){
            runInAction(() => this.loadingOrderAction = false);
            alertErrors(error);
            throw error;
        }
    }

    @action rejectPayout = async (orderNumber: string) => {
        this.loadingOrderAction = true;
        try{
            await OrderRequest.rejectPayout(orderNumber);
            runInAction(() => {
                this.order!.status = OrderStatus.Started;
                this.loadingOrderAction = false;
            })
        }catch(error){
            runInAction(() => this.loadingOrderAction = false);
            alertErrors(error);
            throw error;
        }
    }

    @action acceptPayout = async (orderNumber: string) => {
        this.loadingOrderAction = true;
        try{
            await OrderRequest.acceptPayout(orderNumber);
            runInAction(() => {
                this.order!.status = OrderStatus.Completed;
                this.order!.orderCompletedDate = new Date();
                this.loadingOrderAction = false;
            })
        }catch(error){
            runInAction(() => this.loadingOrderAction = false);
            alertErrors(error);
            throw error;
        }
    }
    
    @action addReview = async (values: any, orderId: string) => {
        try{
            await OrderRequest.addReview(values, orderId);
            runInAction(() => {
                const review: IReview = {
                    reviewer: this.rootStore.authStore.user!,
                    id: v4(),
                    job: this.order!.job,
                    postedAt: new Date(),
                    rating: values.rating,
                    text: values.text
                };
                this.order!.reviews.push(review)
            })
        }catch (error) {
            alertErrors(error);
            throw error;
        }
    }
}