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
    
    
    // Actions
    @action createBid = async (values: IBidSubmission, jobId: string) => {
        try{
            const bid = await BidRequest.placeBid(values, jobId);
            runInAction(() => {
                this.bid = bid;
                if(this.rootStore.jobStore.task) this.rootStore.jobStore.task.bidsCount += 1; 
                toast.success(<Alert type="success" subject="Success" icon={<CheckmarkIcon boxSize={8} color="#224a23" />} message="Successfully placed a bid" />);
            })
        }catch(error){
            toast.error(<Alert type="error" subject="Error occurred" icon={<CloseIcon boxSize={8} color="#73000c"/>} message="Error occurred while submitting bid" />);
            throw error;
        }
    }
    
}