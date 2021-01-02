export interface ITask{
    id: string;
    title: string;
    description: string;
    initialPrice: number;
    creatorId: string;
    creatorUsername: string;
    createdAt: Date;
    deliveryDate: Date;
    photos: [{
        id: string;
        url: string;
    }],
    city: string;
    postCode: string;
    views: number;
}

export interface IPaginatedTaskResponse{
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
    data: ITask[]
}

export interface ITaskQueryValues{
    title?: string;
    minPrice: number;
    maxPrice: number;
    pageSize: number;
    pageNumber: number;
    city?: string;
} 