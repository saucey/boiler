import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PurchaseContainer, HomeContainer, ManagementContainer, PermitManagementContainer } from './pages';
import { appHistory } from './app-history';
import { ConnectedRouter } from 'connected-react-router';
import { Redirect } from 'react-router';

export const AppRouter = () => {
    return (
        <ConnectedRouter history={appHistory()}>
            <Switch>
                <Route exact={true} path={'/'} component={HomeContainer} />
                <Route exact={true} path={'/purchase/intro'} component={PurchaseContainer} />
                <Route exact={true} path={'/purchase/city'} component={PurchaseContainer} />
                <Route exact={true} path={'/purchase/site'} component={PurchaseContainer} />
                <Route exact={true} path={'/purchase/product'} component={PurchaseContainer} />
                <Route exact={true} path={'/purchase/frequency'} component={PurchaseContainer} />
                <Route exact={true} path={'/purchase/spaces'} component={PurchaseContainer} />
                <Route exact={true} path={'/purchase/vrms'} component={PurchaseContainer} />
                <Route exact={true} path={'/purchase/startdate'} component={PurchaseContainer} />
                <Route exact={true} path={'/purchase/summary'} component={PurchaseContainer} />
                <Route exact={true} path={'/purchase/bankaccount'} component={PurchaseContainer} />
                <Route exact={true} path={'/purchase/cardpayment'} component={PurchaseContainer} />
                <Route exact={true} path={'/purchase/confirmation'} component={PurchaseContainer} />
                <Route exact={true} path={'/purchase/signUp'} component={PurchaseContainer} />
                <Route exact={true} path={'/purchase/signIn'} component={PurchaseContainer} />

                <Route exact={true} path={'/management/permits'} component={ManagementContainer} />
                <Route exact={true} path={'/management/begin-password-reset'} component={ManagementContainer} />
                <Route exact={true} path={'/management/reset-password'} component={ManagementContainer} />
                <Route exact={true} path={'/management/permit/:permitId'} component={PermitManagementContainer} />

                <Route render={() => <Redirect to="/" />} />
            </Switch>
        </ConnectedRouter >
    );
};