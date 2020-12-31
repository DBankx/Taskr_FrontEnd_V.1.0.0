import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {IPaginatedTaskResponse, ITaskQueryValues} from "../../infrastructure/models/task";
import {IAuthLoginSuccessValues, ISignInFormValues} from "../../infrastructure/models/auth";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

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
    getAllJobs: (queryValues: ITaskQueryValues) : Promise<IPaginatedTaskResponse> => ApiRequest.get("/jobs", {params: {
        title: queryValues?.title,
            minPrice: queryValues?.minPrice,
            maxPrice: queryValues?.maxPrice,
            pageSize: queryValues?.pageSize,
            pageNumber: queryValues?.pageNumber
        }})
}


// Requests for auth
export const AuthRequest = {
    signIn: (signInValues: ISignInFormValues) : Promise<IAuthLoginSuccessValues> => ApiRequest.post("/auth/signin", signInValues)
}