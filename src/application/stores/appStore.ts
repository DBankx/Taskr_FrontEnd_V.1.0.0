import {RootStore} from "./rootstore";

//-----------------------------------------------
// General store for application
//------------------------------------------------

export class AppStore{
    rootStore: RootStore
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }
    
    
}