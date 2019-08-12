import { ActionsObservable, StateObservable, ofType } from "redux-observable";
import { Observable, of } from "rxjs";
import { mergeMap, map, catchError, switchMap } from "rxjs/operators";
import { IEpicDependency, IAppUser } from "../../models";
import { appContainerStateActions, loginSuccess, loginError, passwordRequestSuccessful, /*loginPurchaseSuccess*/ 
fetchCustomerProduct} from "../actions";
import { IAppAction } from "../app-action";
import { IAppState } from "../state";

export const appPasswordResetrequestEpic = (action$: ActionsObservable<IAppAction>, state$: StateObservable<IAppState>, { api, endPointKeys }: IEpicDependency): Observable<IAppAction> => action$.pipe(
    ofType(appContainerStateActions.RECOVER_PASSWORD),
    mergeMap(({ payload }) => {

        const data = {
            'email': payload
        }

        return api.post(endPointKeys.base, 'ResetPassword/PasswordResetRequest', data).pipe(
            map(res => {
                console.log(res, 'res from reset password')
                return res.data
            }),            
            switchMap((user: IAppUser) => [
                passwordRequestSuccessful(),
                fetchCustomerProduct(user.userId)
            ]),
            catchError(error => {
                //const appError: IAppError = { error, message:'Failed to get authorisation from the API'};
                return of(loginError(error));
            })
        );
    }));

    export const appResetPasswordEpic = (action$: ActionsObservable<IAppAction>, state$: StateObservable<IAppState>, { api, endPointKeys }: IEpicDependency): Observable<IAppAction> => action$.pipe(
        ofType(appContainerStateActions.RESET_PASSWORD),
        mergeMap(({ payload }) => {
    
            return api.post(endPointKeys.base, 'ResetPassword/PasswordSet', payload).pipe(
                map(res => res.data),
                map((user: IAppUser) => {
                    
                    return loginSuccess(user) /* && loginPurchaseSuccess(user.customer)*/;
                    
                }),
                catchError(error => {
                    //const appError: IAppError = { error, message:'Failed to get authorisation from the API'};
                    return of(loginError(error));
                })
            );
        }));

// export const appRegisterEpic = (action$: ActionsObservable<IAppAction>, state$: StateObservable<IAppState>, { api, endPointKeys }: IEpicDependency): Observable<IAppAction> => action$.pipe(
//     ofType(appContainerStateActions.REGISTER),
//     mergeMap(({ payload }) => {

//         // console.log(payload, 'The registered payload!!!');
//         // let a = JSON.stringify(payload.customerForm);
//         // console.log(a, 'the json stringy!!!');

//         return api.post(endPointKeys.base, 'Register', payload).pipe(
//             map(res => res.data),
//             map((user: IAppUser) => registerSuccess(user)),
//             catchError(error => {
//                 //const appError: IAppError = { error, message:'Failed to get authorisation from the API'};
//                 return of(registerError(error));
//             })
//         );
//     }));

