import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IAppState } from './store/state';
import { App } from './app';
// import { fetchCustomer, logOut, fetchSitesForClientByLocation, fetchPermitProductsForSite } from '../../store/actions';
import { IAppAction } from './store/app-action';
// import { withLocalize } from 'react-localize-redux';

const mapStateToProps = (state: IAppState) => {
    return {
        language: state.languageLocaleContainer.language,
        defaultLanguage: state.languageLocaleContainer.defaultLanguage,
        languageHasToggled: state.languageLocaleContainer.languageHasToggled,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IAppAction>) => {
    return {

    };
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppContainer;