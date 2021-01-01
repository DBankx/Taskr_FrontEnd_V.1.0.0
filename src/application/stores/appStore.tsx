import {RootStore} from "./rootstore";
import {action, makeObservable, observable} from "mobx";
// import React from "react";

//-----------------------------------------------
// General store for application
//------------------------------------------------

export class AppStore{
    rootStore: RootStore
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeObservable(this);
    }
    
    @observable appLoaded = false;
    
    @action setAppLoaded = () => {
        this.appLoaded = true;
    }
    
    
}