export interface ICustomerSearchModel
{
    searchText: string;
    active: number;
    clientId: number;
}

export interface IProductSearchModel
{
    searchText: string;
    clientId: number;
    siteId: number | null;
}

export interface IPermitSearchModel
{
    searchText: string;
    customerId: number;
    clientId: number;
}

export interface ISiteSearchModel
{
    searchText: string;
    active: number;
    clientId: number;
}

export interface ISiteLocationSearchModel
{
    searchText: string;
    clientId: number;
    latitude: number;
    longitude: number;
    town:string;
    pageSize: number;
}

export interface ISiteHealthSearchModel
{
    searchText: string;    
}

export interface ISiteMediaSearchModel
{
    searchText: string;
    active: number;
    siteMediaCategoryId: number;
    siteMediaStatusId: number;
    isPoplaPack: boolean | null;
    siteId: number;
}

export interface ISuspensionSearchModel
{    
    windowName: string;
    siteId: number | null;
    searchText: string;
    pageNumber: number;
    pageSize: number;
    sorted: Array<ISortProperty>;
    searchStatus: Array<number>;
    searchClassification: Array<number>;    
}

export interface ISortProperty
{
    id: string,
    desc: boolean
}