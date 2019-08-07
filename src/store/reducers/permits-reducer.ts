import { IAppAction } from '../app-action';
import { IPermitsState, getDefaultPermitsDataState } from '../state';
import { permitDataStateActions } from '../actions';

const handlers = {
    [permitDataStateActions.FETCH_PERMITS]: (state: IPermitsState, payload: any): IPermitsState => {
        return { ...state }; 
        },
    [permitDataStateActions.FETCH_PERMITS_SUCCESS]: (state: IPermitsState, payload: any): IPermitsState => {
        return { ...state, permits: payload }; 
        },
    [permitDataStateActions.FETCH_PERMITS_ERROR]: (state: IPermitsState, payload: any): IPermitsState => {
        return { ...state, permits:[] }; 
        }
    }

const permitsReducer = (state: IPermitsState = getDefaultPermitsDataState(), action: IAppAction) => {
      return handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action.payload): state;
};

export default permitsReducer;