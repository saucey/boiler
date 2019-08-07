import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IAppState } from '../../store/state';
import { Management } from './management';
import { logOut, fetchPermits, fetchPermit, recoverPassword, resetPassword, resetPasswordRequestSuccessful, resetPasswordResetErrors,  } from '../../store/actions';
import { IAppAction } from '../../store/app-action';
import { newUser, IPermitSearchModel } from '../../models';

const mapStateToProps = (state: IAppState) => {
    return {
        client: state.appContainer.client,
        isProcessing: false,
        user: state.appContainer.user ? state.appContainer.user : newUser,
        towns: state.referenceData.siteTowns,
        sites: state.purchaseContainer.siteLocationSearch,
        permits: state.permitsContainer.permits,
        passwordResetSuccessful: state.appContainer.passwordResetSuccessful,
        recoverPasswordGuid: state.appContainer.recoverPasswordGuid,
        resetPasswordErrors: state.appContainer.appError,
        isLoggedIn: state.appContainer.user ? true : false,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IAppAction>) => {
    return {
        logout() {
            dispatch(logOut());
        },
        fetchPermits(searchModel: IPermitSearchModel) {
            dispatch(fetchPermits(searchModel));
        },
        fetchPermit(permitId: string) {
            dispatch(fetchPermit(permitId));
        },
        recoverPassword(email: string) {
            dispatch(recoverPassword(email));
        },
        resetPassword(passwordGuid: any) {
            dispatch(resetPassword(passwordGuid));
        },
        resetRecoverPasswordGuid() {
            dispatch(resetPasswordRequestSuccessful());
        },
        resetPasswordResetErrors() {
            dispatch(resetPasswordResetErrors());
        }
    };
};

export const ManagementContainer = connect(mapStateToProps, mapDispatchToProps)(Management);