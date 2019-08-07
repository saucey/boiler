import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IAppState } from '../../store/state';
import { PermitManagement } from './permit-management';
import { logOut, upsertPermitUpdate, resetPurchaseUpdate } from '../../store/actions';
import { IAppAction } from '../../store/app-action';
// import { IPermitEditForm } from '../../models/permit-forms';
import { IPermit } from '../../models';

const mapStateToProps = (state: IAppState) => {
    // console.log(state, 'the modificatiosn for permit')
    return {
        permit: state.permitContainer.permit,
        purchaseUpdate: state.purchaseContainer.purchaseUpdate
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IAppAction>) => {
    return {
        logout() {
            dispatch(logOut());
        },

        permitUpdate(permitId: number, form: IPermit) {
            dispatch(upsertPermitUpdate(permitId, form));
        },

        resetPurchaseUpdate() {
            dispatch(resetPurchaseUpdate(false));
        }

    };
};

export const PermitManagementContainer = connect(mapStateToProps, mapDispatchToProps)(PermitManagement);