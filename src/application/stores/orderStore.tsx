import {RootStore} from "./rootstore";
import {action, makeAutoObservable, observable, runInAction} from "mobx";
import {alertErrors} from "../../infrastructure/utils/getErrors";
import {OrderRequest} from "../api/agent";
import {IOrder} from "../../infrastructure/models/order";
import {OrderStatus} from "../../infrastructure/enums/orderStatus";

export class OrderStore{
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }
    
    @observable confirmingOrder = false;
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
                this.order!.orderStartedDate = new Date(Date.now());
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
                this.order!.status = OrderStatus.Confirmed;
            })
        }catch(error){
            runInAction(() => this.loadingOrderAction = false);
            alertErrors(error);
            throw error;
        }
    }
}