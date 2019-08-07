import { IClient, ICustomer, IPermitProduct, IProductFrequency, IPermitActivity } from '.';
import Moment from 'moment';
import { IVrm } from './vrm';
import { dateTimeHelper } from '../helpers';

export interface IPermit {
    permitId: number;
    customer: ICustomer | null;
    customerId: number | null;
    client: IClient | null;
    product: IPermitProduct | null;
    productFrequency: IProductFrequency | null;
    spaces: number;
    price: number;
    permitProductPriceId: number;
    requestedCancellationDate: any;
    initialPayment: number;
    deposit: number;
    productFrequencyName: string;
    directDebitBankAccountId: string;
    directDebitAccountHolderName: string;
    directDebitAccountEnding: string;
    directDebitCreatedDate: string;
    directDebitMandateId: string;
    directDebitSubscriptionId: string;
    //bankAccountToken: string;
    cardPaymentToken: string;
    startDate: any;
    endDate: any;
    discountPercentage: number;
    discountEndDate: any;
    balance: number;
    isActive: boolean;
    createdBy: number;
    createdDate: any;
    updatedBy: number;
    updatedDate: any;
    vrms: Array<IVrm>;
    permitActivity: Array<IPermitActivity>;
}

export interface IPermitFunctions {
    priceForAllSpaces(): number;
    monthsUntilStartOfDirectDebit(): number;
    priceUntilStartofDirectDebit(): number;
    getDepositAmount(): number;
}

export class Permit implements IPermit, IPermitFunctions {
    permitId: number;
    customer: ICustomer | null;
    customerId: number | null;
    client: IClient | null;
    product: IPermitProduct | null;
    productFrequency: IProductFrequency | null;
    spaces: number;
    price: number;
    permitProductPriceId: number;
    requestedCancellationDate: any;
    initialPayment: number;
    deposit: number;
    directDebitBankAccountId: string;
    directDebitAccountHolderName: string;
    directDebitAccountEnding: string;
    directDebitCreatedDate: string;
    directDebitMandateId: string;
    directDebitSubscriptionId: string;
    //bankAccountToken: string;
    cardPaymentToken: string;
    productFrequencyName: string;
    startDate: any;
    endDate: any;
    discountPercentage: number;
    discountEndDate: any;
    balance: number;
    isActive: boolean;
    createdBy: number;
    createdDate: any;
    updatedBy: number;
    updatedDate: any;
    vrms: Array<IVrm>;
    permitActivity: Array<IPermitActivity>;
    priceForAllSpaces(): number {
        return Math.round(this.price * this.spaces * this.discountEndDate && this.discountEndDate < Date.now ? (1 - this.discountPercentage / 100) : 1 * 100) / 100;
    };
    monthsUntilStartOfDirectDebit(): number {
        return (dateTimeHelper.getDaysUsedThisMonth(this.startDate.toDate()) < 7 ? 1 : 0) +
            dateTimeHelper.getDaysUsedThisMonth(this.startDate.toDate()) / dateTimeHelper.getDaysTotalThisMonth(this.startDate.toDate());
    };
    priceUntilStartofDirectDebit(): number {
        return Math.round(this.monthsUntilStartOfDirectDebit() * this.priceForAllSpaces() * 100) / 100;
    };
    getDepositAmount(): number {
        let divideBy = { "Annually": 12, "Semi-Annually": 6, "Quarterly": 3, "Monthly": 1 };
        const divideByFactor: number = this.productFrequency ? divideBy[this.productFrequency.productFrequencyName] : 1;
        return Math.round(this.priceForAllSpaces() / divideByFactor * 100) / 100;
    };

    constructor(permit?: IPermit) {
        if (permit) {
            Object.assign(this, permit);
        }
        else {
            this.permitId = 0,
                this.customer = null,
                this.customerId = null,
                this.client = null,
                this.product = null,
                this.productFrequency = null,
                this.spaces = 1,
                this.price = 0,
                this.permitProductPriceId = 0,
                this.requestedCancellationDate = null,
                this.productFrequencyName = '',
                this.initialPayment = 0,
                this.deposit = 0,
                this.directDebitBankAccountId = "",
                this.directDebitAccountHolderName = "",
                this.directDebitAccountEnding = "",
                this.directDebitCreatedDate = null,
                this.directDebitMandateId = "",
                this.directDebitSubscriptionId = "",
                //this.bankAccountToken = '',
                this.cardPaymentToken = '',
                this.startDate = Moment().format('MM/DD/YYYY'),
                this.endDate = null,
                this.discountPercentage = 0,
                this.discountEndDate = null,
                this.balance = 0,
                this.isActive = true,
                this.createdBy = 0,
                this.createdDate = null,
                this.updatedBy = 0,
                this.updatedDate = null,
                this.vrms = [],
                this.permitActivity = []
        }
    }
    // constructor(permit?:IPermit){
    //     if(permit)
    //     {
    //         Object.assign(this, permit);
    //     } 
    //     else{
    //     this.permitId = 0,
    //     this.customer = null,
    //     this.customerId = null,
    //     this.client = null,
    //     this.product = null,
    //     this.productFrequency = null,
    //     this.spaces = 1,
    //     this.price = 0,
    //     this.permitProductPriceId = 0,
    //     this.requestedCancellationDate = null,
    //     this.initialPayment = 0,
    //     this.deposit = 0,
    //     this.directDebitBankAccountId = "",
    //     this.directDebitAccountHolderName = "",
    //     this.directDebitAccountEnding = "",
    //     this.directDebitCreatedDate = null,
    //     this.directDebitMandateId = "",
    //     this.directDebitSubscriptionId = "",
    //     //this.bankAccountToken = '',
    //     this.cardPaymentToken = '',
    //     this.startDate = Moment().format('MM/DD/YYYY'),
    //     this.endDate = null,
    //     this.discountPercentage = 0,
    //     this.discountEndDate = null,
    //     this.balance = 0,
    //     this.isActive = true,
    //     this.createdBy = 0,
    //     this.createdDate = null,
    //     this.updatedBy = 0,
    //     this.updatedDate = null,
    //     this.vrms = [],
    //     this.permitActivity = []
    //     }
    // }
}