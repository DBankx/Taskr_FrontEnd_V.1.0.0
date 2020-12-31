import {RootStore} from "./rootstore";
import {action, makeObservable, observable, runInAction} from "mobx";
import {ISignInFormValues, IUser} from "../../infrastructure/models/auth";
import {AuthRequest} from "../api/agent";

// -------------------------------------------
// Auth store for all auth actions
// -------------------------------------------

export class AuthStore{
    rootStore: RootStore
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeObservable(this);
    }
    
    @observable token : string | null = null;
    @observable user : IUser | null = null;


    // ------------------------
    // Actions
    // ------------------------
    
    @action signInUser = async (signInFormValues: ISignInFormValues) => {
        try{
            const signInResponse = await AuthRequest.signIn(signInFormValues);
            runInAction(() => {
                this.token = signInResponse.token;
                this.user = signInResponse.user;
            })
        } catch(error){
            throw error;
        }
    }
}