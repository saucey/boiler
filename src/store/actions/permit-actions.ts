import { IAppAction } from '../app-action';
import { IAppError,IPermit, IPermitSearchModel, ICustomer, IVrm } from '../../models';

export const permitDataStateActions = {
FETCH_PERMITS: 'FETCH_PERMITS',
FETCH_PERMITS_SUCCESS: 'FETCH_PERMITS_SUCCESS',
FETCH_PERMITS_ERROR: 'FETCH_PERMITS_ERROR',

FETCH_PERMIT: 'FETCH_PERMIT',
FETCH_PERMIT_SUCCESS: 'FETCH_PERMIT_SUCCESS',
FETCH_PERMIT_ERROR: 'FETCH_PERMIT_ERROR',

NEW_PERMIT: 'NEW_PERMIT',

UPSERT_PERMIT_VRM: 'UPSERT_PERMIT_VRM',
UPSERT_PERMIT_VRM_SUCCESS: 'UPSERT_PERMIT_VRM_SUCCESS',
UPSERT_PERMIT_VRM_ERROR: 'UPSERT_PERMIT_VRM_ERROR',

DELETE_PERMIT_VRM: 'DELETE_PERMIT_VRM',
DELETE_PERMIT_VRM_SUCCESS: 'DELETE_PERMIT_VRM_SUCCESS',
DELETE_PERMIT_VRM_ERROR: 'DELETE_PERMIT_VRM_ERROR',

RESET_IS_SUCCESS: 'RESET_IS_SUCCESS'
}

export const fetchPermits = (searchModel: IPermitSearchModel): IAppAction => ({
    type: permitDataStateActions.FETCH_PERMITS,
    payload: searchModel
});

export const fetchPermitsSuccess = (permits: Array<IPermit>): IAppAction => ({
    type: permitDataStateActions.FETCH_PERMITS_SUCCESS,
    payload: permits
 });
    
 export const fetchPermitsError = (appError: IAppError): IAppAction => ({
    type: permitDataStateActions.FETCH_PERMITS_ERROR,
    payload: appError
});


export const fetchPermit = (permitId: string): IAppAction => ({
    type: permitDataStateActions.FETCH_PERMIT,
    payload: permitId
});

export const fetchPermitSuccess = (permit: IPermit): IAppAction => ({
    type: permitDataStateActions.FETCH_PERMIT_SUCCESS,
    payload: permit
});
    
 export const fetchPermitError = (appError: IAppError): IAppAction => ({
    type: permitDataStateActions.FETCH_PERMIT_ERROR,
    payload: appError
});

export const newPermit = (permit: IPermit, customer: ICustomer | null): IAppAction => ({
    type: permitDataStateActions.NEW_PERMIT,
    payload: { permit, customer }
});

export const upsertPermitVrm = (vrm: IVrm): IAppAction => ({
    type: permitDataStateActions.UPSERT_PERMIT_VRM,
    payload: vrm
});

export const upsertPermitVrmSuccess = (vrm: IVrm): IAppAction => ({
    type: permitDataStateActions.UPSERT_PERMIT_VRM_SUCCESS,
    payload: vrm
});
    
 export const upsertPermitVrmError = (appError: IAppError): IAppAction => ({
    type: permitDataStateActions.UPSERT_PERMIT_VRM_ERROR,
    payload: appError
});

export const deletePermitVrm = (vrm: IVrm): IAppAction => ({
    type: permitDataStateActions.UPSERT_PERMIT_VRM,
    payload: vrm
});

export const deletePermitVrmSuccess = (vrm: IVrm): IAppAction => ({
    type: permitDataStateActions.UPSERT_PERMIT_VRM_SUCCESS,
    payload: vrm
});
    
 export const deletePermitVrmError = (appError: IAppError): IAppAction => ({
    type: permitDataStateActions.UPSERT_PERMIT_VRM_ERROR,
    payload: appError
});

export const resetIsSuccess = (): IAppAction => ({
    type: permitDataStateActions.RESET_IS_SUCCESS
});