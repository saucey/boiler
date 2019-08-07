import { ISiteLookup } from './site'
import { IPermit } from './permit'
import { IClient } from './client'
import { IProductPrice } from './product-price';
import Moment from 'moment';

export interface IPermitProductLookup
{
    permitProductId : number;
    permitProductName : string;
    clientId: number;
}

export interface IPermitProduct
{
    permitProductId : number;
    permitProductName : string;
    client : IClient | null;
    spaces : number;
    activeVRMs : number;
    maxVRMs : number;
    startDate : any;
    endDate : any;
    isVisibleToPublic: boolean;
    isActive : boolean;
    createdBy : number;
    createdDate : any;
    updatedBy : number;
    updatedDate : any;
    
    prices: Array<IProductPrice>;
    sites: Array<ISiteLookup>;
    permits: Array<IPermit>;
}

export class PermitProduct implements IPermitProduct
{
    permitProductId : number;
    permitProductName : string;
    client : IClient | null;
    spaces : number;
    activeVRMs : number;
    maxVRMs : number;
    startDate : any;
    endDate : any;
    isVisibleToPublic: boolean;
    isActive : boolean;
    createdBy : number;
    createdDate : any;
    updatedBy : number;
    updatedDate : any;
    prices: Array<IProductPrice>;
    sites: Array<ISiteLookup>;
    permits: Array<IPermit>;

    constructor(){
        this.permitProductId = 0,
        this.permitProductName = '',
        this.client = null,
        this.spaces = 50,
        this.activeVRMs = 1,
        this.maxVRMs = 1,
        this.startDate = Moment().format('YYYY/MM/DD'),
        this.endDate = null,
        this.isVisibleToPublic = true,
        this.isActive = true,
        this.createdBy = 0,
        this.createdDate = null,
        this.updatedBy = 0,
        this.updatedDate = null,
        this.sites = [],
        this.permits = [],
        this.prices = []
    }
}