import { IAppAction } from '../app-action';
import { IAppError, ISiteLookup, IClient, IProductFrequency } from '../../models';

export const referenceDataStateActions = {

    FETCH_REF_DATA_CLIENTS: 'FETCH_REF_DATA_CLIENTS',
    FETCH_REF_DATA_CLIENTS_SUCCESS: 'FETCH_REF_DATA_CLIENTS_SUCCESS',
    FETCH_REF_DATA_CLIENTS_ERROR: 'FETCH_REF_DATA_CLIENTS_ERROR',

    FETCH_PRODUCT_FREQUENCIES: 'FETCH_PRODUCT_FREQUENCIES',
    FETCH_PRODUCT_FREQUENCIES_SUCCESS: 'FETCH_PRODUCT_FREQUENCIES_SUCCESS',
    FETCH_PRODUCT_FREQUENCIES_ERROR: 'FETCH_PRODUCT_FREQUENCIES_ERROR',

    FETCH_REF_DATA_SITE_TOWNS_FOR_CLIENT: 'FETCH_REF_DATA_SITE_TOWNS_FOR_CLIENT',
    FETCH_REF_DATA_SITE_TOWNS_FOR_CLIENT_SUCCESS: 'FETCH_REF_DATA_SITE_TOWNS_FOR_CLIENT_SUCCESS',
    FETCH_REF_DATA_SITE_TOWNS_FOR_CLIENT_ERROR: 'FETCH_REF_DATA_SITE_TOWNS_FOR_CLIENT_ERROR',

    SET_CLIENT: 'SET_CLIENT'
}

export const fetchRefDataClients = (): IAppAction => ({
    type: referenceDataStateActions.FETCH_REF_DATA_CLIENTS
});

export const fetchRefDataClientsSuccess = (clients: Array<IClient>): IAppAction => ({
    type: referenceDataStateActions.FETCH_REF_DATA_CLIENTS_SUCCESS,
    payload: clients
});

export const fetchRefDataClientsError = (appError: IAppError): IAppAction => ({
    type: referenceDataStateActions.FETCH_REF_DATA_CLIENTS_ERROR,
    payload: appError
});

export const fetchRefDataProductFrequencies = (): IAppAction => ({
    type: referenceDataStateActions.FETCH_PRODUCT_FREQUENCIES
});

export const fetchRefDataProductFrequenciesSuccess = (frequencies: Array<IProductFrequency>): IAppAction => ({
    type: referenceDataStateActions.FETCH_PRODUCT_FREQUENCIES_SUCCESS,
    payload: frequencies
});

export const fetchRefDataProductFrequenciesError = (appError: IAppError): IAppAction => ({
    type: referenceDataStateActions.FETCH_PRODUCT_FREQUENCIES_ERROR,
    payload: appError
});

export const fetchRefDataSiteTownsForClient = (): IAppAction => ({
    type: referenceDataStateActions.FETCH_REF_DATA_SITE_TOWNS_FOR_CLIENT
});

export const fetchRefDataSiteTownsForClientSuccess = (sites: Array<ISiteLookup>): IAppAction => ({
    type: referenceDataStateActions.FETCH_REF_DATA_SITE_TOWNS_FOR_CLIENT_SUCCESS,
    payload: sites
});

export const fetchRefDataSiteTownsForClientError = (appError: IAppError): IAppAction => ({
    type: referenceDataStateActions.FETCH_REF_DATA_SITE_TOWNS_FOR_CLIENT_ERROR,
    payload: appError
});

export const setClient = (clientId: number): IAppAction => ({
    type: referenceDataStateActions.SET_CLIENT,
    payload: clientId
});

