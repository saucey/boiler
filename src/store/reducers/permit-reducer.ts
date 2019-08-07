import { IAppAction } from '../app-action';
import { IPermitState, getDefaultPermitDataState } from '../state';
import { permitDataStateActions } from '../actions';

const handlers = {
[permitDataStateActions.FETCH_PERMIT]: (state: IPermitState, payload: any): IPermitState => {
    return { ...state, permit:null  }; 
    },
[permitDataStateActions.FETCH_PERMIT_SUCCESS]: (state: IPermitState, payload: any): IPermitState => {
    return { ...state, permit: payload }; 
    },
[permitDataStateActions.FETCH_PERMIT_ERROR]: (state: IPermitState, payload: any): IPermitState => {
    return { ...state, permit:null }; 
    },

// [permitDataStateActions.UPSERT_PERMIT]: (state: IPermitState, payload: any): IPermitState => {
//     return { ...state, isProcessing: true, isSuccess: false}; 
// },
// [permitDataStateActions.UPSERT_PERMIT_SUCCESS]: (state: IPermitState, payload: any): IPermitState => {
//      return { ...state, permit: payload.permit, isProcessing: false, isSuccess: true }; 
// },
// [permitDataStateActions.UPSERT_PERMIT_ERROR]: (state: IPermitState, payload: any): IPermitState => {
//      return { ...state, isProcessing: false, isSuccess: false }; 
// },
[permitDataStateActions.RESET_IS_SUCCESS]: (state: IPermitState, payload: any): IPermitState => {
    return { ...state, isSuccess: false }; 
},
}

const permitReducer = (state: IPermitState = getDefaultPermitDataState(), action: IAppAction) => {
      return handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action.payload): state;
};

export default permitReducer;