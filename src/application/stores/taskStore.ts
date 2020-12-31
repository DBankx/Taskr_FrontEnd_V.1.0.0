import {RootStore} from "./rootstore";
import {action, makeObservable, observable, runInAction} from "mobx";
import {ITaskQueryValues, IPaginatedTaskResponse} from "../../infrastructure/models/task";
import {JobRequest} from "../api/agent";

//---------------------------------------------------------
// Store for all Job related actions
//---------------------------------------------------------

export class TaskStore{
    rootStore: RootStore
    constructor(rootStore: RootStore) {
        makeObservable(this);
        this.rootStore = rootStore;
    }
    
    @observable tasks: IPaginatedTaskResponse | null = null;
    @observable loadingInitial = false;
    @observable taskQueryValues: ITaskQueryValues = {title: "", pageNumber: 1, pageSize: 20, maxPrice: 0, minPrice: 0};
    
    
    // ------------------------
    // Actions
    // ------------------------
    
    @action getAllJobs = async () => {
        this.loadingInitial = true;
        try{
            const paginatedJobResponse = await JobRequest.getAllJobs(this.taskQueryValues);
            runInAction(() => {
                this.tasks = paginatedJobResponse;
                this.loadingInitial = false;
            })
        }catch (e) {
            runInAction(() => this.loadingInitial = false);
            console.log(e);
        }
    }
    
    @action setJobQueryParams = (title?: string, maxPrice?: number, minPrice?: number, pageNumber?: number, pageSize?: number) => {
        if(title) this.taskQueryValues.title = title;
        if(maxPrice) this.taskQueryValues.maxPrice = maxPrice;
        if(minPrice) this.taskQueryValues.minPrice = minPrice;
        if(pageNumber) this.taskQueryValues.pageNumber = pageNumber;
        if(pageSize) this.taskQueryValues.pageSize = pageSize;
    }
    
    
}