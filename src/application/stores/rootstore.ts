import {createContext} from "react";
import {configure} from "mobx";
import {AppStore} from "./appStore";
import {TaskStore} from "./taskStore";
import {AuthStore} from "./authStore";
import {BidStore} from "./bidStore";

configure({enforceActions: "always"});

export class RootStore {
    appStore: AppStore
    taskStore: TaskStore
    authStore: AuthStore
    bidStore: BidStore
    constructor() {
        this.appStore = new AppStore(this);
        this.taskStore = new TaskStore(this);
        this.authStore = new AuthStore(this);
        this.bidStore = new BidStore(this);
    }
}

const rootStoreContext = createContext(new RootStore());

export default rootStoreContext;