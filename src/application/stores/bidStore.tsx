import {RootStore} from "./rootstore";
import {action, makeObservable, observable, runInAction} from "mobx";
import {IBid, IBidSubmission} from "../../infrastructure/models/bid";
import {toast} from "react-toastify";
import {CheckmarkIcon, CloseIcon} from "../../infrastructure/icons/Icons";
import Alert from "../common/Alert";
import React from "react";
import {BidRequest} from "../api/agent";
import {alertErrors} from "../../infrastructure/utils/getErrors";
import {BidStatus} from "../../infrastructure/enums/bid";
import {IOrder} from "../../infrastructure/models/order";

export class BidStore{
    rootStore: RootStore
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeObservable(this);
    }
    
   @observable bid: IBid | null = null;
   @observable bids: IBid[] | null = null; 
   @observable loadingInitialBids = false; 
   @observable loadingBid = false;
   @observable markingBidAsSeen = false;
   @observable order: IOrder | null = null;
   @observable acceptingBid = false;
    
    // Actions
    @action createBid = async (values: IBidSubmission, jobId: string) => {
        try{
            const bid = await BidRequest.placeBid(values, jobId);
            runInAction(() => {
                this.bid = bid;
                if(this.rootStore.taskStore.task) {
                    this.rootStore.taskStore.task.bidsCount += 1;
                    this.rootStore.taskStore.task.isBidActive = true;
                }
                if(this.rootStore.bidStore.bids){
                    // find if a bid by the user exists
                    const userBid = this.rootStore.bidStore.bids.find((bid) => bid.userName === this.rootStore.authStore.user!.username);
                    if(userBid){
                        userBid.price = bid.price;
                        userBid.createdAt = bid.createdAt;
                    } else {
                        this.rootStore.bidStore.bids.unshift(bid);
                    }
                }
                toast.success(<Alert type="success" subject="Success" icon={<CheckmarkIcon boxSize={8} color="#224a23" />} message="Successfully placed a bid" />);
            })
        }catch(error){
            toast.error(<Alert type="error" subject="Error occurred" icon={<CloseIcon boxSize={8} color="#73000c"/>} message="Error occurred while submitting bid" />);
            throw error;
        }
    }
    
    @action getTaskBids = async (taskId: string) => {
        this.loadingInitialBids = true;
        try{
            const taskBids = await BidRequest.getAllTaskBids(taskId);
            runInAction(() => {
                this.bids = taskBids;
                this.loadingInitialBids = false;
            })
        }catch (error) {
            runInAction(() => this.loadingInitialBids = false);
            toast.error(<Alert type="error" subject="Error occurred" icon={<CloseIcon boxSize={8} color="#73000c"/>} message="Problem loading task bids" />)
            throw error;
        }
    }
    
    @action getBidById = async (bidId: string) => {
        this.loadingBid = true;
        try{
            const bid = await BidRequest.getBidById(bidId);
            runInAction(() => {
                this.bid = bid;
                this.loadingBid = false;
            })
        }catch(errors){
            runInAction(() => this.loadingBid = false);
            alertErrors(errors);
            throw errors;
        }
    }
    
    
    @action markBidAsSeen = async (bidId: string) => {
        this.markingBidAsSeen = true;
        try{
            await BidRequest.markBidAsSeen(bidId);
            runInAction(() => {
                this.bid!.status = BidStatus.Seen;
                if(this.bids){
                    const bid = this.bids.find(x => x.id === bidId);
                    bid!.status = BidStatus.Seen;
                }
                this.markingBidAsSeen = false;
            })
        } catch(errors){
            runInAction(() => this.markingBidAsSeen = false);
            alertErrors(errors);
            throw errors;
        }
    }
    
    @action acceptBidAndPay = async (bidId: string, jobId: string) => {
        this.acceptingBid = true;
        try{
            const order = await BidRequest.AcceptBidAndPay(bidId, jobId);
            runInAction(() => {
                this.order = order;
                this.acceptingBid = false;
            })
        }catch (e) {
            runInAction(() => this.acceptingBid = false);
           alertErrors(e);
           throw e;
        }
    }
}