import {RootStore} from "./rootstore";
import {action, computed, makeObservable, observable, reaction, runInAction} from "mobx";
import {ISignInFormValues, ISignUpFormValues, IUser} from "../../infrastructure/models/auth";
import {AuthRequest} from "../api/agent";
import React from "react";
import Alert from "../common/Alert";
import {CheckmarkIcon, CloseIcon} from "../../infrastructure/icons/Icons";
import {toast} from "react-toastify";
import {alertErrors} from "../../infrastructure/utils/getErrors";
import {history} from "../../index";

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
    @observable confirmingEmail = false;

    
    @computed get isLoggedIn(){
        return !!this.user;
    }

    // ------------------------
    // Actions
    // ------------------------
    
    
    // TODO - Login should refresh the page
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
    
    @action SignUpUser = async (signUpFormValues: ISignUpFormValues) => {
        try{
            await AuthRequest.signUp(signUpFormValues);
            history.push({pathname: "/await-confirm", search: `?email=${signUpFormValues.email}`});
        } catch (error) {
           alertErrors(error);
           throw error;
        }
    }
    
    @action confirmEmail = async (userId: string, code: string) => {
        this.confirmingEmail = true;
        try{
            await AuthRequest.confirmEmail(userId, code);
            runInAction(() => {
                this.confirmingEmail = false;
            })
        } catch (e) {
            runInAction(() => this.confirmingEmail = false);
           alertErrors(e);
           throw e;
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
    
    @action changePassword = async (values: any) => {
        try{
            await AuthRequest.changePassword(values);
            runInAction(() => {
                toast.success(<Alert type="success" subject="Password changed" icon={<CheckmarkIcon boxSize={8} color="#224a23" />} message="You will be logged out" />);
                history.push("/");
                this.logOutUser();
            })
        }catch(error){
            alertErrors(error);
            throw error;
        }
    }
    
    @action logOutUser = () => {
        localStorage.removeItem("jwt");
        this.user = null;
        window.location.reload();
    }
}