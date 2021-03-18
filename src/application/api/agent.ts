import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {IPaginatedTaskResponse, ITask, ITaskQueryValues} from "../../infrastructure/models/task";
import {IAuthSuccessResponse, ISignInFormValues} from "../../infrastructure/models/auth";
import {IBid, IBidSubmission} from "../../infrastructure/models/bid";
import {TaskStatus} from "../../infrastructure/enums/taskStatus";
import {
    ILanguage,
    IPrivateProfile, IPublicProfile,
    ISkill, ISocials
} from "../../infrastructure/models/profile";
import {NotificationStatus} from "../../infrastructure/enums/notification";
import {IPaginatedNotificationsResponse} from "../../infrastructure/models/notification";
import {IChat} from "../../infrastructure/models/chat";
import {IOrder, IReview} from "../../infrastructure/models/order";
import {history} from "../../index";
import {toast} from "react-toastify";

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

// things to do on response errors 
axios.interceptors.response.use(undefined, error => {
    if (error.message === 'Network Error' && !error.response) {
        toast.error('Network Error - Check your connection');
    }
    if(error.response.status === 401 && error.response.headers["www-authenticate"].startsWith("Bearer error")){
        window.localStorage.removeItem("jwt");
        history.push("/signin");
        toast.info("Your session has expired, Please login again");
    }
    //redirect to notfound page for bad guids
    if (error.response.status === 404) {
        history.push('/notfound');
    }
    //redirect to notfound page for invalid id guid
    if (error.response.status === 400 && error.response.config.method == 'get') {
        history.push('/notfound');
    }
    //send a toast notification if any response is a 500 status code
    if (error.response.status === 500) {
        toast.error('Server error - Try reloading the page');
    }
    throw error.response;
})

const responseBody = (response: AxiosResponse) => response.data;

// DEV PURPOSES ONLY
const sleep = (ms: number) => (response: AxiosResponse) =>
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

// Axios request structure
const ApiRequest = {
    get: (url: string, config?: AxiosRequestConfig) => axios.get(url, config).then(sleep(1000)).then(responseBody),
    post: (url: string, body?: any, config?: AxiosRequestConfig) => axios.post(url, body, config).then(sleep(1000)).then(responseBody),
    put: (url: string, body?: Record<string, unknown>, config?: AxiosRequestConfig) => axios.put(url, body, config).then(sleep(1000)).then(responseBody),
    delete: (url: string, config?: AxiosRequestConfig) => axios.delete(url, config).then(sleep(1000)).then(responseBody)
}


// Requests for Jobs
export const JobRequest = {
    getAllTasks: (queryValues: ITaskQueryValues) : Promise<IPaginatedTaskResponse> => ApiRequest.get("/jobs", {params: {
            title: queryValues?.title,
            minPrice: queryValues?.minPrice,
            maxPrice: queryValues?.maxPrice,
            pageSize: queryValues?.pageSize,
            pageNumber: queryValues?.pageNumber,
            deliveryType: queryValues?.deliveryType,
            category: queryValues?.category,
            sortBy: queryValues?.sortBy
        }, 
    cancelToken: axios.CancelToken.source().token
}),
    getTaskById: (id: string): Promise<ITask> => ApiRequest.get(`/jobs/${id}`, {
        cancelToken: axios.CancelToken.source().token
    }),
    watchTask: (taskId: string) : Promise<Record<string, unknown>> => ApiRequest.post(`/jobs/watch/${taskId}`, undefined, {
        cancelToken: axios.CancelToken.source().token
    }),
    unwatchTask: (taskId: string) : Promise<Record<string,  unknown>> => ApiRequest.delete(`/jobs/watch/${taskId}`, {
        cancelToken: axios.CancelToken.source().token
    }),
    createTask: (taskSubmission: FormData) : Promise<Record<string, unknown>> => ApiRequest.post("/jobs", taskSubmission, {
        cancelToken: axios.CancelToken.source().token
    }),
    deleteTaskById: (taskId: string) : Promise<Record<string, unknown>> => ApiRequest.delete(`/jobs/${taskId}`)
}


// Requests for auth
export const AuthRequest = {
    signIn: (signInValues: ISignInFormValues) : Promise<IAuthSuccessResponse> => ApiRequest.post("/auth/signin", signInValues, {
        cancelToken: axios.CancelToken.source().token
    }),
    getCurrentUser: () : Promise<IAuthSuccessResponse> => ApiRequest.get("/auth", {
        cancelToken: axios.CancelToken.source().token
    }),
    changePassword: (values: any) : Promise<Record<string, unknown>> => ApiRequest.put("/auth/change-password", values, {
        cancelToken: axios.CancelToken.source().token
    })
}

// Requests for bids
export const BidRequest = {
    placeBid: (values: IBidSubmission, jobId: string) : Promise<IBid> => ApiRequest.post(`bids/${jobId}`, values, {
        cancelToken: axios.CancelToken.source().token
    }),
    getAllTaskBids: (taskId: string) : Promise<IBid[]> => ApiRequest.get(`/bids/${taskId}`, {
        cancelToken: axios.CancelToken.source().token
    }),
    getBidById: (bidId: string) : Promise<IBid> => ApiRequest.get(`/bids/get-bid/${bidId}`, {
        cancelToken: axios.CancelToken.source().token
    }),
    markBidAsSeen: (bidId: string) : Promise<IBid> => ApiRequest.put(`/bids/seen/${bidId}`, undefined, {
        cancelToken: axios.CancelToken.source().token
    }),
    AcceptBidAndPay: (bidId: string, jobId: string) : Promise<IOrder> => ApiRequest.post(`/bids/accept/${jobId}/${bidId}`, undefined, {
        cancelToken: axios.CancelToken.source().token
    })
}

// Requests for profile
export const profileRequest = {
    getAllTasks: (taskStatus: TaskStatus) : Promise<ITask[]> => ApiRequest.get("/profile/jobs", {
        params:{
            status: taskStatus
        },
        cancelToken: axios.CancelToken.source().token
    }),
    getProfile: () : Promise<IPrivateProfile> => ApiRequest.get("/profile"),
    addProfileSkills: (values: ISkill) : Promise<Record<string, unknown>> => ApiRequest.post("/profile/skills", values, {
        cancelToken: axios.CancelToken.source().token
    }),
    addProfileLanguages: (values: ILanguage) : Promise<Record<string, unknown>> => ApiRequest.post("/profile/languages", values, {
        cancelToken: axios.CancelToken.source().token
    }),
    updateProfile: (values: any) : Promise<Record<string, unknown>> => ApiRequest.post("/profile/update", values, {
        cancelToken: axios.CancelToken.source().token
    }),
    updateSocials: (values: ISocials) : Promise<Record<string, unknown>> => ApiRequest.post("/profile/socials", values, {
        cancelToken: axios.CancelToken.source().token
    }),
    getNotifications: (status?: NotificationStatus, pageNumber?: number, pageSize?: number) : Promise<IPaginatedNotificationsResponse> => ApiRequest.get("/profile/notifications", {params:{status, pageNumber, pageSize}, cancelToken: axios.CancelToken.source().token}),
    markNotificationAsRead: (notificationId: string) : Promise<Record<string, unknown>> => ApiRequest.put(`profile/notifications/${notificationId}`, undefined, {
        cancelToken: axios.CancelToken.source().token
    }),
    deleteNotification: (notificationId: string) : Promise<Record<string, unknown>> => ApiRequest.delete(`profile/notifications/${notificationId}`, {
        cancelToken: axios.CancelToken.source().token
    }),
    markAllNotificationsAsRead: () : Promise<Record<string, unknown>> => ApiRequest.put("profile/notifications/read", undefined, {
        cancelToken: axios.CancelToken.source().token
    }),
    deleteAllNotifications: () : Promise<Record<string, unknown>> => ApiRequest.delete("profile/notifications", {
        cancelToken: axios.CancelToken.source().token
    }),
    getWatchlist: (sortBy: string) : Promise<ITask[]> => ApiRequest.get("/profile/watchlist", {params:{sortBy}, cancelToken: axios.CancelToken.source().token}),
    addBankAccount: (values: any) : Promise<Record<string, unknown>> => ApiRequest.post("/profile/bank", values)
}


export const PublicProfileRequest = {
    getPublicProfileDetails : (userId: string) : Promise<IPublicProfile> => ApiRequest.get(`/profile/public/details/${userId}`, {
        cancelToken: axios.CancelToken.source().token
    }),
    getPublicProfileTasks : (userId: string) : Promise<ITask[]> => ApiRequest.get(`/profile/public/tasks/${userId}`, {
        cancelToken: axios.CancelToken.source().token
    }),
    getUserReviews: (userId: string, predicate: string) : Promise<IReview[]> => ApiRequest.get(`/profile/reviews/${userId}`, {params:{predicate}}) 
}

export const ChatRequest = {
    getAllChats : (predicate: string) : Promise<IChat[]> => ApiRequest.get("/chat", {
        params: {predicate},
        cancelToken: axios.CancelToken.source().token
    }),
    getChatById: (chatId: string) : Promise<IChat> => ApiRequest.get(`/chat/${chatId}`, {
        cancelToken: axios.CancelToken.source().token
    }),
    createChat: (jobId: string, taskrId: string, values: any) => ApiRequest.post(`chat/create/${jobId}/${taskrId}`, values, {
        cancelToken: axios.CancelToken.source().token
    }),
    deleteChat: (chatId: string) : Promise<Record<string, unknown>> => ApiRequest.delete(`/chat/${chatId}`, {
        cancelToken: axios.CancelToken.source().token
    }),
    sendChatToRunner : (jobId: string, runnerId: string, values: any) : Promise<IChat> => ApiRequest.post(`/chat/send/${jobId}/${runnerId}`, values, {
        cancelToken: axios.CancelToken.source().token
    })
}

export const OrderRequest = {
    deleteOrderByNumber: (orderNumber:string) : Promise<Record<string, unknown>> => ApiRequest.delete(`/order/${orderNumber}`),
    confirmOrderByNumber: (orderNumber: string) : Promise<Record<string, unknown>> => ApiRequest.put(`/order/confirm/${orderNumber}`),
    getAllOrders: (predicate: string) : Promise<IOrder[]> => ApiRequest.get(`/order`, {
        params:{predicate}
    }),
    getOrderByNumber : (orderNumber: string) : Promise<IOrder> => ApiRequest.get(`/order/${orderNumber}`),
    markOrderAsStarted : (orderNumber: string) : Promise<Record<string, unknown>> => ApiRequest.put(`/order/start/${orderNumber}`),
    requestPayout: (orderNumber: string) : Promise<Record<string, unknown>> => ApiRequest.put(`order/request-payout/${orderNumber}`),
    rejectPayout: (orderNumber: string) : Promise<Record<string, unknown>> => ApiRequest.put(`order/reject-payout/${orderNumber}`),
    acceptPayout: (orderNumber: string) : Promise<Record<string, unknown>> => ApiRequest.put(`order/accept-payout/${orderNumber}`),
    addReview: (values: any, orderId: string) : Promise<Record<string, unknown>> => ApiRequest.post(`/review/${orderId}`, values),
    cancelOrder: (orderNumber: string) : Promise<Record<string, unknown>> => ApiRequest.put(`/order/cancel/${orderNumber}`)
}

