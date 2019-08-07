// import { IUser } from './misc/user';
// import { ICountry, IClient } from '.';
// import * as moment from 'moment';

export interface IFormField<T> {
    field: T;
    isValid?: boolean;
    validationMessage?: string
}

export interface ICustomerAddForm {
    customerId: number;
    firstName: string;
    lastName: string;
    customerName: string;
    company: string;
    client: {
        clientId: number;
        clientName: string;
        shouldShowSites: boolean;
    };
    addressLine1: string;
    addressLine2: string;
    town: string;
    county: string;
    postcode: string;
    country: {
        countryId: number;
        countryName: string;
    };
    userId: number;
    phoneNumber: string;
    emailAddress: string;
    password: string;
    notes: string;
    createdBy: number;
    createdDate: Date;
    updatedBy: number;
    updatedDate: Date;
}

// export interface ICustomerForm {
//     firstName: IFormField<string>;
//     lastName: IFormField<string>;
//     customerName: IFormField<string>;
//     company: IFormField<string>;
//     client: IFormField<IClient | null>;
//     addressLine1: IFormField<string>;
//     addressLine2: IFormField<string>;
//     town: IFormField<string>;
//     county: IFormField<string>;
//     postcode: IFormField<string>;
//     country: IFormField<ICountry | null>;
//     phoneNumber: IFormField<string>;
//     emailAddress: IFormField<string>;
//     password: IFormField<string>;
//     createdBy: IFormField<IUser | null>;
//     createdDate: IFormField<moment.Moment | null>;
//     updatedBy: IFormField<IUser | null>;
//     updatedDate: IFormField<moment.Moment | null>;
//     validationMessage: IFormField<string>;
// }

// export interface ICustomerEditForm {
//     firstName: IFormField<string>;
//     lastName: IFormField<string>;
//     customerName: IFormField<string>;
//     company: IFormField<string>;
//     client: IFormField<IClient | null>;
//     addressLine1: IFormField<string>;
//     addressLine2: IFormField<string>;
//     town: IFormField<string>;
//     county: IFormField<string>;
//     postcode: IFormField<string>;
//     country: IFormField<ICountry | null>;
//     phoneNumber: IFormField<string>;
//     emailAddress: IFormField<string>;
//     password: IFormField<string>;
//     notes: IFormField<string>;
//     validationMessage: IFormField<string>;
// }

export class CustomerAddForm implements ICustomerAddForm {

    customerId: number;
    firstName: string;
    lastName: string;
    customerName: string;
    company: string;
    client: {
        clientId: number;
        clientName: string;
        shouldShowSites: boolean;
    };
    addressLine1: string;
    addressLine2: string;
    town: string;
    county: string;
    postcode: string;
    country: {
        countryId: number;
        countryName: string;
    };
    userId: number;
    phoneNumber: string;
    emailAddress: string;
    password: string;
    notes: string;
    createdBy: number;
    createdDate: Date;
    updatedBy: number;
    updatedDate: Date;

    constructor() {

        this.customerId =  0,
        this.firstName = '',
        this.lastName = '',
        this.customerName = '',
        this.company = '',
        this.client = {
            clientId: 307,
            clientName: '',
            shouldShowSites: true,
        },
        this.addressLine1 = '',
        this.addressLine2 = '',
        this.town = '',
        this.county = '',
        this.postcode = '',
        this.country = {
            countryId: 0,
            countryName: '',
        },
        this.userId = 0,
        this.phoneNumber = '',
        this.emailAddress = '',
        this.password = '',
        this.notes = '',
        this.createdBy = 0,
        this.createdDate = new Date(),
        this.updatedBy = 0,
        this.updatedDate = new Date()


        // this.firstName = { field: '', isValid: false, validationMessage: 'Please enter a first Name' },
        // this.lastName = { field: '', isValid: false, validationMessage: 'Please enter a last Name' },
        // this.customerName = { field: '', isValid: false, validationMessage: '' },
        // this.company = { field: '', isValid: false, validationMessage: '' },
        // this.client = null,
        // this.addressLine1 = { field: '', isValid: false },
        // this.addressLine2 = { field: '', isValid: false },
        // this.town = { field: '', isValid: false, validationMessage: 'Please enter a city' },
        // this.county = { field: '', isValid: false, validationMessage: '' },
        // this.postcode = { field: '', isValid: false, validationMessage: 'Please enter a post' },
        // this.country = null,
        // this.phoneNumber = { field: '', isValid: false },
        // this.emailAddress = { field: '', isValid: false, validationMessage: 'Please enter email' },
        // this.notes = { field: '', isValid: false, validationMessage: '' },
        // this.password = { field: '', isValid: false, validationMessage: 'Please enter a valid' }

    }
}