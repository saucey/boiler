import { IAppAction } from '../app-action';
import { paymentDataStateActions } from '../actions';
import { IPaymentState, getDefaultPaymentDataState } from '../state';

const handlers = {
    [paymentDataStateActions.INSERT_DIRECT_DEBIT_CUSTOMER_SUCCESS]: (state: IPaymentState, payload: any): IPaymentState => {
        return { ...state, customer: payload, isSaved: true, isProcessing: true, status: "Direct debit successful customer" };
    },

    [paymentDataStateActions.INSERT_DIRECT_DEBIT_SUBSCRIPTION_SUCCESS]: (state: IPaymentState, payload: any): IPaymentState => {
        return { ...state, directDebitBankAccount: payload, isSaved: true, isProcessing: false, status: "Direct debit successful" };
    },
    [paymentDataStateActions.RESET_PAYMENT_STATE]: (state: IPaymentState, payload: any): IPaymentState => {
        return { ...state, paymentStore: null, payment: null, isSaved: false, isProcessing: false, status: "Reset" };
    },

    [paymentDataStateActions.INSERT_DIRECT_DEBIT_SUBSCRIPTION_ERROR]: (state: IPaymentState, payload: any): IPaymentState => {
        return { ...state, isSaved: false, directDebitBankAccount: null, isProcessing: false, payment: null, status: "Direct debit failed" };
    },
    
    [paymentDataStateActions.INSERT_DIRECT_DEBIT_SUBSCRIPTION]: (state: IPaymentState, payload: any): IPaymentState => {
        return { ...state, directDebitBankAccount: null, isProcessing: true, isSaved: false, status: "Processing direct debit" };
    },
    [paymentDataStateActions.INSERT_CARD_CHARGE_SUCCESS]: (state: IPaymentState, payload: any): IPaymentState => {
        return { ...state, payment: payload, isSaved: true, isProcessing: false, status: "Payment successful" };
    },
    [paymentDataStateActions.SAVE_PAYMENT_TO_LOCAL_ACTION]: (state: IPaymentState, payload: any): IPaymentState => {
        return { ...state, paymentStore: payload};
    },
}

const paymentReducer = (state: IPaymentState = getDefaultPaymentDataState(), action: IAppAction) => {
    return handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action.payload) : state;
};

export default paymentReducer;