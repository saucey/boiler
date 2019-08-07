import { IAppAction } from '../app-action';
import { IReferenceDataState, getDefaultReferenceDataState } from '../state';
import { referenceDataStateActions } from '../actions';

const handlers = {
    [referenceDataStateActions.FETCH_REF_DATA_CLIENTS]: (state: IReferenceDataState, payload: any): IReferenceDataState => {
        return { ...state, clients: [] }; 
    },
    [referenceDataStateActions.FETCH_REF_DATA_CLIENTS_SUCCESS]: (state: IReferenceDataState, payload: any): IReferenceDataState => {
        return { ...state, clients: payload }; 
    },
    [referenceDataStateActions.FETCH_REF_DATA_CLIENTS_ERROR]: (state: IReferenceDataState, payload: any): IReferenceDataState => {
        return { ...state, clients: []}; 
    },

    [referenceDataStateActions.FETCH_PRODUCT_FREQUENCIES]: (state: IReferenceDataState, payload: any): IReferenceDataState => {
        return { ...state, productFrequencies: []  }; 
    },
    [referenceDataStateActions.FETCH_PRODUCT_FREQUENCIES_SUCCESS]: (state: IReferenceDataState, payload: any): IReferenceDataState => {
        return { ...state, productFrequencies: payload }; 
    },
    [referenceDataStateActions.FETCH_PRODUCT_FREQUENCIES_ERROR]: (state: IReferenceDataState, payload: any): IReferenceDataState => {
        return { ...state, productFrequencies: []}; 
    },

    [referenceDataStateActions.FETCH_REF_DATA_SITE_TOWNS_FOR_CLIENT]: (state: IReferenceDataState, payload: any): IReferenceDataState => {
        return { ...state,  siteTowns: [] }; 
    },
    [referenceDataStateActions.FETCH_REF_DATA_SITE_TOWNS_FOR_CLIENT_SUCCESS]: (state: IReferenceDataState, payload: any): IReferenceDataState => {
        return { ...state, siteTowns: payload }; 
    },
    [referenceDataStateActions.FETCH_REF_DATA_SITE_TOWNS_FOR_CLIENT_ERROR]: (state: IReferenceDataState, payload: any): IReferenceDataState => {
        return { ...state, siteTowns: []}; 
    },
};

const referenceDataReducer = (state: IReferenceDataState = getDefaultReferenceDataState(), action: IAppAction) => {
      return handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action.payload): state;
}; 

export default referenceDataReducer; 