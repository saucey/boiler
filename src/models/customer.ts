import { IClient, ICountry, IPermit } from '.'
//import { dateTimeHelper } from '../helpers';
import Moment from 'moment';
import { getClient } from '../helpers';
// import { number } from 'prop-types';

export interface ICustomer {
    customerId: number;
    firstName: string;
    lastName: string;
    customerName: string;
    company: string;
    client: IClient | null;
    addressLine1 : string;
    addressLine2 : string;
    town : string;
    county : string;
    postcode : string;
    country: ICountry | null;
    phoneNumber: string;
    emailAddress: string;
    notes: string;
    isActive: boolean;
    createdBy: number;
    createdDate: any;
    updatedBy: number;
    updatedDate: any;
    permits: Array<IPermit>;
    password: string;
    directDebitCustomerId: string;
}

export class Customer implements ICustomer {
    customerId: number;
    firstName: string;
    lastName: string;
    customerName: string;
    company: string;
    client: IClient | null;
    addressLine1 : string;
    addressLine2 : string;
    town : string;
    county : string;
    postcode : string;
    country: ICountry | null;
    phoneNumber: string;
    emailAddress: string;
    notes: string;
    isActive: boolean;
    createdBy: number;
    createdDate: any;
    updatedBy: number;
    updatedDate: any;
    permits: Array<IPermit>;
    password: string;
    directDebitCustomerId: string;

    constructor(){
        this.customerId = 0,
        this.firstName = '',
        this.lastName = '',
        this.customerName = '',
        this.company = '',
        this.client = getClient(),
        this.addressLine1 = '',
        this.addressLine2 = '',
        this.town = '',
        this.postcode = '',
        this.county = '',
        this.country = {countryId:234, countryName:'United Kingdom'},
        this.phoneNumber = '',
        this.emailAddress = '',
        this.notes = '',
        this.isActive = true,
        this.createdBy = 0,
        this.createdDate = Moment().format('YYYY/MM/DD'),
        this.updatedBy = 0,
        this.updatedDate = Moment().format('YYYY/MM/DD'),
        this.permits = [],
        this.password = '',
        this.directDebitCustomerId = ''
    }
}