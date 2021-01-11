import {RootStore} from "./rootstore";
import {action, makeObservable, observable, runInAction} from "mobx";
import {IBid, IBidSubmission} from "../../infrastructure/models/bid";
import { toast } from "react-toastify";
import {CheckmarkIcon, CloseIcon} from "../../infrastructure/icons/Icons";
import Alert from "../common/Alert";
import React from "react";
import {BidRequest} from "../api/agent";

export class BidStore{
    rootStore: RootStore
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeObservable(this);
    }
    
   @observable bid: IBid | null = null;
   @observable bids: IBid[] | null = null; 
   @observable loadingInitialBids = false; 
    
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
    
}