export interface ILocationSearch{
    features: ILocationFeature[]
}

export interface ILocationFeature{
    text: string;
    place_name: string;
    center: number[];
    context: ILocationContext[]
    
}

export interface ILocationContext{
    id: string;
    text: string;
}