import { ICustomer, IPayment } from "../../models";
import { IBankAccountAndSubscriptionResult, IDirectDebitBankAccount } from "../../models/direct-debits";

export interface IPaymentState {
  payment: IPayment | null;
  isProcessing : boolean;
  isSaved: boolean;
  status: string;
  directDebitBankAccounts: Array<IDirectDebitBankAccount>;
  directDebitCustomerId: string;
  directDebitBankAccount: IBankAccountAndSubscriptionResult;
  customer: ICustomer | null;
  paymentStore: IPayment | null;
  error: null;
}

const defaultState: IPaymentState = {
    payment: null,
    isProcessing: false,
    isSaved: false,
    status: '',
    directDebitBankAccounts: [],
    directDebitCustomerId: null,
    directDebitBankAccount: null,
    customer: null,
    paymentStore: null,
    error: null,
}

export const getDefaultPaymentDataState = (options?: any) => { return {...defaultState,...options }; };