import * as React from 'react'
import { IPageProps } from '../page-props'
import "font-awesome/css/font-awesome.css";
import { IClient, IAppUser, IPermitSearchModel, IPermit, IAppError, Purchase, IPurchase } from '../../models';
import {
    Permits, ResetPassword, BeginPasswordReset, CreatePassword
} from '../../components/management';

import { withStyles, WithStyles } from '@material-ui/core/styles';
import { AppContainer } from '../../components';
import { user } from '../../helpers'

const styles = {
    table: {
        maxWidth: 1200,
        margin: '20px auto',
        border: '1px solid #712177',
        backgroundColor: '#f7f2f7',
        '& .MuiTableCell-root': {
            padding: '50px 25px',
        },
        '& .MuiTableBody-root .MuiTableCell-root': {
            padding: '50px 25px',
            cursor: 'pointer',
        },
        '& .MuiTableBody-root .MuiTableRow-root': {
            '&:hover': {
                backgroundColor: '#f6f3f9'
            }
        },
    },
};

export interface IManagementProps extends IPageProps {
    client: IClient;
    isProcessing: boolean;
    logout(): void;
    user: IAppUser | null;
    fetchPermits(searchModel: IPermitSearchModel): void;
    fetchPermit(permitId: string): void;
    permits: Array<IPermit>;
    recoverPassword(email: string): void;
    resetPassword(passwordGuid: any): void;
    passwordResetSuccessful: boolean;
    recoverPasswordGuid: boolean;
    resetRecoverPasswordGuid(): void;
    resetPasswordResetErrors(): void;
    resetPasswordErrors: IAppError | null;
    isLoggedIn: boolean;
    // classes: any;
}

export interface IManagementState {
    purchase: IPurchase;
    step: number;
    guid: string;
    // selectedTab: number;
}

const setStepNumber = (stepName: string) => {

    //const stepName = this.props.location.pathname;
    switch (stepName) {
        case '/management/permits': return 0;
        case '/management/begin-password-reset': return 1;
        case '/management/reset-password': return 2;
        case '/management/create-password': return 3;
    }
    return 0;
}

export const Management = withStyles(styles)(class Management extends React.Component<IManagementProps, IManagementState>{
    // export class Management extends React.Component<IManagementProps, IManagementState>{
    // export class Management extends React.Component<IManagementProps, IManagementState>{

    constructor(props: IManagementProps & WithStyles) {
        super(props);
        this.state = {
            step: setStepNumber(props.location.pathname),
            guid: setStepNumber(props.location.pathname) === 2 ? new URLSearchParams(props.location.search).get('token') : '',
            purchase: this.props.location.state ? this.props.location.state.purchase : new Purchase(null, null)
        }
    }

    componentDidUpdate(prevProps: IManagementProps, prevState: IManagementState) {
        if (this.props.isLoggedIn && !prevProps.isLoggedIn) {
            const { purchase } = this.state;
            let p = { ...purchase, customer: user().customer };
            this.setState({ purchase: p }, () => {
                this.props.history.push({ pathname: '/', state: { purchase: this.state.purchase } });
            });
        }

    }


    componentDidMount() {
        if (this.state['step'] === 0) {
            const searchModel: IPermitSearchModel = {
                searchText: '',
                customerId: this.props.user.customer !== null ? this.props.user.customer.customerId : null,
                clientId: this.props.client.clientId || null,
            }
            this.props.fetchPermits(searchModel);
        }
    }

    permitEdit = (permitId) => {
        this.props.fetchPermit(permitId);
        this.props.history.push({ pathname: '/management/permit/' + permitId });
    }

    render() {

        // this.state['step']
        // const { permits } = this.props;
        //const {customer, isProcessing, clients, regions, countries, fetchCustomer, onSave, resetSuccess, onCancel, isSaved } = this.props;
        return (
            <AppContainer title='Reset Password' isPurchase={false} renderFooter={() => { return true && <span></span> }} render={() => {
                return (
                    <div>
                        {this.state['step'] === 0 && <Permits permits={this.props.permits} permitEdit={this.permitEdit} />}
                        {this.state['step'] === 1 && <BeginPasswordReset resetRecoverPasswordGuid={this.props.resetRecoverPasswordGuid} recoverPasswordGuid={this.props.recoverPasswordGuid} recoverPassword={this.props.recoverPassword} />}
                        {this.state['step'] === 2 && <ResetPassword resetPasswordResetErrors={this.props.resetPasswordResetErrors} resetPasswordErrors={this.props.resetPasswordErrors} guid={this.state['guid']}  resetPassword={this.props.resetPassword} />}
                        {this.state['step'] === 3 && <CreatePassword resetRecoverPasswordGuid={this.props.resetRecoverPasswordGuid} recoverPasswordGuid={this.props.recoverPasswordGuid} recoverPassword={this.props.recoverPassword} />}
                    </div>
                );
            }} />
        );
    }
})