import { IAppAction } from '../app-action';
import { IAppError, IPermitProduct, IProductSearchModel, ICustomer, ISiteLookup, ISiteLocationSearchModel, IPurchase, IPermit, ITown, IPreProduct } from '../../models';
import { IPermitEditForm } from '../../models/permit-forms';

export const purchaseDataStateActions = {
    FETCH_SITES_FOR_CLIENT_BY_LOCATION: 'FETCH_SITES_FOR_CLIENT_BY_LOCATION',
    FETCH_SITES_FOR_CLIENT_BY_LOCATION_SUCCESS: 'FETCH_SITES_FOR_CLIENT_BY_LOCATION_SUCCESS',
    FETCH_SITES_FOR_CLIENT_BY_LOCATION_ERROR: 'FETCH_SITES_FOR_CLIENT_BY_LOCATION_ERROR',

    FETCH_PERMIT_PRODUCTS_FOR_SITE: 'FETCH_PERMIT_PRODUCTS_FOR_SITE',
    FETCH_PERMIT_PRODUCTS_FOR_SITE_SUCCESS: 'FETCH_PERMIT_PRODUCTS_FOR_SITE_SUCCESS',
    FETCH_PERMIT_PRODUCTS_FOR_SITE_ERROR: 'FETCH_PERMIT_PRODUCTS_FOR_SITE_ERROR',

    CLEAR_PRODUCTS_FOR_SITE: 'CLEAR_PRODUCTS_FOR_SITE',

    FETCH_PERMIT_PRODUCT: 'FETCH_PERMIT_PRODUCT',
    FETCH_PERMIT_PRODUCT_SUCCESS: 'FETCH_PERMIT_PRODUCT_SUCCESS',
    FETCH_PERMIT_PRODUCT_ERROR: 'FETCH_PERMIT_PRODUCT_ERROR',

    FETCH_CUSTOMER: 'FETCH_CUSTOMER',
    FETCH_CUSTOMER_SUCCESS: 'FETCH_CUSTOMER_SUCCESS',
    FETCH_CUSTOMER_ERROR: 'FETCH_CUSTOMER_ERROR',

    UPSERT_CUSTOMER: 'UPSERT_CUSTOMER',
    UPSERT_CUSTOMER_SUCCESS: 'UPSERT_CUSTOMER_SUCCESS',
    UPSERT_CUSTOMER_ERROR: 'UPSERT_CUSTOMER_ERROR',

    NEW_CUSTOMER: 'NEW_CUSTOMER',

    UPLOAD_BANK_DETAILS: 'UPLOAD_BANK_DETAILS',
    UPLOAD_BANK_DETAILS_SUCCESS: 'UPLOAD_BANK_DETAILS_SUCCESS',
    UPLOAD_BANK_DETAILS_ERROR: 'UPLOAD_BANK_DETAILS_ERROR',

    PAY_BY_CARD: 'PAY_BY_CARD',
    PAY_BY_CARD_SUCCESS: 'PAY_BY_CARD_SUCCESS',
    PAY_BY_CARD_ERROR: 'PAY_BY_CARD_ERROR',

    UPSERT_PERMIT: 'UPSERT_PERMIT',
    UPSERT_PERMIT_UPDATE: 'UPSERT_PERMIT_UPDATE',
    UPSERT_PERMIT_SUCCESS_UPDATE: 'UPSERT_PERMIT_SUCCESS_UPDATE',
    UPSERT_PERMIT_SUCCESS: 'UPSERT_PERMIT_SUCCESS',
    UPSERT_PERMIT_ERROR: 'UPSERT_PERMIT_ERROR',
    RESET_TOWN: 'RESET_TOWN',
    NEW_PURCHASE: 'NEW_PURCHASE',
    UPDATE_PENDING_CARD_PAYMENT: 'UPDATE_PENDING_CARD_PAYMENT',
    RESET_PURCHASE_UPDATE: 'RESET_PURCHASE_UPDATE',
    RESET_PURCHASE_STATE: 'RESET_PURCHASE_STATE',
    FETCH_PRE_PRODUCT_SUCCESS: 'FETCH_PRE_PRODUCT_SUCCESS',
}

export const fetchSitesForClientByLocation = (searchModel: ISiteLocationSearchModel, purchase: IPurchase): IAppAction => ({
    type: purchaseDataStateActions.FETCH_SITES_FOR_CLIENT_BY_LOCATION,
    payload: { searchModel, purchase }
});

export const resetPurchaseState = (): IAppAction => ({
    type: purchaseDataStateActions.RESET_PURCHASE_STATE,
    payload: null
});

export const fetchSitesForClientByLocationSuccess = (sites: Array<ISiteLookup>, town: ITown): IAppAction => ({
    type: purchaseDataStateActions.FETCH_SITES_FOR_CLIENT_BY_LOCATION_SUCCESS,
    payload: { sites, town }
});

export const resetTown = (): IAppAction => ({
    type: purchaseDataStateActions.RESET_TOWN,
    payload: {}
});

export const fetchSitesForClientByLocationError = (appError: IAppError): IAppAction => ({
    type: purchaseDataStateActions.FETCH_SITES_FOR_CLIENT_BY_LOCATION_ERROR,
    payload: appError
});

export const fetchPermitProductsForSite = (searchModel: IProductSearchModel): IAppAction => ({
    type: purchaseDataStateActions.FETCH_PERMIT_PRODUCTS_FOR_SITE,
    payload: searchModel
});

export const fetchPermitProductsForSiteSuccess = (products: Array<IPermitProduct>): IAppAction => ({
    type: purchaseDataStateActions.FETCH_PERMIT_PRODUCTS_FOR_SITE_SUCCESS,
    payload: products
});

export const fetchPermitProductsForSiteError = (appError: IAppError): IAppAction => ({
    type: purchaseDataStateActions.FETCH_PERMIT_PRODUCTS_FOR_SITE_ERROR,
    payload: appError
});

export const clearProductsForSite = (): IAppAction => ({
    type: purchaseDataStateActions.CLEAR_PRODUCTS_FOR_SITE
});

export const fetchPermitProduct = (productId: string): IAppAction => ({
    type: purchaseDataStateActions.FETCH_PERMIT_PRODUCT,
    payload: productId
});

export const fetchPermitProductSuccess = (product: IPermitProduct): IAppAction => ({
    type: purchaseDataStateActions.FETCH_PERMIT_PRODUCT_SUCCESS,
    payload: product
});

export const fetchPreProductSuccess = (product: IPreProduct): IAppAction => ({
    type: purchaseDataStateActions.FETCH_PRE_PRODUCT_SUCCESS,
    payload: product
});

export const fetchPermitProductError = (appError: IAppError): IAppAction => ({
    type: purchaseDataStateActions.FETCH_PERMIT_PRODUCT_ERROR,
    payload: appError
});

export const fetchCustomer = (customerId: number): IAppAction => ({
    type: purchaseDataStateActions.FETCH_CUSTOMER,
    payload: customerId
});

export const fetchCustomerSuccess = (customer: ICustomer): IAppAction => ({
    type: purchaseDataStateActions.FETCH_CUSTOMER_SUCCESS,
    payload: customer
});

export const fetchCustomerError = (appError: IAppError): IAppAction => ({
    type: purchaseDataStateActions.FETCH_CUSTOMER_ERROR,
    payload: appError
});


export const upsertCustomer = (customerId: number, customer: ICustomer): IAppAction => ({
    type: purchaseDataStateActions.UPSERT_CUSTOMER,
    payload: { customerId, customer }
});

export const upsertCustomerSuccess = (customer: ICustomer): IAppAction => ({
    type: purchaseDataStateActions.UPSERT_CUSTOMER_SUCCESS,
    payload: customer
});

export const upsertCustomerError = (appError: IAppError): IAppAction => ({
    type: purchaseDataStateActions.UPSERT_CUSTOMER_ERROR,
    payload: appError
});

export const newCustomer = (customer: ICustomer): IAppAction => ({
    type: purchaseDataStateActions.NEW_CUSTOMER,
    payload: customer
});

export const newPurchase = (purchase: IPurchase): IAppAction => ({
    type: purchaseDataStateActions.NEW_PURCHASE,
    payload: purchase
});

export const updatePendingCardPayment = (pendingPayment: boolean): IAppAction => ({
    type: purchaseDataStateActions.UPDATE_PENDING_CARD_PAYMENT,
    payload: pendingPayment
});

// export const upsertPermit = (permitId: number, purchase: IPurchase, isNew: boolean): IAppAction => ({
//     type: purchaseDataStateActions.UPSERT_PERMIT,
//     payload: { permitId, purchase }
// });

export const upsertPermitUpdate = (permitId: number, permitForm: IPermit): IAppAction => ({
    type: purchaseDataStateActions.UPSERT_PERMIT_UPDATE,
    payload: { permitId, permitForm }
});

export const resetPurchaseUpdate = (reset: boolean): IAppAction => ({
    type: purchaseDataStateActions.RESET_PURCHASE_UPDATE,
    payload: { reset }
});

export const upsertPermit = (permitId: number, permitForm: IPermitEditForm, isNew: boolean, paymentAmount: number, payingDeposit: boolean): IAppAction => ({
    type: purchaseDataStateActions.UPSERT_PERMIT,
    payload: { permitId, permitForm, isNew, paymentAmount, payingDeposit }
});

export const upsertPermitSuccess = (permit: IPermit, isNew: boolean): IAppAction => ({
    type: purchaseDataStateActions.UPSERT_PERMIT_SUCCESS,
    payload: { permit, isNew }
});

export const upsertPermitSuccessUpdate = (permit: IPermit): IAppAction => ({
    type: purchaseDataStateActions.UPSERT_PERMIT_SUCCESS_UPDATE,
    payload: { permit }
});


export const upsertPermitError = (appError: IAppError): IAppAction => ({
    type: purchaseDataStateActions.UPSERT_PERMIT_ERROR,
    payload: appError
});

export const uploadBankDetails = (permitId: number, purchase: IPurchase, isNew: boolean): IAppAction => ({
    type: purchaseDataStateActions.UPLOAD_BANK_DETAILS,
    payload: { permitId, purchase }
});

export const uploadBankDetailsSuccess = (permit: IPermit, isNew: boolean): IAppAction => ({
    type: purchaseDataStateActions.UPLOAD_BANK_DETAILS_SUCCESS,
    payload: { permit, isNew }
});

export const uploadBankDetailsError = (appError: IAppError): IAppAction => ({
    type: purchaseDataStateActions.UPLOAD_BANK_DETAILS_ERROR,
    payload: appError
});

export const payByCard = (permitId: number, purchase: IPurchase, isNew: boolean): IAppAction => ({
    type: purchaseDataStateActions.PAY_BY_CARD,
    payload: { permitId, purchase }
});

export const payByCardSuccess = (permit: IPermit, isNew: boolean): IAppAction => ({
    type: purchaseDataStateActions.PAY_BY_CARD_SUCCESS,
    payload: { permit, isNew }
});

export const payByCardError = (appError: IAppError): IAppAction => ({
    type: purchaseDataStateActions.PAY_BY_CARD_ERROR,
    payload: appError
});

