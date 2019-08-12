import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PurchaseContainer, HomeContainer, ManagementContainer, PermitManagementContainer, WithAuthorisationCustomersContainer } from './pages';
import { appHistory } from './app-history';
import { ConnectedRouter } from 'connected-react-router';
import { Redirect } from 'react-router';
import { LocalizeProvider, withLocalize } from "react-localize-redux";
// import globalTranslations from "./translations/global.json";
// import { renderToStaticMarkup } from "react-dom/server";

export const AppRouter = withLocalize(class AppRouter extends React.Component {
    constructor(props) {
        super(props);

        // this.props.initialize({
        //     languages: [
        //         { name: "English", code: "en" },
        //         { name: "French", code: "fr" },
        //         { name: "Spanish", code: "es" }
        //     ],
        //     translation: globalTranslations,
        //     options: { renderToStaticMarkup }
        // });

    }

    render() {
        return (
            <LocalizeProvider>
                <ConnectedRouter history={appHistory()}>
                    <Switch>
                        <Route exact={true} path={'/'} component={HomeContainer} />

                        <Route exact={true} path={'/purchase/intro'} component={WithAuthorisationCustomersContainer} />
                        <Route exact={true} path={'/purchase/city'} component={WithAuthorisationCustomersContainer} />
                        <Route exact={true} path={'/purchase/site'} component={WithAuthorisationCustomersContainer} />
                        <Route exact={true} path={'/purchase/product'} component={WithAuthorisationCustomersContainer} />
                        <Route exact={true} path={'/purchase/frequency'} component={WithAuthorisationCustomersContainer} />
                        <Route exact={true} path={'/purchase/spaces'} component={WithAuthorisationCustomersContainer} />
                        <Route exact={true} path={'/purchase/vrms'} component={WithAuthorisationCustomersContainer} />
                        <Route exact={true} path={'/purchase/startdate'} component={WithAuthorisationCustomersContainer} />
                        <Route exact={true} path={'/purchase/signUp'} component={WithAuthorisationCustomersContainer} />

                        <Route exact={true} path={'/purchase/summary'} component={PurchaseContainer} />
                        <Route exact={true} path={'/purchase/bankaccount'} component={WithAuthorisationCustomersContainer} />
                        <Route exact={true} path={'/purchase/cardpayment'} component={PurchaseContainer} />
                        <Route exact={true} path={'/purchase/confirmation'} component={PurchaseContainer} />
                        <Route exact={true} path={'/purchase/signIn'} component={PurchaseContainer} />

                        <Route exact={true} path={'/management/permits'} component={ManagementContainer} />
                        <Route exact={true} path={'/management/begin-password-reset'} component={ManagementContainer} />
                        <Route exact={true} path={'/management/create-password'} component={ManagementContainer} />
                        <Route exact={true} path={'/management/reset-password'} component={ManagementContainer} />
                        <Route exact={true} path={'/management/permit/:permitId'} component={PermitManagementContainer} />

                        <Route render={() => <Redirect to="/" />} />
                    </Switch>
                </ConnectedRouter >
            </LocalizeProvider>
        );
    }
});
