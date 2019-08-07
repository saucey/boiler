import { ICountry, IRegion, IClient, IPermitProduct, ICustomer, IVrm, IPermitFunctions, IUser } from './index';
import Moment from 'moment';
import { IProductFrequency } from './frequency';
import { IBankAccountAndSubscriptionResult } from './direct-debits';
import { dateTimeHelper } from '../helpers';

export interface IPermitForm {
    permitName: string;
    firstName: string;
    lastName: string;
    company: string;
    customerName: string;
    clientName: IClient | null;
    addressLine1: string;
    product: IPermitProduct | null;
    productFrequency: IProductFrequency | null;
    permitProductPriceId: number;
    price: number | null;
    spaces: number;
    startDate: Moment.Moment | null;
    endDate: Moment.Moment | null;
    discountPercentage: number;
    discountEndDate: Moment.Moment | null;
    town: string;
    county: string;
    postcode: string;
    region: IRegion | null;
    country: ICountry | null;
    phoneNumber: string;
    emailAddress: string;
    createdBy: IUser | null;
    createdDate: Moment.Moment | null;
    updatedBy: IUser | null;
    updatedDate: Moment.Moment | null;
}

export interface IPermitEditForm {
    customer: ICustomer | null;
    client: IClient | null;
    product: IPermitProduct | null;
    productFrequency: IProductFrequency | null;
    permitProductPriceId: number;
    spaces: number;
    price: number;
    startDate: Moment.Moment | null;
    endDate: Moment.Moment | null;
    discountPercentage: number;
    discountEndDate: Moment.Moment | null;
    vrms: Array<IVrm>;
    deposit: number;
    directDebitBankAccount: IBankAccountAndSubscriptionResult | null;
    cardPaymentToken: string;
}

export class PermitEditForm implements IPermitEditForm, IPermitFunctions {
    customer: ICustomer | null;
    client: IClient | null;
    product: IPermitProduct | null;
    productFrequency: IProductFrequency | null;
    permitProductPriceId: number;
    spaces: number;
    price: number;
    startDate: Moment.Moment | null;
    endDate: Moment.Moment | null;
    discountPercentage: number;
    discountEndDate: Moment.Moment | null;
    vrms: Array<IVrm>;
    deposit: number;
    directDebitBankAccount: IBankAccountAndSubscriptionResult | null;
    cardPaymentToken: string;
    priceForAllSpaces(): number {
        return Math.round(this.price * this.spaces * ((this.discountEndDate != null && this.discountEndDate.date < Date.now ? (1 - this.discountPercentage / 100) : 1) * 100)) / 100;
    };
    monthsUntilStartOfDirectDebit(): number {
        return (dateTimeHelper.getDaysUsedThisMonth(this.startDate.toDate()) < 7 ? 1 : 0) +
            dateTimeHelper.getDaysUsedThisMonth((this.startDate.toDate())) / dateTimeHelper.getDaysTotalThisMonth(this.startDate.toDate());
    };
    priceUntilStartofDirectDebit(): number {
        return Math.round(this.monthsUntilStartOfDirectDebit() * this.priceForAllSpaces() * 100) / 100;
    };
    getDepositAmount(): number {
        let divideBy = { "Annually": 12, "Semi-Annually": 6, "Quarterly": 3, "Monthly": 1 };
        const divideByFactor: number = this.productFrequency ? divideBy[this.productFrequency.productFrequencyName] : 1;
        return Math.round(this.priceForAllSpaces() / divideByFactor * 100) / 100;
    };

    constructor(permitForm?: IPermitEditForm) {
        if (permitForm) {
            this.client = permitForm.client;
            this.customer = permitForm.customer;
            this.deposit = permitForm.deposit;
            this.endDate = permitForm.endDate;
            this.permitProductPriceId = permitForm.permitProductPriceId;
            this.price = permitForm.price;
            this.product = permitForm.product;
            this.productFrequency = permitForm.productFrequency;
            this.spaces = permitForm.spaces;
            this.startDate = permitForm.startDate;
            this.vrms = permitForm.vrms;
            this.discountPercentage = permitForm.discountPercentage;
            this.discountEndDate = permitForm.discountEndDate;
            this.cardPaymentToken = permitForm.cardPaymentToken;
            this.directDebitBankAccount = permitForm.directDebitBankAccount;
        };
    }
}
