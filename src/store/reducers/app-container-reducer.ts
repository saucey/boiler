import { IAppAction } from '../app-action';
import { IAppContainerState, getDefaultAppContainerState } from '../state';
import { appContainerStateActions } from '../actions';
// import { newUser } from '../../models';
//import { IAppUser  } from '../../models';

const CLIENT_ID = `${process.env.REACT_APP_CLIENT_ID}`;
const CLIENT_NAME = `${process.env.REACT_APP_CLIENT_NAME}`;

const handlers = {
    [appContainerStateActions.APP_INITIALIZE]: (state: IAppContainerState, payload: any): IAppContainerState => ({
        ...state, client: { clientId: parseInt(CLIENT_ID), clientName: CLIENT_NAME, shouldShowSites: false },
        // user:{ 
        // //    ...defaultUserState,...state.user,emailAddress:payload.emailAddress,token:payload.token 
        // }, 
        isReady: false
    }),
    [appContainerStateActions.APP_INITIALIZING]: (state: IAppContainerState, payload: any): IAppContainerState => ({
        ...state, isReady: false
    }),
    [appContainerStateActions.APP_INITIALIZED]: (state: IAppContainerState, payload: any): IAppContainerState => ({
        ...state, isReady: true
    }),
    [appContainerStateActions.SET_SIDE_MENU_VISIBILITY]: (state: IAppContainerState, payload: any): IAppContainerState => ({
        ...state, isSideMenuOpen: payload
    }),
    [appContainerStateActions.LOG_IN]: (state: IAppContainerState, payload: any): IAppContainerState => ({
        ...state, isReady: true
    }),
    [appContainerStateActions.LOG_IN_SUCCESS]: (state: IAppContainerState, payload: any): IAppContainerState => ({
        ...state, user: { ...payload, isAuthenticated: payload ? true : false }, isReady: true
    }),
    [appContainerStateActions.LOG_IN_ERROR]: (state: IAppContainerState, payload: any): IAppContainerState => ({
        ...state, appError: payload, isReady: true
    }),
    [appContainerStateActions.RESET_PASSWORD_RESET_ERRORS]: (state: IAppContainerState, payload: any): IAppContainerState => ({
        ...state, appError: payload, isReady: true
    }),
    [appContainerStateActions.REGISTER]: (state: IAppContainerState, payload: any): IAppContainerState => ({
        ...state, isReady: true
    }),
    [appContainerStateActions.REGISTER_SUCCESS]: (state: IAppContainerState, payload: any): IAppContainerState => ({
        ...state, user: { ...payload, isAuthenticated: payload ? true : false }, isReady: true
    }),
    [appContainerStateActions.REGISTER_ERROR]: (state: IAppContainerState, payload: any): IAppContainerState => ({
        ...state, appError: payload, isReady: true
    }),
    [appContainerStateActions.INSERT_CARD_CHARGE_ERROR]: (state: IAppContainerState, payload: any): IAppContainerState => ({
        ...state, appError: payload, isReady: true
    }),
    [appContainerStateActions.RESET_ERROR_STATE]: (state: IAppContainerState, payload: any): IAppContainerState => ({
        ...state, appError: null, 
    }),
    [appContainerStateActions.APP_ERROR]: (state: IAppContainerState, payload: any): IAppContainerState => ({
        ...state, appError: payload
    }),
    [appContainerStateActions.LOG_OUT]: (state: IAppContainerState, payload: any): IAppContainerState => ({
        ...state, user: null
    }),
    [appContainerStateActions.PASSWORD_REQUEST_SUCCESSFUL]: (state: IAppContainerState, payload: any): IAppContainerState => ({
        ...state, recoverPasswordGuid : true
    }),
    [appContainerStateActions.RESET_PASSWORD_REQUEST_SUCCESSFUL]: (state: IAppContainerState, payload: any): IAppContainerState => ({
        ...state, recoverPasswordGuid : false
    }),
};

const appContainerReducer = (state: IAppContainerState = getDefaultAppContainerState(), action: IAppAction) => {
    return handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action.payload) : state;
};

export default appContainerReducer;