import { IAppAction } from '../app-action';
import { IAppError } from '../../models';
import { IGeoLocation } from '../../models/geolocation';

export const locationDataStateActions = {
FETCH_GEOLOCATION: 'FETCH_GEOLOCATION',
FETCH_GEOLOCATION_SUCCESS: 'FETCH_GEOLOCATION_SUCCESS',
FETCH_GEOLOCATION_ERROR: 'FETCH_GEOLOCATION_ERROR',
}

export const fetchGeoLocation = (): IAppAction => ({
    type: locationDataStateActions.FETCH_GEOLOCATION
});

export const fetchGeoLocationSuccess = (geoLocation: IGeoLocation): IAppAction => ({
    type: locationDataStateActions.FETCH_GEOLOCATION_SUCCESS,
    payload: geoLocation
 });
    
 export const fetchGeoLocationError = (appError: IAppError): IAppAction => ({
    type: locationDataStateActions.FETCH_GEOLOCATION_ERROR,
    payload: appError
});

