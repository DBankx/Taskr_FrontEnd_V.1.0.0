import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {IPaginatedTaskResponse, ITask, ITaskQueryValues} from "../../infrastructure/models/task";
import {IAuthSuccessResponse, ISignInFormValues} from "../../infrastructure/models/auth";
import {IBid, IBidSubmission} from "../../infrastructure/models/bid";
import {TaskStatus} from "../../infrastructure/enums/taskStatus";
import {
    ILanguage,
    IPrivateProfile,
    ISkill, ISocials
} from "../../infrastructure/models/profile";
import {NotificationStatus} from "../../infrastructure/enums/notification";
import {IPaginatedNotificationsResponse} from "../../infrastructure/models/notification";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// append a users jwt token to every axios request
axios.interceptors.request.use((config: AxiosRequestConfig) => {
    const jwToken = localStorage.getItem("jwt")   
    if(jwToken){
        config.headers.Authorization = `Bearer ${jwToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
})


const responseBody = (response: AxiosResponse) => response.data;


// Axios request structure
const ApiRequest = {
    get: (url: string, config?: AxiosRequestConfig) => axios.get(url, config).then(responseBody),
    post: (url: string, body?: any, config?: AxiosRequestConfig) => axios.post(url, body, config).then(responseBody),
    put: (url: string, body?: Record<string, unknown>, config?: AxiosRequestConfig) => axios.put(url, body, config).then(responseBody),
    delete: (url: string, config?: AxiosRequestConfig) => axios.delete(url, config).then(responseBody)
}


// Requests for Jobs
export const JobRequest = {
    getAllTasks: (queryValues: ITaskQueryValues) : Promise<IPaginatedTaskResponse> => ApiRequest.get("/jobs", {params: {
        title: queryValues?.title,
            minPrice: queryValues?.minPrice,
            maxPrice: queryValues?.maxPrice,
            pageSize: queryValues?.pageSize,
            pageNumber: queryValues?.pageNumber
        }}),
    getTaskById: (id: string): Promise<ITask> => ApiRequest.get(`/jobs/${id}`),
    watchTask: (taskId: string) : Promise<Record<string, unknown>> => ApiRequest.post(`/jobs/watch/${taskId}`),
    unwatchTask: (taskId: string) : Promise<Record<string,  unknown>> => ApiRequest.delete(`/jobs/watch/${taskId}`),
    createTask: (taskSubmission: FormData) : Promise<Record<string, unknown>> => ApiRequest.post("/jobs", taskSubmission)
}


// Requests for auth
export const AuthRequest = {
    signIn: (signInValues: ISignInFormValues) : Promise<IAuthSuccessResponse> => ApiRequest.post("/auth/signin", signInValues),
    getCurrentUser: () : Promise<IAuthSuccessResponse> => ApiRequest.get("/auth")
}

// Requests for bids
export const BidRequest = {
    placeBid: (values: IBidSubmission, jobId: string) : Promise<IBid> => ApiRequest.post(`bids/${jobId}`, values),
    getAllTaskBids: (taskId: string) : Promise<IBid[]> => ApiRequest.get(`/bids/${taskId}`),
    getBidById: (bidId: string) : Promise<IBid> => ApiRequest.get(`/bids/get-bid/${bidId}`),
    markBidAsSeen: (bidId: string) : Promise<IBid> => ApiRequest.put(`/bids/seen/${bidId}`),
}

// Requests for profile
export const profileRequest = {
    getAllTasks: (taskStatus: TaskStatus) : Promise<ITask[]> => ApiRequest.get("/profile/jobs", {
        params:{
            status: taskStatus
        }
    }),
    getProfile: () : Promise<IPrivateProfile> => ApiRequest.get("/profile"),
    addProfileSkills: (values: ISkill) : Promise<Record<string, unknown>> => ApiRequest.post("/profile/skills", values),
    addProfileLanguages: (values: ILanguage) : Promise<Record<string, unknown>> => ApiRequest.post("/profile/languages", values),
    updateProfile: (values: any) : Promise<Record<string, unknown>> => ApiRequest.post("/profile/update", values),
    updateSocials: (values: ISocials) : Promise<Record<string, unknown>> => ApiRequest.post("/profile/socials", values),
    getNotifications: (status?: NotificationStatus, pageNumber?: number, pageSize?: number) : Promise<IPaginatedNotificationsResponse> => ApiRequest.get("/profile/notifications", {params:{status,
        pageNumber, pageSize}}),
    markNotificationAsRead: (notificationId: string) : Promise<Record<string, unknown>> => ApiRequest.put(`profile/notifications/${notificationId}`),
    deleteNotification: (notificationId: string) : Promise<Record<string, unknown>> => ApiRequest.delete(`profile/notifications/${notificationId}`),
    markAllNotificationsAsRead: () : Promise<Record<string, unknown>> => ApiRequest.put("profile/notifications/read"),
    deleteAllNotifications: () : Promise<Record<string, unknown>> => ApiRequest.delete("profile/notifications")
}