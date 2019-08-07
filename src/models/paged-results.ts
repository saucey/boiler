export interface IPagedResults<TModel> {    
    data: TModel;
    totalResults: number;
}

export interface INormalizedPagedResults<MainKeyType> {
    data: INormalizedData<Array<MainKeyType>>;
    totalResults: number;
}

export interface INormalizedData<MainKeyType> {
    entities: any;
    result: MainKeyType;
}

export interface INormalizedDataSingle<MainKeyType> {
    entities: any;
    result: MainKeyType;
}