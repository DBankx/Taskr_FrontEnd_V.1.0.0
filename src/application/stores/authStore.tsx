import {RootStore} from "./rootstore";
import {action, computed, makeObservable, observable, reaction, runInAction} from "mobx";
import {ISignInFormValues, IUser} from "../../infrastructure/models/auth";
import {AuthRequest} from "../api/agent";
import React from "react";
import Alert from "../common/Alert";
import {CloseIcon} from "../../infrastructure/icons/Icons";
import {toast} from "react-toastify";

// -------------------------------------------
// Auth store for all auth actions
// -------------------------------------------

export class AuthStore{
    rootStore: RootStore
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeObservable(this);
        reaction(() => this.token, (token) => {
            if(token){
                // set the token value in local storage as soon as the token changes
                localStorage.setItem("jwt", token);
            } else {
                localStorage.removeItem("jwt");
            }
        })
    }
    
    @observable token : string | null = localStorage.getItem("jwt");
    @observable user : IUser | null = null;

    
    @computed get isLoggedIn(){
        return !!this.user;
    }

    // ------------------------
    // Actions
    // ------------------------
    
    @action signInUser = async (signInFormValues: ISignInFormValues) => {
        try{
            const signInResponse = await AuthRequest.signIn(signInFormValues);
            localStorage.setItem("jwt", signInResponse.token);
            runInAction(() => {
                this.user = signInResponse.user;
                this.rootStore.appStore.setAppLoaded();
            })
        } catch(error){
            toast.error(<Alert subject="Invalid credentials" message="" icon={<CloseIcon boxSize={8} color="#73000c" />} type="error" />)
            throw error;
        }
    }
    
    @action getCurrentUser = async () => {
        try{
            const authResponse = await AuthRequest.getCurrentUser();
            localStorage.setItem("jwt", authResponse.token);
            runInAction(() => {
                this.user = authResponse.user;
                this.rootStore.appStore.setAppLoaded();
            })
        } catch(error){
            toast.error(<Alert subject="Error occurred" message="Problem getting tasks" icon={<CloseIcon boxSize={8} color="#73000c"/>} type="error" />)
            throw error;
        }
    }
    
    @action logOutUser = () => {
        localStorage.removeItem("jwt");
        this.user = null;
        window.location.reload();
    }
}