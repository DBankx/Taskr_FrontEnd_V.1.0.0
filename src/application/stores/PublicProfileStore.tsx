import {RootStore} from "./rootstore";
import {action, makeObservable, observable, runInAction} from "mobx";
import {IPublicProfile} from "../../infrastructure/models/profile";
import {alertErrors} from "../../infrastructure/utils/getErrors";
import {PublicProfileRequest} from "../api/agent";
import {ITask} from "../../infrastructure/models/task";

export class PublicProfileStore {
    rootStore: RootStore

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeObservable(this);
    }
    
    @observable loadingProfileDetails  = false;
    @observable publicProfileDetails : IPublicProfile | null = null;
    @observable publicProfileTasks : ITask[] | null = null;
    @observable loadingProfileTasks = false;
    
    @action getPublicProfileDetails = async (userId: string) => {
        this.loadingProfileDetails = true;
        try{
            const details = await PublicProfileRequest.getPublicProfileDetails(userId);
            runInAction(() => {
                this.publicProfileDetails = details;
                if(this.rootStore.authStore.user?.id === this.publicProfileDetails.id){
                    this.publicProfileDetails.isUser = true;
                }
                this.loadingProfileDetails = false;
            })
        }catch (e) {
           runInAction(() => this.loadingProfileDetails = false);
           alertErrors(e);
           throw e;
        }
    }
    
    @action getPublicProfileTasks = async (userId: string) => {
        this.loadingProfileTasks = true;
        try{
            const tasks = await PublicProfileRequest.getPublicProfileTasks(userId);
            runInAction(() => {
                this.publicProfileTasks = tasks;
                this.loadingProfileTasks = false;
            })
        }catch (e) {
           runInAction(() => this.loadingProfileTasks = false);
           alertErrors(e);
           throw e;
        }
    }
}