import * as React from 'react'
import glamorous from 'glamorous'
import { IPageProps } from '../page-props'
import { AppContainer, PurchaseFooter } from '../../components'
import "font-awesome/css/font-awesome.css";
import { IClient, Purchase, IAppUser, ITown, IPurchase, ISiteLocationSearchModel, IProductSearchModel, ISiteLookup, IPreProduct, IPermitProduct } from '../../models';
// import { ImageIcon, VerticalSpacer15, LargeCenteredText, PurchaseFooterItemLink } from '../../styles';
import { Link } from 'react-router-dom'
import Measure from 'react-measure';
import { createProductFrequenciesFromProductPrices } from '../../helpers/frequency';
// import { withLocalize } from 'react-localize-redux'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


const HomeWrapper = glamorous.div({ label: 'HomeWrapper', display: 'flex', flexDirection: 'column' });

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(2),
    borderRadius: '0px',
    textalign: 'left',
    marginBottom: '100px'
  },
  paper: {
    color: 'theme.palette.text.secondary',
    borderRadius: '0px',
    textAlign: 'left',
    [theme.breakpoints.up('lg')]: {
      height: '683px'
    },
    [theme.breakpoints.only('md')]: {
      height: '821px'
    }
  },
  paperContact: {
  },
  contactText: {
    paddingBottom: '10px',
  },
  heading: {
    backgroundColor: '#712177',
    color: 'white',
    padding: '20px',
    fontSize: '2em',
    fontWeight: 400,
  },
  heading2: {
    backgroundColor: '#ff7914',
    color: 'white',
    padding: '20px',
    fontSize: '2em',
    fontWeight: 400,
  }
}));

const CustomGrid = (props) => {
  const classes = useStyles({});
  // const { className, message, onClose, variant, ...other } = props;
  // const Icon = variantIcon[variant];

  return (
    <div className={classes.root}>
      <Grid container spacing={3} >
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <h1 className={classes.heading}>Exisiting Student and Staff Permit Holders</h1>
            <div className="gordon-intro">
              <p>Have you already signed up and purchased a Student/Staff Car parking Permit for the new 2019/2020 academic year?</p>
              <p>If yes, welcome to the RGU Cark Parking Permit Holders Portal.  This portal will enable you to log in and 'Manage Your Permit' for the 2019/2020 academic year</p>
              <p>Both RGU Students and Staff (who are the primary user registered - including car share) will be able to manage their permits details including the following:</p>
              <ul>
                <li>Vehicle Registration Marks (VRM)</li>
                <li>Payment Details (Students Only)</li>
                <li>E-mail address</li>
                <li>Change/Amend Car Share permit holders details </li>
              </ul>
              <p>In order to 'Manage Your Permit', 'Log In' to your account</p>
              <span><Link to={{ pathname: '/purchase/signIn', state: { purchase: new Purchase(null, null), nextUrl: '/' } }}>LOG IN</Link></span>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <h1 className={classes.heading2}>Non-Paid Student and Staff Permit Holders</h1>
            <div className="gordon-intro">
              <p>Have you been successful in your application for a Student/Staff Car parking Permit for the new 2019/2020 academic year?</p>
              <p>If yes, welcome to the RGU Cark Parking Permit Holders Portal.  This portal will enable you to:</p>
              <ol>
                <li>'Create a New Password'</li>
                <li>'Pay for the Permit'</li>
                <li>Once a new password has been set-up, 'log in' and 'Manage Your Permit' for the 2019/2020 academic year</li>
              </ol>
              <p>In order to pay for your permit, please select 'Pay For Permit' to continue with the payment process.</p>
              <span><Link to={{ pathname: '/management/create-password', state: { purchase: new Purchase(null, null), nextUrl: '/' } }}>PAY FOR PERMIT</Link></span>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={12}>
          <Paper className={classes.paperContact}>
            <h1 className={classes.heading2}>Contact Us</h1>
            <p className={classes.contactText}>If you have any problems or questions relating to the portal, please contact 'RGU@eurocarparks.com' in the first instance</p>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export interface IHomeProps extends IPageProps {
  client: IClient;
  preProduct: IPreProduct | null;
  isProcessing: boolean;
  product: IPermitProduct | null;
  logout(): void;
  user: IAppUser | null;
  towns: Array<ITown>;
  sites: Array<ISiteLookup>;
  fetchSites(searchModel: ISiteLocationSearchModel, purchase: IPurchase): void;
  fetchProducts(searchModel: IProductSearchModel): void;
}

export interface IHomeState {
  // selectedTab: number;
}

export class Home extends React.Component<IHomeProps, IHomeState>{

  constructor(props: IHomeProps) {
    super(props);
    this.state = {}

  }

  componentDidUpdate(prevProps: IHomeProps, prevState) {
    if (this.props.product !== prevProps.product && this.props.product !== null) {

      let vrms = [{
        permitVrmId: 0,
        vrm: this.props.preProduct.vrms[0],
        isActive: true,
        make: '',
        model: '',
        colour: '',
        inValid: false
      }]

      const preProduct = { startDate: this.props.preProduct.startDate, VRMs: vrms, spaces: this.props.preProduct.spaces, productId: this.props.product.permitProductId, productName: this.props.product.permitProductName, maxVRMs: this.props.product.maxVRMs, activeVRMs: 1, frequency: createProductFrequenciesFromProductPrices(this.props.product.prices.find(x => x.isCurrent))[0] };
      this.props.history.push({ pathname: "/purchase/summary", state: { purchase: new Purchase(this.props.user.customer, null, preProduct) } });
    }

    // this.props.fetchSites(this.newSiteSearchModel(this.props.towns), new Purchase(this.props.user['user'].customer, this.props.towns));
    if (this.props.towns !== prevProps.towns) {
      this.props.fetchSites(this.newSiteSearchModel(this.props.towns[0].town), new Purchase(this.props.user.customer, this.props.towns[0]));
    }

    if (this.props.sites !== prevProps.sites) {
      this.props.sites.map(val => {
        this.props.fetchProducts(this.newProductSearchModel(val.siteId));
      })
    }
  }

  thePurchaseFooter() {
    return (
      <Measure bounds onResize={contentRect => {  /*console.log(contentRect.bounds, 'the bounds') */ }}>
        {({ measureRef }) => <PurchaseFooter preProduct={this.props.preProduct} innerREf={measureRef} step={0} purchase={new Purchase(null, null)} />}
      </Measure>
    )
  }

  changeTab = (event, value) => {
  };

  newSiteSearchModel(town): ISiteLocationSearchModel {
    return { clientId: this.props.client.clientId, searchText: '', latitude: 0, longitude: 0, town: town, pageSize: 1000 };
  }

  newProductSearchModel(siteId: number): IProductSearchModel {
    return { clientId: this.props.client.clientId, searchText: '', siteId };
  }

  stateToPath(pathToRoute): any {
    switch (Object.keys(pathToRoute).length) {
      case 1:
        return { purchase: new Purchase(this.props.user.customer !== null ? this.props.user.customer : null, this.props.towns[0]) };
      default:
        return { purchase: new Purchase(this.props.user.customer, null) };
    }
  }

  render() {
    //const {customer, isProcessing, clients, regions, countries, fetchCustomer, onSave, resetSuccess, onCancel, isSaved } = this.props;
    return (
      <AppContainer title="Dashboard" isPurchase={false} renderFooter={() => { return true && this.thePurchaseFooter() }} render={() => {
        //if (isProcessing && customer === undefined) { return <AppLoading/>};
        return (
          <HomeWrapper>
            {/* <VerticalSpacer15 /> */}
            {/* <Link to={{pathname: '/purchase/intro', state: {purchase: this.props.user.customer}}} style={{ margin: '0 auto' }}></Link> */}
            {this.props.client.clientId !== 307 && <Link to={{ pathname: Object.keys(this.props.towns).length === 1 ? '/purchase/product' : '/purchase/intro', state: this.stateToPath(this.props.towns) }} style={{ margin: '0 auto' }}>
              <h1 className="heading"><span>SEASON TICKETS</span></h1>
              <img className="home-ticket" src='/icons/ticket-svg.svg' style={{ height: 50, width: 50, display: 'block', margin: '0 auto' }} />
            </Link>}
            {this.props.user.userId === 0 && this.props.client.clientId === 307 && <CustomGrid></CustomGrid>}
            {/* <VerticalSpacer15 /> */}
            {this.props.user.userId === 0 && <React.Fragment>
              <div className="home-action-links">
                {this.props.client.clientId !== 307 && <span><Link to={{ pathname: '/purchase/signIn', state: { purchase: new Purchase(null, null), nextUrl: '/' } }}>LOG IN</Link></span>}
                {this.props.client.clientId !== 307 && <span><Link to={{ pathname: '/purchase/signUp', state: { purchase: new Purchase(null, null), nextUrl: '/' } }}>REGISTER</Link></span>}
              </div>
            </React.Fragment>}
            {this.props.user.userId !== 0 && <React.Fragment>
              <div className="home-action-links">
                <Link to={{ pathname: '/management/permits' }} style={{ margin: '0 auto' }}>
                  <span>MANAGE PERMITS</span>
                </Link>
                <span><a onClick={() => this.props.logout()}>LOG OUT</a></span>
              </div>
            </React.Fragment>}
          </HomeWrapper>
        );
      }} />
    );
  }
}

export default Home;