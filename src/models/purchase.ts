import { ISiteLookup } from "./site";
import { IProductFrequency } from "./frequency";
import { IVrm } from "./vrm";
import { ICustomer, ITown } from ".";
import Moment from 'moment';
// import { dateTimeHelper } from "../helpers";

export interface IPurchase {
    customer: ICustomer | null;
    town: ITown | null;
    site: ISiteLookup;
    productId: number;
    productName: string;
    discountPercentage: number;
    discountEndDate: Date | null;
    activeVRMs: number;
    maxVRMs: number;
    frequency: IProductFrequency | null;
    spaces: number;
    VRMs: Array<IVrm>;
    startDate: Moment.Moment | null;
    bankAccountToken: string | null;
    cardPaymentToken: string | null;
    // priceForAllSpaces(): number;
    // monthsUntilStartOfDirectDebit(): number;
    // priceUntilStartofDirectDebit(): number;
    // getDepositAmount(): number;
}

// export interface IPermitFunctions
// {
//     priceForAllSpaces(): number;
//     monthsUntilStartOfDirectDebit(): number;
//     priceUntilStartofDirectDebit(): number;
//     getDepositAmount():number;
// }


export class Purchase implements IPurchase {
    customer: ICustomer | null;
    town: ITown | null;
    site: ISiteLookup;
    productId: number;
    productName: string;
    discountPercentage: number;
    discountEndDate: Date | null;
    activeVRMs: number;
    maxVRMs: number;
    frequency: IProductFrequency | null;
    spaces: number;
    VRMs: Array<IVrm>;
    startDate: Moment.Moment | null;
    bankAccountToken: string | null;
    cardPaymentToken: string | null;

    // priceForAllSpaces(): number {
    //     return Math.round(this.frequency.price * this.spaces * ((this.discountEndDate != null && this.discountEndDate.date < Date.now ? (1 - this.discountPercentage / 100) : 1) * 100)) / 100;
    // };
    // monthsUntilStartOfDirectDebit(): number {
    //     return (dateTimeHelper.getDaysUsedThisMonth(this.startDate.toDate()) < 7 ? 1 : 0) +
    //         dateTimeHelper.getDaysUsedThisMonth((this.startDate.toDate())) / dateTimeHelper.getDaysTotalThisMonth(this.startDate.toDate());
    // };
    // priceUntilStartofDirectDebit(): number {
    //     return Math.round(this.monthsUntilStartOfDirectDebit() * this.priceForAllSpaces() * 100) / 100;
    // };
    // getDepositAmount(): number {
    //     let divideBy = { "Annually": 12, "Semi-Annually": 6, "Quarterly": 3, "Monthly": 1 };
    //     const divideByFactor: number = this.frequency ? divideBy[this.frequency.productFrequencyName] : 1;
    //     return Math.round(this.priceForAllSpaces() / divideByFactor * 100) / 100;
    // };

    constructor(c:ICustomer, t:ITown, preProduct:any = {productId:0, productName: '', activeVRMs: 0, maxVRMs:0, frequency: null, spaces:1, VRMs:[], startDate:null}) {
            this.customer = c,
            this.town = t,
            this.site = { siteId: 0, siteName: '', addressLine1: '', town: '', client: { clientId: 0, clientName: '', shouldShowSites: false }, latitude: 0, longitude: 0 },
            this.productId = preProduct.productId,
            this.productName = preProduct.productName,
            this.discountPercentage = 0,
            this.discountEndDate = null,
            this.activeVRMs = preProduct.activeVRMs,
            this.maxVRMs = preProduct.maxVRMs,
            this.frequency = preProduct.frequency,
            this.spaces = preProduct.spaces,
            this.VRMs = preProduct.VRMs,
            this.startDate = preProduct.startDate,
            this.bankAccountToken = null,
            this.cardPaymentToken = null
    }
}