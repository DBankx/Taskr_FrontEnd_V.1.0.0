import {RootStore} from "./rootstore";
import {action, makeObservable, observable, runInAction} from "mobx";
import {IChat} from "../../infrastructure/models/chat";
import {alertErrors} from "../../infrastructure/utils/getErrors";
import {ChatRequest} from "../api/agent";

export class ChatStore{
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeObservable(this);
    }
    
    @observable loadingChats = false;
    @observable chatsAsTaskr : IChat[] | null = null;
    @observable chatsAsRunner : IChat[] | null = null;
    
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
}