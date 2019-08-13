import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IAppState } from '../../store/state';
import { Home } from './home';
import { fetchCustomer, logOut, fetchSitesForClientByLocation, fetchPermitProductsForSite } from '../../store/actions';
import { IAppAction } from '../../store/app-action';
import { newUser, ISiteLocationSearchModel, IPurchase, IProductSearchModel } from '../../models';
// import { withLocalize } from 'react-localize-redux';

const mapStateToProps = (state: IAppState) => {
    return {
        client: state.appContainer.client,
        isProcessing: false,
        user: state.appContainer.user ? state.appContainer.user : newUser,
        towns: state.referenceData.siteTowns,
        sites: state.purchaseContainer.siteLocationSearch,
        preProduct: state.purchaseContainer.preProduct,
        product: state.purchaseContainer.product,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IAppAction>) => {
    return {
        fetchCustomer(customerId: number) {
            dispatch(fetchCustomer(customerId));
        },
        logout() {
            dispatch(logOut());
        },
        fetchSites(searchModel: ISiteLocationSearchModel, purchase: IPurchase) {
            dispatch(fetchSitesForClientByLocation(searchModel, purchase));
        },
        fetchProducts(searchModel: IProductSearchModel) {
            dispatch(fetchPermitProductsForSite(searchModel));
        },
    };
};

export const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);