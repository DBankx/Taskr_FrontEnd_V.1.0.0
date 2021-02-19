import {RootStore} from "./rootstore";
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
            console.log(message);
            runInAction(() => {
                this.chat!.messages.push(message);
            })
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
            receiverId: this.chat!.taskrId === this.rootStore.authStore.user!.id ? this.chat!.runnerId : this.chat!.taskrId,
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
}