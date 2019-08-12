import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IAppState } from '../../store/state';
import { PurchaseHome } from './purchase';
import { insertCardCharge, fetchSitesForClientByLocation, fetchPermitProductsForSite, fetchPermitProduct, upsertPermit, logIn, register, setFooterHeight, insertDirectDebitCustomer, insertDirectDebitSubscription, resetTown, savePaymentToLocalStorage, newPurchase, updatePendingCardPayment, resetPurchaseState, resetPaymentState, resetErrorState } from '../../store/actions';
import { IProductSearchModel, ISiteLocationSearchModel, IPurchase, ICustomerAddForm, IPayment, newUser } from '../../models';
import { IAppAction } from '../../store/app-action';
import { IBankAccountAndSubscription } from '../../models/direct-debits';
import { IPermitEditForm } from '../../models/permit-forms';
import { Authorisation } from '../../components/higher-order-components/authorisation';
// import {product, vrms, startDate, town} from '../../data-mocks';
import { withLocalize } from "react-localize-redux";

const mapStateToProps = (state: IAppState) => {

    return {
        user: state.appContainer.user ? state.appContainer.user : newUser,
        client: state.appContainer.client,
        towns: state.referenceData.siteTowns,
        sites: state.purchaseContainer.siteLocationSearch,
        town: state.purchaseContainer.town,
        products: state.purchaseContainer.products,
        product: state.purchaseContainer.product,
        productFrequencies: state.referenceData.productFrequencies,
        isProcessing: state.purchaseContainer.isProcessing,
        permit: state.purchaseContainer.permit,
        isLoggedIn: state.appContainer.user ? true : false,
        footerHeight: state.dimensionsContainer.footerHeight,
        payment: state.paymentContainer,
        paymentStatus: state.paymentContainer.status,
        errors: state.appContainer.appError,
        paymentStore: state.paymentContainer.paymentStore,
        purchase: state.purchaseContainer.purchase,
        pendingPayment: state.purchaseContainer.pendingPayment,
        preProduct: state.purchaseContainer.preProduct,
        customer: state.appContainer.user ? state.appContainer.user.customer : null,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IAppAction>) => {
    return {
        fetchSites(searchModel: ISiteLocationSearchModel, purchase: IPurchase) {
            dispatch(fetchSitesForClientByLocation(searchModel, purchase));
        },
        fetchProducts(searchModel: IProductSearchModel) {
            dispatch(fetchPermitProductsForSite(searchModel));
        },
        fetchProduct(permitProductId: number) {
            dispatch(fetchPermitProduct(permitProductId.toString()));
        },
        resetTown() {
            dispatch(resetTown());
        },
        onSave(permitId: number, purchase: IPurchase) {
            console.log('unused Onsave function');
            // dispatch(upsertPermit(permitId, purchase, true));
        },
        login(userName: string, password: string) {
            dispatch(logIn({ userName, password }));
        },
        register(customerForm: ICustomerAddForm) {
            dispatch(register(customerForm));
        },
        fetchFooterHeight(footerHeight) {
            dispatch(setFooterHeight(footerHeight))
        },
        addDirectDebitCustomer(customer: ICustomerAddForm) {
            dispatch(insertDirectDebitCustomer(customer));
        },
        addDirectDebitSubscription(customerId: number, bankAccountAndSubscription: IBankAccountAndSubscription) {
            dispatch(insertDirectDebitSubscription(customerId, bankAccountAndSubscription));
        },
        makePayment(payment: IPayment, customerId: number) {
            dispatch(insertCardCharge(payment, customerId.toString()));
        },
        onSavePermit(permitId: number, form: IPermitEditForm, paymentAmount: number, payingDeposit: boolean) {
            dispatch(upsertPermit(permitId, form, true, paymentAmount, payingDeposit));
        },
        paymentState(payment: IPayment) {
            dispatch(savePaymentToLocalStorage(payment));
        },
        newPurchase(purchase: IPurchase) {
            dispatch(newPurchase(purchase));
        },
        pendingCardPayment(pendingPayment: boolean) {
            dispatch(updatePendingCardPayment(pendingPayment))
        },
        resetPurchaseState() {
            dispatch(resetPurchaseState())
        },
        resetPaymentState() {
            dispatch(resetPaymentState())
        },
        resetErrorState() {
            dispatch(resetErrorState())
        }

    }
    // onSave(permitId: number, form: any, paymentAmount:number) {
    //     dispatch(upsertPermit(permitId, form, true, paymentAmount));
    // },

};

export const PurchaseContainer = connect(mapStateToProps, mapDispatchToProps)(withLocalize(PurchaseHome));

export const WithAuthorisationCustomersContainer = Authorisation(connect(mapStateToProps, mapDispatchToProps)(PurchaseHome), 'example_of_allowed_string');