import { IAppAction } from '../app-action';
import { getDefaultDimensionsState, IDimensionsState } from '../state';
import { dimensionsDataStateActions } from '../actions';

const handlers = {
    [dimensionsDataStateActions.SET_FOOTER_HEIGHT]: (state: IDimensionsState, payload: any): IDimensionsState => {
        return { ...state, footerHeight: payload };
    },
}

const dimensionsReducer = (state: IDimensionsState = getDefaultDimensionsState(), action: IAppAction) => {
    return handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action.payload) : state;
};

export default dimensionsReducer;