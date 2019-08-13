import { IAppAction } from '../app-action';
// import { IAppError, IAppUser} from '../../models';
import { IAppError, IAppUser, ICustomerAddForm } from '../../models';

export const appContainerStateActions = {
    APP_INITIALIZE: 'APP_INITIALIZE',
    APP_INITIALIZING: 'APP_INITIALIZING',
    APP_INITIALIZED: 'APP_INITIALIZED',
    APP_INITIALIZING_COMPLETE: 'APP_INITIALIZING_COMPLETE',
    APP_NOT_YET_READY: 'APP_NOT_YET_READY',
    APP_ERROR: 'APP_ERROR',
    FETCH_USER: 'FETCH_USER',
    FETCH_USER_SUCCESS: 'FETCH_USER_SUCCESS',
    FETCH_USER_ERROR: 'FETCH_USER_ERROR',
    SET_SIDE_MENU_VISIBILITY: 'SET_SIDE_MENU_VISIBILITY',
    LOG_IN: 'LOG_IN',
    LOG_IN_SUCCESS: 'LOG_IN_SUCCESS',
    LOG_IN_ERROR: 'LOG_IN_ERROR',
    REGISTER: 'REGISTER',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    REGISTER_ERROR: 'REGISTER_ERROR',
    LOG_OUT: 'LOG_OUT',
    LOGIN_PURCHASE_SUCCESS: 'LOGIN_PURCHASE_SUCCESS',
    INSERT_CARD_CHARGE_ERROR: 'INSERT_CARD_CHARGE_ERROR',
    RESET_ERROR_STATE: 'RESET_ERROR_STATE',
    RECOVER_PASSWORD: 'RECOVER_PASSWORD',
    RESET_PASSWORD: 'RESET_PASSWORD',
    PASSWORD_REQUEST_SUCCESSFUL: 'PASSWORD_REQUEST_SUCCESSFUL',
    RESET_PASSWORD_REQUEST_SUCCESSFUL: 'RESET_PASSWORD_REQUEST_SUCCESSFUL',
    RESET_PASSWORD_RESET_ERRORS: 'RESET_PASSWORD_RESET_ERRORS',
    FETCH_CUSTOMER_PRODUCT: 'FETCH_CUSTOMER_PRODUCT'
}

export const initialize = (userAuth: { userName: string, password: string }): IAppAction => ({
    type: appContainerStateActions.APP_INITIALIZE,
    payload: userAuth
});

export const initializing = (): IAppAction => ({
    type: appContainerStateActions.APP_INITIALIZING,
});

export const initialized = (): IAppAction => ({
    type: appContainerStateActions.APP_INITIALIZED
});

export const initializingComplete = (): IAppAction => ({
    type: appContainerStateActions.APP_INITIALIZING_COMPLETE
});

export const notYetReady = (): IAppAction => ({
    type: appContainerStateActions.APP_NOT_YET_READY
});

export const setAppError = (appError: IAppError): IAppAction => ({
    type: appContainerStateActions.APP_ERROR,
    payload: appError
});

export const fetchUser = (): IAppAction => ({
    type: appContainerStateActions.FETCH_USER
});

export const fetchUserSuccess = (user: IAppUser): IAppAction => ({
    type: appContainerStateActions.FETCH_USER_SUCCESS,
    payload: user
});

export const fetchUserError = (appError: IAppError): IAppAction => ({
    type: appContainerStateActions.FETCH_USER_ERROR,
    payload: appError
});

export const setSideMenuVisibility = (open: boolean): IAppAction => ({
    type: appContainerStateActions.SET_SIDE_MENU_VISIBILITY,
    payload: open
});

export const logIn = (userAuth: { userName: string, password: string }): IAppAction => ({
    type: appContainerStateActions.LOG_IN,
    payload: userAuth
});

export const loginSuccess = (user: IAppUser): IAppAction => ({
    type: appContainerStateActions. LOG_IN_SUCCESS,
    payload: user
});

export const fetchCustomerProduct = (customerId: number): IAppAction => ({
    type: appContainerStateActions. FETCH_CUSTOMER_PRODUCT,
    payload: {customerId}
});


export const loginError = (appError: IAppError): IAppAction => ({
    type: appContainerStateActions.LOG_IN_ERROR,
    payload: appError
});

export const register = (customerForm: ICustomerAddForm): IAppAction => ({
    type: appContainerStateActions.REGISTER,
    payload: customerForm
});

export const registerSuccess = (user: IAppUser): IAppAction => ({
    type: appContainerStateActions.REGISTER_SUCCESS,
    payload: user
});

export const registerError = (appError: IAppError): IAppAction => ({
    type: appContainerStateActions.REGISTER_ERROR,
    payload: appError
});

export const insertCardChargeError = (appError: IAppError): IAppAction => ({
    type: appContainerStateActions.INSERT_CARD_CHARGE_ERROR,
    payload: appError
});

export const resetErrorState = (): IAppAction => ({
    type: appContainerStateActions.RESET_ERROR_STATE,
    payload: null
});

export const logOut = (): IAppAction => ({
    type: appContainerStateActions.LOG_OUT
});

export const recoverPassword = (email: string): IAppAction => ({
    type: appContainerStateActions.RECOVER_PASSWORD,
    payload: email 
});

export const resetPassword = (passwordGuid: any): IAppAction => ({
    type: appContainerStateActions.RESET_PASSWORD,
    payload: passwordGuid 
});

export const passwordRequestSuccessful = (): IAppAction => ({
    type: appContainerStateActions.PASSWORD_REQUEST_SUCCESSFUL,
    payload: null 
});

export const resetPasswordRequestSuccessful = (): IAppAction => ({
    type: appContainerStateActions.RESET_PASSWORD_REQUEST_SUCCESSFUL,
    payload: null 
});

export const resetPasswordResetErrors = (): IAppAction => ({
    type: appContainerStateActions.RESET_PASSWORD_RESET_ERRORS,
    payload: null 
});




    // export const loginPurchaseSuccess = (customer) => ({
    //     type: purchaseDataStateActions.LOGIN_PURCHASE_SUCCESS,
    //     payload: customer
    // });

    // export const loginPurchaseSuccess = (customer) => {
    //     console.log(customer, 'the customer');
    // };