import {RootStore} from "./rootstore";
import {action, makeObservable, observable, runInAction} from "mobx";
import {ITask} from "../../infrastructure/models/task";
import {profileRequest} from "../api/agent";
import {alertErrors} from "../../infrastructure/utils/getErrors";
import {TaskStatus} from "../../infrastructure/enums/taskStatus";
import {IPrivateProfile} from "../../infrastructure/models/profile";

export class ProfileStore{
    rootStore: RootStore
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeObservable(this);
    }
    
    @observable profileActiveTasks : ITask[] | null = null;
    @observable profileInactiveTasks : ITask[] | null = null; 
    @observable loadingInitial = false;
    @observable privateProfile : IPrivateProfile | null = null;
    
    
    @action getProfileTasks = async (taskStatus: TaskStatus) => {
        this.loadingInitial = true;
        try{
            const tasks = await profileRequest.getAllTasks(taskStatus);
            runInAction(() => {
                switch (taskStatus) {
                    case TaskStatus.Active:
                        this.profileActiveTasks = tasks;
                        break;
                    case TaskStatus.InActive:
                        this.profileInactiveTasks = tasks;
                        break;
                    default:
                        break;
                }
                this.loadingInitial = false;
            })
        }catch (errors) {
            runInAction(() => this.loadingInitial = false);
            alertErrors(errors);
            throw errors;
        }
    }
    
    @observable getPrivateProfile = async () => {
        this.loadingInitial = true;
        try{
           const profile = await profileRequest.getProfile();
           runInAction(() => {
               this.privateProfile = profile;
               this.loadingInitial = false;
           })
        }catch (e) {
            runInAction(() => this.loadingInitial = false);
            alertErrors(e);
            throw e;
        }
    }
    
}