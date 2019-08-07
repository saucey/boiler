import { IAppAction } from '../app-action';
import { IPermitNewState, getDefaultPermitNewDataState } from '../state';
import { permitDataStateActions } from '../actions';
import { IPermit, ICustomer } from '../../models';

const handlers = {
[permitDataStateActions.NEW_PERMIT]: (state: IPermitNewState, payload: any): IPermitNewState => {
        let permit: IPermit = payload.permit;
        let customer: ICustomer | null = payload.customer;
        if (customer){
                permit.customer = customer;
                permit.client = customer.client;
        }
        let newPermit:IPermit = {...permit};
        return { ...state, permit:newPermit, isProcessing: true  }; 
     }
}

const permitNewReducer = (state: IPermitNewState = getDefaultPermitNewDataState(), action: IAppAction) => {
      return handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action.payload): state;
};

export default permitNewReducer;