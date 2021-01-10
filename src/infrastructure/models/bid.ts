export interface IBidSubmission{
    description?: string;
    price: number;
}

export interface IBid{
    id: string;
    description: string;
    jobId: string;
    price: number;
    createdAt: Date;
    status: number;
    userName: string;
    avatar: string;
}