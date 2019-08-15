import * as React from 'react';
import glamorous from 'glamorous';
import { AppContainer, LoadSpinner, LoadSpinnerInverse } from '../../components'
import { IPermitProduct, IProductSearchModel, ITown, ISiteLocationSearchModel, ISiteLookup, IProductFrequency, IClient, IPermit, IVrm, ICustomerAddForm, IPayment, ICustomer, IAppUser, IPreProduct } from '../../models';
// import { GeneralHeaderWithUnderline, NextButton, CenterInMiddleOfScreen, GeneralHeaderWithUnderlineTaller } from '../../styles/style';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { PurchaseFooter } from '../../components/purchase-footer/purchase-footer';
import { IPurchase, Purchase } from '../../models/purchase';
import {
    PurchaseCity, PurchaseProduct, PurchaseSite, PurchaseFrequency, PurchaseSpaces, PurchaseVrms, PurchaseSummary, PurchaseStartDate,
    PurchaseConfirmation, PurchaseBankAccount, PurchaseCardPayment, PurchaseIntro
} from '../../components/purchase';
import { getClient } from '../../helpers';
import { createProductFrequenciesFromProductPrices } from '../../helpers/frequency';
import { Flipper } from 'react-flip-toolkit';
import { SignUp } from '../../components/login/sign-up';
import { user } from '../../helpers'
import { SignIn } from '../../components/login/sign-in';
import Measure from 'react-measure';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { IBankAccountAndSubscription } from '../../models/direct-debits';
import { IPaymentState } from '../../store/state/payment-state';
import { PermitEditForm } from '../../models/permit-forms';
// import { relativeTimeThreshold } from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { /*faMapMarkerAlt, faParking, faReceipt, faCarAlt, faCalendarCheck*/
    faSpinner
} from '@fortawesome/free-solid-svg-icons'
// import styled from 'styled-components';

// const NewButton = styled.button`
//   border:   ${props => props.client['clientId'] === 307 ? '1px solid red' : '1px solid green'};
//   cursor : pointer;
//   display: inline-block;
//   font-weight: bold;
//   padding: 16px 25px 17px;
//   position: relative;
//   text-align: center;
//   color: white;
//   background-color: red;
  
//   &:hover { text-decoration: underline; color: green }
  
// `;

// import { renderToStaticMarkup } from "react-dom/server";
// import globalTranslations from "../../translations/global.json";
// import movieTranslations from "../../translations/movies.json";
// import { Translate } from "react-localize-redux";

const BkToIntroBtn = withStyles(theme => ({
    root: {
        backgroundColor: 'none',
        display: 'inline-block',
        border: '3px solid#ff7914',
        width: '300px',
        margin: '0 auto',
        padding: '10px',
        cursor: 'pointer',
        fontFamily: 'Roboto',
        textTransform: 'uppercase',
        color: 'black',
        'borderRadius': '0',
        background: 'none',
        '& MuiButton-root': {
            margin: '0 auto'
        },
        '&:hover': {
            backgroundColor: '#ff7914',
            color: '#fff'
        },
    },
}))(Button);

// const ColorButton = withStyles(theme => ({
//     root: {
//         display: 'inline-block',
//         color: '#fff',
//         margin: '0 10px',
//         borderRadius: '0',
//         fontWeight: 'normal',
//         backgroundColor: '#712177',
//         '&:hover': {
//             backgroundColor: '#ff7914',
//         },
//     },
// }))(Button);

const HomeWrapper = glamorous.div({ label: 'HomeWrapper', display: 'flex', flexDirection: 'column' });

export interface IPurchaseProps //extends WithStyles<typeof styles>
{
    user: IAppUser | null;
    customer: ICustomer | null;
    client: IClient;
    purchase: IPurchase;
    towns: Array<ITown>;
    sites: Array<ISiteLookup>;
    town: any;
    products: Array<IPermitProduct>;
    product: IPermitProduct | null;
    productFrequencies: Array<IProductFrequency>;
    isProcessing: boolean;
    permit: IPermit | null;
    isLoggedIn: boolean;
    loginNextUrl: string;
    payment: IPaymentState;
    paymentStatus: string;
    pendingPayment: boolean;
    errors: any;
    preProduct: IPreProduct | null;
    fetchSites(searchModel: ISiteLocationSearchModel, purchase: IPurchase): void;
    fetchProducts(searchModel: IProductSearchModel): void;
    fetchProduct(permitProductId: number): void;
    onSave(permitId: number, purchase: IPurchase): void;
    login(userName: string, password: string, nextUrl: string): void;
    register(customerForm: ICustomerAddForm): void;
    fetchFooterHeight(footerHeight): void;
    addDirectDebitCustomer(customer): void;
    addDirectDebitSubscription(customerId: number, bankAccountAndSubscription: IBankAccountAndSubscription): void;
    makePayment(payment: IPayment, customerId: number): void;
    onSavePermit(permitId: number, form: PermitEditForm, paymentAmount: number, payingDeposit: boolean): void;
    resetTown(): void;
    paymentState(payment: IPayment): void;
    newPurchase(purchase: IPurchase): void;
    pendingCardPayment(pendingPayment: boolean): void;
    resetPurchaseState(): void;
    resetPaymentState(): void;
    resetErrorState(): void;
}

export interface IPurchaseState {
    step: number;
    purchase: IPurchase;
    nextUrl: string;
    client: IClient;
    show: boolean;
    isDesktop: boolean;
    products: Array<IPermitProduct>;
    footerHeight: number;
    formIsValid: boolean;
    payingDeposit: boolean;
    townSet: boolean;
}

// const NewButton = styled.button`
//   border:   ${props => console.log(props, 'the styles in styled comp') };
//   cursor : pointer;
//   display: inline-block;
//   font-weight: bold;
//   padding: 16px 25px 17px;
//   position: relative;
//   text-align: center;
//   color: white;
//   background-color: red;
//   &:hover { text-decoration: underline; color: green }
// `;

const isPayingDeposit = (clientId: number) => {

    switch (clientId) {
        case 304: return false;
        case 23: return true;
    }

    return false;
}

const setStepNumber = (stepName: string) => {
    //const stepName = this.props.location.pathname;
    switch (stepName) {
        case '/purchase/intro': return 0;
        case '/purchase/city': return 1;
        case '/purchase/site': return 2;
        case '/purchase/product': return 3;
        case '/purchase/frequency': return 4;
        case '/purchase/spaces': return 5;
        case '/purchase/vrms': return 6;
        case '/purchase/startDate': return 7;
        case '/purchase/summary': return 8;
        case '/purchase/bankAccount': return 9;
        case '/purchase/cardPayment': return 10;
        case '/purchase/confirmation': return 11;
        case '/purchase/signUp': return 12;
        case '/purchase/signIn': return 13;
    }
    return 0;
}

export class PurchaseHome extends React.Component<IPurchaseProps & RouteComponentProps, IPurchaseState>{

    constructor(props: IPurchaseProps & RouteComponentProps) {
        super(props);
        this.state = {
            step: setStepNumber(props.location.pathname), purchase: this.props.location.state ? this.props.location.state.purchase : new Purchase(null, null), nextUrl: this.props.location.state ? this.props.location.state.nextUrl : '/home',
            client: getClient(), show: true, isDesktop: this.updateScreenInfo(), products: [],
            footerHeight: 0,
            formIsValid: false,
            payingDeposit: isPayingDeposit(this.props.client.clientId),
            townSet: setStepNumber(props.location.pathname) === 1 ? false : this.props.town.length === undefined
        };

        // var languageString = navigator.language || navigator['userLanguage'] || '';
        // var re = /_|-/
        // var language = languageString.split(re)[0];
        // var code = /(en|fr|es)/;
        // language = Boolean(language.match(code)) ? language : 'en';


        // this.props.initialize({
        //     languages: [
        //         { name: "English", code: "en" },
        //         { name: "French", code: "fr" },
        //         { name: "spanish", code: "es" }
        //     ],
        //     translation: globalTranslations,
        //     options: { renderToStaticMarkup, defaultLanguage: language }
        // });

        // this.props.addTranslation(movieTranslations);
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateScreenInfo);
    }

    static getDerivedStateFromProps(props: IPurchaseProps & RouteComponentProps, state: IPurchaseState) {
        return { step: setStepNumber(props.location.pathname) }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateScreenInfo);
    }

    updateScreenInfo = () => { return window.innerWidth > 700 };

    componentDidUpdate(prevProps: IPurchaseProps, prevState: IPurchaseState) {

        if (this.props.preProduct !== prevProps.preProduct && this.props.product !== null) {
            let p = { ...this.state.purchase, productId: this.props.product.permitProductId, productName: this.props.product.permitProductName, maxVRMs: this.props.product.maxVRMs, activeVRMs: this.props.product.activeVRMs, frequency: createProductFrequenciesFromProductPrices(this.props.product.prices.find(x => x.isCurrent))[0] };
            this.setState({ purchase: p }, () => {
                this.props.history.push({ pathname: "/purchase/summary", state: { purchase: this.state.purchase } });
            });
        }

        if (this.props.product && !prevProps.product) {
            if (this.props.product.prices.length === 1) {
                let p = {
                    ...this.state.purchase, frequency: createProductFrequenciesFromProductPrices(this.props.product.prices.find(x => x.isCurrent))[0]
                };
                this.setState({ purchase: p }, () => {
                    this.props.history.push({ pathname: "/purchase/spaces", state: { purchase: this.state.purchase } });
                });
            } else {
                this.props.history.push({ pathname: "/purchase/frequency", state: { purchase: this.state.purchase } });
            }
        }

        // this.props.product.prices
        // this.props.newPurchase(this.state.purchase);
        // Check if products have just been loaded, potentially skip a step if only one product returned

        if (this.props.town.length === undefined && this.state.townSet !== true && this.props.towns.length > 1) {
            this.props.history.push({ pathname: "/purchase/site", state: { purchase: this.state.purchase } });
        }

        if ((this.state.client.clientId === 23 || this.state.client.clientId === 307) && this.props.products.length > 0 && prevProps.products.length === 0) {
            if (this.props.products.length === 1) //don't show product step if only one, more to next step
            {
                let product: IPermitProduct = this.props.products[0];
                let p = { ...this.state.purchase, productId: product.permitProductId, productName: product.permitProductName, maxVRMs: product.maxVRMs, activeVRMs: product.activeVRMs };
                this.setState({ purchase: p }, () => {
                    this.props.fetchProduct(product.permitProductId);
                    this.props.history.push({ pathname: "/purchase/frequency", state: { purchase: this.state.purchase } });
                });
            }
            else {
                this.props.history.push({ pathname: "/purchase/product", state: { purchase: this.state.purchase } });
            }
        }
        //after select product - manually set frequency including price when get product info back for University of Wales
        if (this.state.client.clientId === 447 && this.props.product && !prevProps.product) {
            let p = {
                ...this.state.purchase, frequency: createProductFrequenciesFromProductPrices(this.props.product.prices.find(x => x.isCurrent))
                    .find(y => y.productFrequencyName === "Monthly")
            };
            this.setState({ purchase: p });
        }
        //after successful login, move to the next page
        if (this.props.isLoggedIn && !prevProps.isLoggedIn) {
            const { purchase } = this.state;
            let p = { ...purchase, customer: user().customer };
            this.setState({ purchase: p }, () => {
                this.props.history.push({ pathname: this.state.nextUrl, state: { purchase: this.state.purchase } });
            });
        }
    }

    newSiteSearchModel(): ISiteLocationSearchModel {
        return { clientId: this.state.client.clientId, searchText: '', latitude: 0, longitude: 0, town: this.state.purchase.town.town, pageSize: 1000 };
    }

    newProductSearchModel(siteId: number): IProductSearchModel {
        return { clientId: this.state.client.clientId, searchText: '', siteId };
    }

    stateToPath(pathToRoute): any {
        switch (Object.keys(pathToRoute).length) {
            case 1:
                return { purchase: new Purchase(this.props.user.customer, this.props.towns[0]) };
            default:
                return { purchase: new Purchase(this.props.user.customer, null) };
        }
    }

    //0
    begin() {
        if (this.state.client.clientId === 447) {
            let site: ISiteLookup = { siteId: 3623, siteName: '', addressLine1: '', town: '', client: { clientId: 447, clientName: '', shouldShowSites: false }, latitude: 0, longitude: 0 };
            let p = { ...this.state.purchase, site: site, town: { town: 'Swansea', latitude: 0, longitude: 0, zoomLevel: 12 } };
            this.setState({ purchase: p }, () => {
                this.props.fetchProducts(this.newProductSearchModel(site.siteId));
                this.props.history.push({ pathname: "/purchase/product", state: { purchase: this.state.purchase } });
            });
        }
        else { this.props.history.push({ pathname: Object.keys(this.props.towns).length === 1 ? '/purchase/product' : '/purchase/city', state: this.stateToPath(this.props.towns) }) };
    }

    //1
    selectTown(town: ITown) {
        let p = { ...this.state.purchase, town: town };
        this.setState({ purchase: p }, () => {
            this.props.fetchSites(this.newSiteSearchModel(), this.state.purchase);
            // this.props.history.push({ pathname: "/purchase/site", state: { purchase: this.state.purchase } });
        });
    }

    //2
    selectSite(site: ISiteLookup) {
        let p = { ...this.state.purchase, site: site };
        this.setState({ purchase: p }, () => {
            this.props.fetchProducts(this.newProductSearchModel(site.siteId));
            this.props.history.push({ pathname: "/purchase/product", state: { purchase: this.state.purchase } });
        });
    }

    //3
    selectProduct(product: IPermitProduct) {

        if (this.state.client.clientId === 307) {
            let p = { ...this.state.purchase, productId: product.permitProductId, productName: product.permitProductName, maxVRMs: product.maxVRMs, activeVRMs: product.activeVRMs };
            this.setState({ purchase: p }, () => {
                this.props.fetchProduct(product.permitProductId);
                // this.props.history.push({ pathname: "/purchase/frequency", state: { purchase: this.state.purchase } });
            });
        }
        if (this.state.client.clientId === 23) {
            let p = { ...this.state.purchase, productId: product.permitProductId, productName: product.permitProductName, maxVRMs: product.maxVRMs, activeVRMs: product.activeVRMs };
            this.setState({ purchase: p }, () => {
                this.props.fetchProduct(product.permitProductId);
                this.props.history.push({ pathname: "/purchase/frequency", state: { purchase: this.state.purchase } });
            });
        }
        if (this.state.client.clientId === 447) //University of Wales, skip frequency step
        {
            let p = {
                ...this.state.purchase, productId: product.permitProductId, productName: product.permitProductName, maxVRMs: product.maxVRMs, activeVRMs: product.activeVRMs,
                frequency: { productFrequencyId: 3, productFrequencyName: 'Monthly', productFrequencyPeriodName: 'month', productFrequencyDescription: '', timeOrder: 3, price: 0 }, spaces: 1
            };
            this.setState({ purchase: p }, () => {
                this.props.fetchProduct(product.permitProductId);
                this.props.history.push({ pathname: "/purchase/vrms", state: { purchase: this.state.purchase } });
            });
        }
    }

    //4
    selectFrequency(frequency: IProductFrequency) {
        let p = { ...this.state.purchase, frequency: frequency };
        this.setState({ purchase: p }, () => {
            this.props.history.push({ pathname: "/purchase/spaces", state: { purchase: this.state.purchase } });
        });
    }

    //5
    selectSpaces(spaces: number) {
        let p = { ...this.state.purchase, spaces: spaces };
        this.setState({ purchase: p }, () => {
            this.props.history.push({ pathname: "/purchase/vrms", state: { purchase: this.state.purchase } });
        });
    }

    //6
    selectVrms(vrms: Array<IVrm>) {
        let p = { ...this.state.purchase, VRMs: vrms };
        this.setState({ purchase: p }, () => {
            this.props.history.push({ pathname: "/purchase/startDate", state: { purchase: this.state.purchase } });
        });
    }

    //7
    selectStartDate(startDate: any) {
        let p = { ...this.state.purchase, startDate: startDate.toDate() };
        this.setState({ purchase: p }, () => {
            this.props.history.push({ pathname: "/purchase/summary", state: { purchase: this.state.purchase } });
        });
    }

    //10
    buyPermit() {
        this.props.onSave(0, this.state.purchase);
        this.props.history.push({ pathname: "/purchase/confirmation", state: { purchase: this.state.purchase } });
    }

    //12
    register(customer: ICustomerAddForm) {
        this.props.register(customer);
        // this.props.register(new CustomerEditForm);
    }

    //13
    login(userName: string, password: string, nextUrl: string) {
        this.props.login(userName, password, nextUrl);
    }

    heading(title: string, taller: boolean = false) {
        return !(taller) ? <span>{title}</span> :
            <span>{title}</span>
    }

    thePurchaseFooter() {
        return (
            <Measure bounds onResize={contentRect => { this.props.fetchFooterHeight(contentRect.bounds.height); this.setState({ footerHeight: contentRect.bounds.height }) }}>
                {({ measureRef }) => <PurchaseFooter preProduct={this.props.preProduct} innerREf={measureRef} step={this.state.step} purchase={this.state.purchase} />}
            </Measure>
        )
    }

    onValidationClick() {
        this.props.history.push({
            pathname: this.state.purchase.frequency.productFrequencyName === "Monthly" ? "/purchase/bankAccount" : "/purchase/cardPayment", state: { purchase: this.state.purchase }
        })
    }

    startIntro() {
        this.props.resetPurchaseState();
        this.props.resetPaymentState();
        this.props.resetErrorState();
        this.props.history.push({ pathname: "/purchase/intro", state: { purchase: this.state.purchase } });
    }

    directDebitSuccessful() {
        this.props.history.push({
            pathname: "/purchase/cardPayment", state: { purchase: this.state.purchase }
        })
    }

    dashboard() {
        this.props.history.push({
            pathname: "/"
        })
    }

    render() {
        const { products, isProcessing, towns, sites, productFrequencies, product, permit, town } = this.props;
        const { step, isDesktop, purchase } = this.state;
        const appUser = user();

        const userCustomer = this.props.user.customer !== null ? this.props.user.customer : null

        return (
            <AppContainer title='Purchase Permit' isPurchase={true && step !== 0} renderFooter={() => { return isDesktop && this.thePurchaseFooter() }}
                render={(intl) => {
                    // console.log(intl, 'intl')
                    return <Flipper flipKey={step === 1 || step === 2}><HomeWrapper>
                        {step === 0 && <React.Fragment>
                            <h1 className="heading">{this.heading('SEASON TICKETS')}</h1>
                            <PurchaseIntro begin={() => this.begin()}></PurchaseIntro>
                        </React.Fragment>}
                        {step === 1 && <React.Fragment>
                            {/* <Flipped flipId='raiseHeading'>{this.heading('Choose a city')}</Flipped><br /><br /> */}
                            <h1 className="heading">{this.heading('Choose a city')}</h1>
                            {isProcessing && <LoadSpinner />}
                            <PurchaseCity resetTown={this.props.resetTown} towns={towns} selectTown={(e) => this.selectTown(e)} />
                        </React.Fragment>}
                        {step === 2 && <React.Fragment>
                            <h1 className='heading'>{this.heading('Choose a car park', true)}</h1>
                            <div className="site-select-wrapper">
                                {isProcessing && <div className="load-spinner-wrapper"><LoadSpinnerInverse /></div>}
                                {town.length === 0 && <Redirect to='/purchase/intro' />}
                                <PurchaseSite footerHeight={this.state.footerHeight} sites={sites} selectSite={(e) => this.selectSite(e)} town={town} />
                            </div>
                        </React.Fragment>}
                        {step === 3 && <React.Fragment>
                            <h1 className="heading">{this.heading(`Choose a permit${this.state.client.clientId === 447 ? '' : ' with access to that car park'} `)}</h1>
                            {isProcessing && <LoadSpinner />}
                            <PurchaseProduct products={products} selectProduct={(e) => this.selectProduct(e)} />
                        </React.Fragment>}
                        {step === 4 && <React.Fragment>
                            <h1 className="heading">{this.heading('Choose a permit frequency')}</h1>
                            {isProcessing && <LoadSpinner />}
                            <PurchaseFrequency payingDeposit={this.state.payingDeposit} footerHeight={this.state.footerHeight} prices={product ? product.prices.find(x => x.isCurrent) : null} selectFrequency={(e) => this.selectFrequency(e)} productFrequencies={productFrequencies} />
                        </React.Fragment>}
                        {step === 5 && <React.Fragment>
                            <h1 className='heading'>{this.heading('How many spaces would you like?')}</h1>
                            {isProcessing && <LoadSpinner />}
                            <PurchaseSpaces defaultSpaces={purchase.spaces} selectSpaces={(e) => this.selectSpaces(e)} />
                        </React.Fragment>}
                        {step === 6 && <React.Fragment>
                            <h1 className="heading">{this.heading('Enter vehicle registration details')}</h1>
                            {isProcessing && <LoadSpinner />}
                            <PurchaseVrms purchase={purchase} selectVrms={(e) => this.selectVrms(e)} />
                        </React.Fragment>}
                        {step === 7 && <React.Fragment>
                            <h1 className="heading">{this.heading('What date should the permit start from?', true)}</h1>
                            {isProcessing && <LoadSpinner />}
                            <PurchaseStartDate footerHeight={this.state.footerHeight} purchase={purchase} productEndDate={product ? product.endDate : null} selectStartDate={(e) => this.selectStartDate(e)} />
                        </React.Fragment>}
                        {step === 8 && <div style={{ paddingBottom: this.state.footerHeight }}> <React.Fragment>
                            <h1 className='heading'>{this.heading('Summary')}</h1>
                            {isProcessing && <LoadSpinner />}
                            <PurchaseSummary payingDeposit={this.state.payingDeposit} purchase={purchase} />
                            {/* Not logged in */}
                            {appUser.userId === 0 &&
                                <div style={{ display: 'inline-block', margin: '20px 0' }}>
                                    <BkToIntroBtn style={{ margin: '20px' }} onClick={() => this.props.history.push({ pathname: "/purchase/signUp", state: { purchase: this.state.purchase, nextUrl: this.state.purchase.frequency.productFrequencyName === "Monthly" ? "/purchase/bankAccount" : "/purchase/cardPayment" } })}>Register</BkToIntroBtn>
                                    <BkToIntroBtn style={{ margin: '20px' }} onClick={() => this.props.history.push({ pathname: "/purchase/signIn", state: { purchase: this.state.purchase, nextUrl: this.state.purchase.frequency.productFrequencyName === "Monthly" ? "/purchase/bankAccount" : "/purchase/cardPayment" } })}>Login</BkToIntroBtn>
                                </div>}
                            {/* Logged in */}
                            {appUser.userId !== 0 && <BkToIntroBtn style={{ margin: '20px' }} onClick={() => this.props.history.push({
                                pathname: purchase.frequency.productFrequencyName === "Monthly" ? "/purchase/bankAccount" : "/purchase/cardPayment"
                                , state: { purchase: this.state.purchase }
                            })}>SUBMIT</BkToIntroBtn>}
                        </React.Fragment></div>}
                        {step === 9 && <React.Fragment>
                            <h1 className='heading'>{this.heading('Enter bank account details for payments')}</h1>
                            {isProcessing && <LoadSpinner />}
                            <PurchaseBankAccount directDebitSuccessful={() => this.directDebitSuccessful()} errors={this.props.errors} payment={this.props.payment} addDirectDebitSubscription={(customerId, bankAccountAndSubscription) => this.props.addDirectDebitSubscription(customerId, bankAccountAndSubscription)} addDirectDebitCustomer={(customer) => this.props.addDirectDebitCustomer(customer)} purchase={purchase} />
                            {/* <button onClick={() => this.props.history.push({ pathname: "/purchase/cardPayment", state: { purchase: this.state.purchase } })}>purchase</button> */}
                        </React.Fragment>}
                        {step === 10 && <React.Fragment>
                            {this.props.pendingPayment && <FontAwesomeIcon style={{ color: "#eae2e2", margin: "0 auto" }} className="fa-spin" size="6x" icon={faSpinner} />}
                            <div style={{ display: this.props.pendingPayment ? 'none' : 'block' }}>
                                <h1 className="heading">{this.heading('Enter your card details for payment')}</h1>
                                <PurchaseCardPayment resetErrorState={this.props.resetErrorState} errors={this.props.errors} pendingCardPayment={this.props.pendingCardPayment} newPurchase={this.props.newPurchase} savedPurchase={this.props.purchase} payingDeposit={this.state.payingDeposit} permit={this.props.permit} onSavePermit={this.props.onSavePermit} payment={this.props.payment} paymentStatus={this.props.paymentStatus} product={this.props.product} client={this.props.client} makePayment={this.props.makePayment} paymentState={this.props.paymentState} purchase={purchase} userCustomer={userCustomer} buyPermit={() => this.buyPermit()} />
                            </div>
                        </React.Fragment>}
                        {step === 11 && <React.Fragment>
                            <h1 className="heading">{this.heading('Confirmation')}</h1>
                            {isProcessing && <LoadSpinner />}
                            <PurchaseConfirmation pendingCardPayment={this.props.pendingCardPayment} payingDeposit={this.state.payingDeposit} purchase={purchase} permit={permit} />
                            {this.props.preProduct ?
                                <BkToIntroBtn onClick={() => this.dashboard()}>Manage Permits</BkToIntroBtn> :
                                <BkToIntroBtn onClick={() => this.startIntro()}>intro</BkToIntroBtn>
                            }
                        </React.Fragment>}
                        {step === 12 && <React.Fragment>
                            <h1 className="heading">{this.heading('Register')}</h1>
                            {isProcessing && <LoadSpinner />}
                            <SignUp onValid={() => this.onValidationClick()} reg={(obj) => this.register(obj)} />
                        </React.Fragment>}
                        {step === 13 && <React.Fragment>
                            <h1 className="heading">{this.heading('Login')}</h1>
                            {/* <NewButton client={this.props.client.clientId}>style component</NewButton> */}
                            {/* <button> */}
                            {/* <Translate id="movie.title"></Translate> */}
                            {/* </button> */}
                            {isProcessing && <LoadSpinner />}
                            <SignIn nextUrl={this.state.nextUrl} errors={this.props.errors} login={(userName, password, nextUrl) => this.login(userName, password, nextUrl)} />
                        </React.Fragment>}
                        {/* </Flipper> */}
                    </HomeWrapper></Flipper>
                }} />);
    }
}

export default withRouter(PurchaseHome);