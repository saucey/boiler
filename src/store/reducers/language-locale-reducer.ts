import { IAppAction } from '../app-action';
import { getDefaultLanguageLocaleState, ILanguageLocaleState } from '../state';
import { languageLocaleActions } from '../actions';

const handlers = {
[languageLocaleActions.SET_LANGUAGE]: (state: ILanguageLocaleState, payload: string): ILanguageLocaleState => {
    return { ...state, language: payload, languageHasToggled: true  }; 
    },
}

const languageLocaleReducer = (state: ILanguageLocaleState = getDefaultLanguageLocaleState(), action: IAppAction) => {
      return handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action.payload): state;
};

export default languageLocaleReducer;