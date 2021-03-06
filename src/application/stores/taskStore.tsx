﻿import {RootStore} from "./rootstore";
import {action, makeObservable, observable, runInAction} from "mobx";
import {ITaskQueryValues, IPaginatedTaskResponse, ITask} from "../../infrastructure/models/task";
import {JobRequest} from "../api/agent";
import {toast} from "react-toastify";
import Alert from "../common/Alert";
import {CheckmarkIcon, CloseIcon} from "../../infrastructure/icons/Icons";
import React from "react";
import {alertErrors} from "../../infrastructure/utils/getErrors";
import {history} from "../../index";

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
    @observable taskQueryValues: ITaskQueryValues = {title: "", pageNumber: 1, pageSize: 20, maxPrice: 0, minPrice: 0, sortBy: undefined, category: undefined, deliveryType: undefined};
    @observable task: ITask | null = null;
    @observable watching = false;
    @observable deletingTask = false;
    
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
    
    @action setTasksQueryParams = (title?: string | undefined, maxPrice?: number | undefined, minPrice?: number | undefined, pageNumber?: number | undefined, pageSize?: number | undefined, sortBy?: string | undefined, category?: number | undefined, deliveryType?: number | undefined) => {
        this.taskQueryValues.title = title ? title : undefined;
        this.taskQueryValues.maxPrice = maxPrice ? maxPrice : 0;
        this.taskQueryValues.minPrice = minPrice ? minPrice : 0 ; 
        this.taskQueryValues.pageNumber = pageNumber ? pageNumber : 1;
        this.taskQueryValues.pageSize = pageSize ? pageSize : 20;
        this.taskQueryValues.sortBy = sortBy ? sortBy : undefined;
        this.taskQueryValues.category = category ? category : undefined;
        this.taskQueryValues.deliveryType = deliveryType ? deliveryType : undefined;
    }
    
    @action getTaskById = async (id: string) => {
        this.loadingInitial = true;
        try{
          const taskResponse = await JobRequest.getTaskById(id);
          runInAction(() => {
              this.task = taskResponse;
              if(this.rootStore.authStore.user?.id === this.task.creator.id){
                  this.task.isOwner = true;
              }
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
                    this.task.watchCount++;
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
                    this.task.watchCount--;
                }
                
                if(this.rootStore.profileStore.watchList){
                    this.rootStore.profileStore.watchList = this.rootStore.profileStore.watchList.filter(x => x.id !== taskId);
                }

                this.watching = false;
            })
        } catch(e){
            runInAction(() => this.watching = false);
            alertErrors(e);
            throw e;
        }
    }
    
    
    @action createTask = async (taskSubmission: FormData) => {
        try{
            await JobRequest.createTask(taskSubmission);
            toast.success(<Alert type="success" subject="Task created" icon={<CheckmarkIcon boxSize={8} color="#224a23" />} message="Your task has been created & activated" />)
        }catch (e) {
           alertErrors(e);
           throw e;
        }
    }
    
    @action deleteTask = async (taskId: string) => {
        this.deletingTask = true;
        try{
           await JobRequest.deleteTaskById(taskId);
           runInAction(() => {
               if(window.location.pathname.startsWith("/task")){
                   history.push("/");
               }
               
               if(window.location.pathname.startsWith("/profile")){
                   this.rootStore.profileStore.profileTasks = this.rootStore.profileStore.profileTasks!.filter(x => x.id != taskId); 
               }
               this.deletingTask = false;
           })
            toast.success(<Alert type="success" subject="Task deleted" icon={<CheckmarkIcon boxSize={8} color="#224a23" />} message="Your task was successfully deleted" />)
        }catch (e) {
            runInAction(() => this.deletingTask = false);
            alertErrors(e);
            throw e;
        }
    }
}