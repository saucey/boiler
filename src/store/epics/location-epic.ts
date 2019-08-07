import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { IAppAction } from '../app-action';
import { IAppState } from '../state';
import { IEpicDependency, IAppError } from'../../models';
import { locationDataStateActions, fetchGeoLocationSuccess, fetchGeoLocationError } from '../actions';

function geolocationObservable(options) {
    return new Observable(observer => {      
        const id = navigator.geolocation.watchPosition(
            (position) => {
                observer.next(position);
            },
            error => {
                observer.error(error);
            },
            options
        );
        // Our teardown function. Will be called if they unsubscribe
        return () => {
            navigator.geolocation.clearWatch(id);
        };
    });
}

const currentPosition$ = geolocationObservable({ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
//currentPosition2$.subscribe(e => console.log(e));

//const currentPosition$ = geolocationObservable({ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });

export const fetchGeoLocationEpic = (action$: ActionsObservable<IAppAction>, state$: StateObservable<IAppState>, { api, endPointKeys }: IEpicDependency): 
Observable<IAppAction> => action$.pipe(
    ofType(locationDataStateActions.FETCH_GEOLOCATION),
    mergeMap(() => currentPosition$.pipe(        
        mergeMap((position : any)  => { 
            return of(fetchGeoLocationSuccess({latitude: position.coords.latitude, longitude: position.coords.longitude}));
        }),
        catchError(error => {
            const appError: IAppError = { error, message:'Failed to fetch geolocation'};
            return of(fetchGeoLocationError(appError));
        })        
    ))
)