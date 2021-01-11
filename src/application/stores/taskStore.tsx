import {RootStore} from "./rootstore";
import {action, makeObservable, observable, runInAction} from "mobx";
import {ITaskQueryValues, IPaginatedTaskResponse, ITask} from "../../infrastructure/models/task";
import {JobRequest} from "../api/agent";
import {toast} from "react-toastify";
import Alert from "../common/Alert";
import {CloseIcon} from "../../infrastructure/icons/Icons";
import React from "react";
import {alertErrors} from "../../infrastructure/utils/getErrors";

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
    @observable task: ITask | null = null;
    @observable watching = false;
    
    // ------------------------
    // Actions
    // ------------------------
    
    @action getAllJobs = async () => {
        this.loadingInitial = true;
        try{
            const paginatedJobResponse = await JobRequest.getAllTasks(this.taskQueryValues);
            runInAction(() => {
                this.tasks = paginatedJobResponse;
                this.loadingInitial = false;
            })
        }catch (e) {
            runInAction(() => this.loadingInitial = false);
            toast.error(<Alert type="error" subject="Error occurred" icon={<CloseIcon boxSize={8} color="#73000c"/>} message="Problem loading tasks" />)
            throw e;
        }
    }
    
    @action setTasksQueryParams = (title?: string, maxPrice?: number, minPrice?: number, pageNumber?: number, pageSize?: number) => {
        this.taskQueryValues.title = title ? title : "";
        this.taskQueryValues.maxPrice = maxPrice ? maxPrice : 0;
        this.taskQueryValues.minPrice = minPrice ? minPrice : 0 ; 
        this.taskQueryValues.pageNumber = pageNumber ? pageNumber : 1;
        this.taskQueryValues.pageSize = pageSize ? pageSize : 20;
    }
    
    @action getTaskById = async (id: string) => {
        this.loadingInitial = true;
        try{
          const taskResponse = await JobRequest.getTaskById(id);
          runInAction(() => {
              this.task = taskResponse;
              this.loadingInitial = false;
          })
        } catch (error) {
            runInAction(() => this.loadingInitial = false);
            toast.error(<Alert type="error" subject="Error occurred" icon={<CloseIcon boxSize={8} color="#73000c"/>} message="Problem loading task" />)
            throw error;
        }
    }
    
    @action watchTask = async (taskId: string) => {
        this.watching = true;
        try{
            await JobRequest.watchTask(taskId);
            await runInAction(async () => {
                if(this.tasks){
                    const watchedTask = await this.tasks.data.find((task) => task.id === taskId);
                    if(watchedTask !== undefined){
                        watchedTask.isWatching = true;
                    }
                }
                if(this.task){
                    this.task.isWatching = true;
                }
                
                this.watching = false;
            })
        } catch(e){
            runInAction(() => this.watching = false);
            alertErrors(e);
            throw e;
        }
    }

    @action unWatchTask = async (taskId: string) => {
        this.watching = true;
        try{
            await JobRequest.unwatchTask(taskId);
            await runInAction(async () => {
                if(this.tasks){
                    const watchedTask = await this.tasks.data.find((task) => task.id === taskId);
                    if(watchedTask !== undefined){
                        watchedTask.isWatching = false;
                    }
                }
                if(this.task){
                    this.task.isWatching = false;
                }

                this.watching = false;
            })
        } catch(e){
            runInAction(() => this.watching = false);
            alertErrors(e);
            throw e;
        }
    }
    
}