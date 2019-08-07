import { ActionsObservable } from 'redux-observable';
import {  of } from 'rxjs';
import {  map } from 'rxjs/operators';
//import { IAppError } from '../../models';
import { IAppAction }from '../app-action';
import { setAppError } from '../actions';

export const appErrorEpic = (action$: ActionsObservable<IAppAction>) => action$.pipe(
    map(({ payload, type }) => {
        //let actionSplit = type.split('_');
        return of(setAppError(payload))
    }));

// export const appErrorEpic = (action$: ActionsObservable<IAppAction>) => action$.pipe(
// map(({ payload, type }) => {
//     let actionSplit = type.split('_');
//     return { payload: payload, actionSplit }; 
// }).pipe(
//         filter(action => {     return action.actionSplit[action.actionSplit.length -1] === 'ERROR'; }),
//         flatMap(({ payload }: { payload: IAppError}) => {  
//             return timer(1000).pipe(
//                 map(()=>{  return setAppError(payload);  
//     })
//             )})
//     );

// export const appErrorEpic2 = (action$: ActionsObservable<IAppAction>) => {
//     return action$.map(({ payload, type }) => { return { payload, type };}).map(action => {
//     let actionSplit = action.type.split('_');
//     return { payload: action.payload, actionSplit }; })
//     .filter(action => {     return action.actionSplit[action.actionSplit.length -1] === 'ERROR'; })
//     .flatMap(({ payload }: { payload: IAppError}) => {  
//         return Observable.timer(1000).map(()=>{ 
//             return setAppError(payload);  
//         });
//         });
//     };