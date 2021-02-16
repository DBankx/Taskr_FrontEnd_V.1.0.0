import {createContext} from "react";
import {configure} from "mobx";
import {AppStore} from "./appStore";
import {TaskStore} from "./taskStore";
import {AuthStore} from "./authStore";
import {BidStore} from "./bidStore";
import {ProfileStore} from "./profileStore";
import {PublicProfileStore} from "./PublicProfileStore";
import {ChatStore} from "./chatStore";

configure({enforceActions: "always"});

export class RootStore {
    appStore: AppStore
    taskStore: TaskStore
    authStore: AuthStore
    bidStore: BidStore
    profileStore: ProfileStore
    publicProfileStore : PublicProfileStore
    chatStore: ChatStore
    constructor() {
        this.appStore = new AppStore(this);
        this.taskStore = new TaskStore(this);
        this.authStore = new AuthStore(this);
        this.bidStore = new BidStore(this);
        this.profileStore = new ProfileStore(this);
        this.publicProfileStore = new PublicProfileStore(this);
        this.chatStore = new ChatStore(this);
    }
}

const rootStoreContext = createContext(new RootStore());

export default rootStoreContext;