import {RootStore} from "./rootstore";
import {action, makeObservable, observable, runInAction} from "mobx";
import {ITask} from "../../infrastructure/models/task";
import {profileRequest} from "../api/agent";
import {alertErrors} from "../../infrastructure/utils/getErrors";
import {TaskStatus} from "../../infrastructure/enums/taskStatus";
import {ILanguage, IPrivateProfile, ISkill, ISocials,} from "../../infrastructure/models/profile";
import {toast} from "react-toastify";
import {CheckmarkIcon} from "../../infrastructure/icons/Icons";
import Alert from "../common/Alert";
import React from "react";
import {IPaginatedNotificationsResponse} from "../../infrastructure/models/notification";
import {NotificationStatus} from "../../infrastructure/enums/notification";

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
    @observable userNotifications : IPaginatedNotificationsResponse | null = null;
    
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
    
    @observable addProfileSkills = async (values: ISkill) => {
        try{
            await profileRequest.addProfileSkills(values);
            runInAction(() => {
                this.privateProfile!.skillSet.unshift(values);
                toast.success(<Alert type="success" subject="Skills Updated" icon={<CheckmarkIcon boxSize={8} color="#224a23" />} message="" />)
            })
        }catch (e){
            alertErrors(e);
            throw e;
        }
    }

    @observable addProfileLanguages = async (values: ILanguage) => {
        try{
            await profileRequest.addProfileLanguages(values);
            runInAction(() => {
                this.privateProfile!.languages.unshift(values);
                toast.success(<Alert type="success" subject="Languages Updated" icon={<CheckmarkIcon boxSize={8} color="#224a23" />} message="" />)
            })
        }catch (e){
            alertErrors(e);
            throw e;
        }
    }
    
    @observable updateProfile = async (values: any) => {
        try{
            await profileRequest.updateProfile(values);
            runInAction(() => {
                if(values.description){
                    this.privateProfile!.bio = values.description;
                }
                if(values.tagline){
                    this.privateProfile!.tagline = values.tagline;
                }
                

                toast.success(<Alert type="success" subject="Profile Updated" icon={<CheckmarkIcon boxSize={8} color="#224a23" />} message="" />)
            })
        }catch(e){
            alertErrors(e);
            throw e;
        }
    }
    
    @action updateSocials = async (values: ISocials) => {
        try{
            await profileRequest.updateSocials(values);
            runInAction(() => {
                if(values.twitter){
                    this.privateProfile!.socials.twitter = values.twitter;
                }
                if(values.instagram){
                    this.privateProfile!.socials.instagram = values.instagram;
                }
                if(values.facebook){
                    this.privateProfile!.socials.facebook = values.facebook;
                }
                if(values.pinterest){
                    this.privateProfile!.socials.pinterest = values.pinterest;
                }

                toast.success(<Alert type="success" subject="Socials Updated" icon={<CheckmarkIcon boxSize={8} color="#224a23" />} message="" />)
            })
        }catch(e){
            alertErrors(e);
            throw e;
        }
    }
    
    @action getUserNotifications = async (status?: NotificationStatus) => {
        this.loadingInitial = true;
        try{
           const notifs = await profileRequest.getNotifications(status);
           runInAction(() => {
               this.userNotifications = notifs;
               this.loadingInitial = false;
           })
        }catch (e) {
            runInAction(() => this.loadingInitial = false);
            alertErrors(e);
            throw e;
        }
    }
    
    @action readNotification = async (notificationId: string) => {
        try{
            await profileRequest.markNotificationAsRead(notificationId);
            runInAction(() => {
                const notif = this.userNotifications?.data.find(x => x.id == notificationId);
                notif!.status = NotificationStatus.Read;
            })
        }catch (errors){
            alertErrors(errors);
            throw errors;
        }
    }
    
    @action deleteNotification = async (notificationId: string) => {
        try{
            await profileRequest.deleteNotification(notificationId);
            runInAction(() => {
               this.userNotifications!.data = this.userNotifications!.data.filter(x => x.id !== notificationId); 
            })
        }catch (errors){
            alertErrors(errors);
            throw errors;
        } 
    }
    
    @action markAllNotificationsAsRead = async () => {
        try{
            await profileRequest.markAllNotificationsAsRead();
            runInAction(() => {
               this.userNotifications?.data.forEach((notification) => {
                   notification.status = NotificationStatus.Read;
               }) 
                this.rootStore.authStore.user!.hasUnReadNotifications = false;
            })
        }catch (errors){
            alertErrors(errors);
            throw errors;
        }
    }
    
    @action deleteAllNotifications = async () => {
        try{
            await profileRequest.deleteAllNotifications();
            runInAction(() => {
                this.userNotifications!.data = [];
            })
        }catch(errors){
            alertErrors(errors);
            throw errors;
        }
    }
    
}