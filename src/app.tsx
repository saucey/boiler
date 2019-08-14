import * as React from 'react';
// import { Provider } from 'react-redux';
import { AppRouter } from './app-router';
import './app.css';

import { addLocaleData } from "react-intl";
import locale_en from 'react-intl/locale-data/en';
import locale_cy from 'react-intl/locale-data/cy';
import { IntlProvider } from "react-intl";
import translationData from './translations/data.json';
// import { IAppState } from './store/state';

addLocaleData([...locale_en, ...locale_cy]);
const language = (navigator.languages && navigator.languages[0]) || navigator.language || navigator['userLanguage'];
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

export interface IAppProps //extends WithStyles<typeof styles>
{
    language: string;
    defaultLanguage: string;
    languageHasToggled: boolean;
}

export interface IAppState {
    languageSet: string;
    message: string;
}

// export class PurchaseHome extends React.Component<IPurchaseProps & RouteComponentProps, IPurchaseState>{
//     constructor(props: IPurchaseProps & RouteComponentProps) 
// export class PurchaseHome extends React.Component<IPurchaseProps & RouteComponentProps, IPurchaseState>{

export class App extends React.Component<IAppProps, IAppState>{
    constructor(props: IAppProps) {
        super(props);

        this.state = {
            languageSet: languageWithoutRegionCode,
            message: translationData[languageWithoutRegionCode] || translationData[language] || translationData.en
        }

    }

    componentDidUpdate(prevProps) {
        if(this.props.language !== prevProps.language && this.props.languageHasToggled) {
            this.setState({languageSet: this.props.language})
            this.setState({message: translationData[this.props.language]})
        }
    }

    // const App = ({ store }) => {
    render() {
        return (
            <div className="dynamicCLass">
                <IntlProvider locale={this.state.languageSet} messages={this.state.message} defaultLocale={this.props.defaultLanguage}>
                    <AppRouter />
                </IntlProvider>
            </div>
        )
    }
};

export default App;

