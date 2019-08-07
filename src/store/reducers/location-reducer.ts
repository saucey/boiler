import { IAppAction } from '../app-action';
import { getDefaultLocationDataState, ILocationState } from '../state';
import { locationDataStateActions } from '../actions';

const handlers = {
[locationDataStateActions.FETCH_GEOLOCATION]: (state: ILocationState, payload: any): ILocationState => {
    return { ...state, location:null  }; 
    },
[locationDataStateActions.FETCH_GEOLOCATION_SUCCESS]: (state: ILocationState, payload: any): ILocationState => {
    return { ...state, location: payload }; 
    },
[locationDataStateActions.FETCH_GEOLOCATION_ERROR]: (state: ILocationState, payload: any): ILocationState => {
    return { ...state, location:null }; 
    },
}

const locationReducer = (state: ILocationState = getDefaultLocationDataState(), action: IAppAction) => {
      return handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action.payload): state;
};

export default locationReducer;