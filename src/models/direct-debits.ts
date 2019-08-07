// export interface IDirectDebit {
//     firstName: string;
//     lastName: string;
//     company: string;
//     useCompany: boolean;
//     email: string;
//     accountHolderName: string;
//     sortCode: string;
//     accountNumber: string;
//     addressLine1: string;
//     addressLine2: string;
//     town: string;
//     postcode: string;
//     authorised: boolean;
//     toldGoCardless: boolean;
// }

// export interface IDirectDebitForm{
//     firstName: string;
//     lastName: string;
//     company: string;
//     useCompany: boolean;
//     email: string;
//     accountHolderName: string;
//     sortCode: string;
//     accountNumber: string;
//     addressLine1: string;
//     addressLine2: string;
//     town: string;
//     postcode: string;
//     authorisedToSign: boolean;
//     toldGoCardless: boolean;
// }

// export interface IBankAccount {
//     id: string;
//     accountHolderName: string;
//     accountNumberEnding: string;
//     bankName: string;
//     branchCode: number;
//     accountNumber: number;
//     countryCode: string;
//     currency: string;
//     enabled: boolean;
//     createdAt: any;
//     links: any;
//     metadata: any;
// }

export interface IBankAccountAndSubscription {
    customerId: string;
    bankAccountToken: string;
    isNewBankAccount: boolean;
    description: string;
    amount: number;
    existingSubscriptionIdToCancel: string;
}

export interface IBankAccountAndSubscriptionResult {
    directDebitAccountHolderName: string;
    directDebitAccountEnding: string;
    directDebitCreatedAt: any;
    directDebitBankAccountId: string;
    directDebitMandateId: string;
    directDebitSubscriptionId: string;
}

export interface IDirectDebitBankAccount {
    id: string;
    createdAt: any;
    accountHolderName: string;
    accountNumberEnding: number;
    countryCode: string;
    currency: string;
    bankName: string;
    metadata: any;
    enabled: boolean;
    links: any;
}

// export interface IBankAccountAndSubscriptionResult {
//     directDebitAccountHolderName: string;
//     directDebitAccountEnding: string;
//     directDebitCreatedAt: any;
//     directDebitBankAccountId: string;
//     directDebitMandateId: string;
//     directDebitSubscriptionId: string;
// }

// export interface IDirectDebitCustomerLink {
//     customer: string;
// }
