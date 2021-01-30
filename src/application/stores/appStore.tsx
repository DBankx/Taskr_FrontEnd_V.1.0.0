import {RootStore} from "./rootstore";
import {action, makeObservable, observable} from "mobx";
// import React from "react";
import {HubConnection, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import {INotification} from "../../infrastructure/models/notification";
import {toast} from "react-toastify";

//-----------------------------------------------
// General store for application
//------------------------------------------------

export class AppStore{
    rootStore: RootStore
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeObservable(this);
    }
    
    @observable.ref notificationHubConnection : HubConnection | null = null;
    @observable appLoaded = false;
    @observable uploadedTaskFormFiles : any[] = [];
    
    
    @action createNotificationHubConnection = () => {
        this.notificationHubConnection = new HubConnectionBuilder().withUrl("https://localhost:5001/notif", {
            accessTokenFactory : () => this.rootStore.authStore.token!
        }).configureLogging(LogLevel.Information).withAutomaticReconnect().build();
        
        // start the connection
        this.notificationHubConnection.start().then(() => console.log(this.notificationHubConnection!.state))
        
        this.notificationHubConnection.on("ReceiveNotification", (notification: INotification) => {
                toast(notification.message, {
                    position: "top-right",
                    className: "notification"
                })
        });
    }
    
    @action stopHubConnection = () => {
        this.notificationHubConnection!.stop().catch((err) => console.log(err));
    }
    
    @action setAppLoaded = () => {
        this.appLoaded = true;
    }
    
    @action setPreviewImages = (files: any) => {
        this.uploadedTaskFormFiles = files;
    }
    
   @action removePreviewImages = () => {
        this.uploadedTaskFormFiles = [];
   } 
}