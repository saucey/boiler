import Moment from 'moment';

export interface IProductPrice
{
    permitProductPriceSetId: number;
    permitProductId : number;
    startDate : any;
    priceAnnually : number;
    priceSemiAnnually : number;
    priceQuarterly : number;
    priceMonthly : number;
    priceWeekly : number;
    isCurrent : boolean;
    createdBy : number;
    createdDate : any;
    updatedBy : number;
    updatedDate : any;
}

export class ProductPrice implements IProductPrice
{
    permitProductPriceSetId: number;
    permitProductId : number;
    startDate : any;
    priceAnnually : number;
    priceSemiAnnually : number;
    priceQuarterly : number;
    priceMonthly : number;
    priceWeekly : number;
    isCurrent : boolean;
    createdBy : number;
    createdDate : any;
    updatedBy : number;
    updatedDate : any;

    constructor(){
        this.permitProductPriceSetId = 0,
        this.permitProductId = 0,
        this.startDate =  Moment().format('YYYY/MM/DD'),
        this.priceAnnually = 0,
        this.priceSemiAnnually = 0,
        this.priceQuarterly = 0,
        this.priceMonthly = 0,
        this.priceWeekly = 0,
        this.isCurrent = false,
        this.createdBy = 1041,
        this.createdDate = null,
        this.updatedBy = 0,
        this.updatedDate = null
    }
}

export interface IProductPrices
{
    permitProductId : number;
    startDate : any;
    priceAnnually : number;
    priceSemiAnnually : number;
    priceQuarterly : number;
    priceMonthly : number;
    priceWeekly : number;
    createdBy : number;
    createdDate : any;
    updatedBy : number;
    updatedDate : any;
}