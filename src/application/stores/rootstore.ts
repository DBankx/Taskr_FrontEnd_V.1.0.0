import {createContext} from "react";
import {configure} from "mobx";
import {AppStore} from "./appStore";
import {TaskStore} from "./taskStore";

configure({enforceActions: "always"});

export class RootStore {
    appStore: AppStore
    jobStore: TaskStore
    constructor() {
        this.appStore = new AppStore(this);
        this.jobStore = new TaskStore(this);
    }
}

const rootStoreContext = createContext(new RootStore());

export default rootStoreContext;