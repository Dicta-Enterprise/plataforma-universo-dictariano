

export interface IGeneric<T> {
    data: T;
    status: number;
    message: string;
}


export interface IGenericArrays<T> {
    data: T[];
    status: number;
    message: string;
}