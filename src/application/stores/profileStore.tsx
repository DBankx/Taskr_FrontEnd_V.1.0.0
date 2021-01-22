import {RootStore} from "./rootstore";
import {action, makeObservable, observable, runInAction} from "mobx";
import {ITask} from "../../infrastructure/models/task";
import {profileRequest} from "../api/agent";
import {alertErrors} from "../../infrastructure/utils/getErrors";

export class ProfileStore{
    rootStore: RootStore
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeObservable(this);
    }
    
    @observable profileActiveTasks : ITask[] | null = null;
    @observable profileInactiveTasks : ITask[] | null = null; 
    @observable loadingInitial = false;
    
    
    @action getProfileTasks = async (predicate: string) => {
        this.loadingInitial = true;
        try{
            const tasks = await profileRequest.getAllTasks(predicate);
            runInAction(() => {
                switch (predicate) {
                    case "active":
                        this.profileActiveTasks = tasks;
                        break;
                    case "inactive":
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
    
}