﻿import {RootStore} from "./rootstore";
import {action, makeObservable, observable, runInAction} from "mobx";
import {IChat} from "../../infrastructure/models/chat";
import {alertErrors} from "../../infrastructure/utils/getErrors";
import {ChatRequest} from "../api/agent";
import {HubConnection, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import {toast} from "react-toastify";

export class ChatStore{
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeObservable(this);
    }
    
    @observable loadingChats = false;
    @observable chatsAsTaskr : IChat[] | null = null;
    @observable chatsAsRunner : IChat[] | null = null;
    @observable loadingChat = false;
    @observable chat : IChat | null = null;
    @observable.ref hubConnection: HubConnection | null = null;
    @observable chatTarget = "";
    @observable deletingChat = false;

    // creating a new hub connnection
    @action createHubConnection = (chatId: string) => {
        this.hubConnection = new HubConnectionBuilder().withUrl("https://localhost:44351/message", {
            // pass the token from the user store to the server hub
            accessTokenFactory: () => this.rootStore.authStore.token!
        }).configureLogging(LogLevel.Information).build();

        // start the connection
        this.hubConnection.start().then(() => console.log(this.hubConnection!.state)).then(() => {
            // connect to the activity group using the id
            console.log("Attempting to join group");
            this.hubConnection!.invoke("AddToChat", chatId);
        }).catch(error => console.log("error establishing connection", error));

        this.hubConnection.on("ReceiveMessage", message => {
            runInAction(() => {
                this.chat!.messages.push(message);
            })
            document.getElementById("messagesEnd")!.scrollIntoView({ behavior: "smooth" });
        })

        this.hubConnection.on("Send", message => {
            toast.info(message);
        })
    }

    @action stopHubConnection = () => {
        this.hubConnection!.invoke("RemoveFromChat", this.chat!.id).then(() =>
            this.hubConnection!.stop()).then(() => console.log("Connection stopped")).catch((err) => console.log(err))
    }
    
    @action sendMessage = async (values: any) => {
        const messageData = {
            text: values.text,
            receiverId: this.chat!.taskrId === this.rootStore.authStore.user!.id ? this.chat!.runner.id : this.chat!.taskr.id,
            chatId: this.chat!.id
        };
        try{
            const message = await this.hubConnection!.invoke("SendMessage", messageData);
            console.log(message);
        }catch (e){
            console.log(e);
        }
    }
    
    @action getAllChats = async (predicate: string) => {
        this.loadingChats = true;
        try{
            const chats = await ChatRequest.getAllChats(predicate);
            runInAction(() => {
                switch (predicate){
                    case "AsTaskr":
                        this.chatsAsTaskr = chats;
                        break;
                    case "AsRunner":
                        this.chatsAsRunner = chats;
                        break;
                    default:
                        break;
                }
                this.loadingChats = false;
            })
        }catch (e) {
           runInAction(() => this.loadingChats = false);
           alertErrors(e);
           throw e;
        }
    }
    
    @action getChatById = async (chatId: string) => {
        this.loadingChat = true;
        try{
            const chat = await ChatRequest.getChatById(chatId);
            runInAction(() => {
                this.chat = chat;
                this.loadingChat = false;
            })
            return this.chat;
        }catch (e) {
           runInAction(() => this.loadingChat = false);
           alertErrors(e);
           throw e;
        }
    }
    
    @action startChatWithUser = async (jobId: string, taskrId: string, values: any) => {
        try{
            await ChatRequest.createChat(jobId, taskrId, values);
            runInAction(() => {
                this.rootStore.taskStore.task!.isChatActive = true;
            })
        } catch (e){
            alertErrors(e);
            throw e;
        }
    }

    @action sendChatToRunner = async (jobId: string, runnerId: string, values: any) => {
        try{
           const chat = await ChatRequest.sendChatToRunner(jobId, runnerId, values);
            runInAction(() => {
                this.rootStore.orderStore.order!.chat = chat; 
            })
        } catch (e){
            alertErrors(e);
            throw e;
        }
    }
    
    
    @action deleteChat = async (chatId: string, predicate: string) => {
        this.chatTarget = chatId;
        this.deletingChat = true;
        try{
            await ChatRequest.deleteChat(chatId);
            runInAction(() => {
                switch (predicate){
                    case "taskr":
                        this.chatsAsTaskr = this.chatsAsTaskr!.filter(x => x.id !== chatId);
                        break;
                    case "runner":
                        this.chatsAsRunner = this.chatsAsRunner!.filter(x => x.id !== chatId);
                        break;
                    default:
                        break;
                }
                this.deletingChat = false;
            })
        }catch (e) {
           runInAction(() => this.deletingChat = false);
           alertErrors(e);
           throw e;
        }
    }
}