import * as React from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'
import { IPayment, Payment, /*Purchase,*/ IPurchase, IClient, IPermitProduct, IPermit, ICustomer } from '../../models';
import Moment from 'moment'
import { user } from '../../helpers/user';
import { dateTimeHelper } from '../../helpers';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { IPaymentState } from '../../store/state/payment-state';
import { PermitEditForm } from '../../models/permit-forms';
// import { PermitEditForm } from '../../models/permit-forms';
// import { PaymentRequestForm } from './payment-request-form';

const createOptions = (fontSize) => {
  return {
    style: {
      base: {
        fontSize, color: '#77797d', letterSpacing: '0.025em', fontFamily: "Panton W01 Light",
        '::placeholder': { color: '#000', fontFamily: 'Panton W01 Light' }
      },
      invalid: { color: 'red', iconColor: '#fa755a' },
    },
  };
};

const ColorButton = withStyles(theme => ({
  root: {
    color: '#fff',
    backgroundColor: '#712177',
    padding: '10px 30px',
    marginTop: '40px',
    '&:hover': {
      backgroundColor: '#ff7914',
    },
  },
}))(Button);

//4000 0082 6000 0000
export interface ICardFormProps {
  savedPurchase: IPurchase;
  stripe: any;
  fontSize: string;
  paymentStatus: string;
  purchase: IPurchase;
  userCustomer: ICustomer | null; 
  makePayment(payment: IPayment, customerId: number): void;
  onSavePermit(permitId: number, form: PermitEditForm, paymentAmount: number, payingDeposit: boolean): void;
  paymentState(payment: IPayment): void;
  newPurchase(purchase: IPurchase): void;
  pendingCardPayment(pendingPayment: boolean): void;
  resetErrorState(): void;
  client: IClient;
  product: IPermitProduct | null;
  payment: IPaymentState;
  permit: IPermit | null;
  payingDeposit: boolean;
  errors: any;
}

const locationParam = (param: string) => {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  return params.get(param);
}

window.localStorage.setItem('client_secret', JSON.stringify(locationParam('client_secret')));
window.localStorage.setItem('source', JSON.stringify(locationParam('source')));

export class _CardForm extends React.Component<ICardFormProps> {
  constructor(props: ICardFormProps) {
    super(props);
    this.state = {
      isPaymentDone: false,
      isError: false,
      error: [],
      client_secret: JSON.parse(window.localStorage.getItem('client_secret')) === null ? '' : JSON.parse(window.localStorage.getItem('client_secret')),
      source: JSON.parse(window.localStorage.getItem('source')) === null ? '' : JSON.parse(window.localStorage.getItem('source')),
    }
  }

  componentDidMount() {
    if ((this.state['client_secret'] && this.state['source']) !== '') {
      this.props.stripe.retrieveSource({
        id: this.state['source'],
        client_secret: this.state['client_secret'],
      }).then((result) => {
        console.log(result, 'the result')
        if (result.source.status === 'chargeable') {
          this.props.pendingCardPayment(true);
          this.props.makePayment(this.props.payment.paymentStore, this.props.payment.paymentStore.customerId);
        }
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.paymentStatus === "Payment successful" && this.props.payment && !this.state['isPaymentDone']) {
      const deposit: number = this.getDepositAmount(this.props.savedPurchase);
      this.setState({ isPaymentDone: true });

      const permitForm = {
        cardPaymentToken: this.props.payment.payment.id,
        client: this.props.client,
        customer: this.props.savedPurchase.customer,
        deposit: deposit,
        directDebitBankAccount: this.props.payment.directDebitBankAccount,
        discountEndDate: Moment(this.props.savedPurchase.discountEndDate),
        endDate: Moment(this.props.product.endDate),
        permitProductPriceId: 0,
        discountPercentage: 0,
        price: this.props.savedPurchase.frequency.price,
        product: this.props.product,
        productFrequency: this.props.savedPurchase.frequency,
        spaces: this.props.savedPurchase.spaces,
        startDate: Moment(this.props.savedPurchase.startDate),
        vrms: this.props.savedPurchase.VRMs
      }

      let p: PermitEditForm = new PermitEditForm(permitForm);
      // Below the 0 is is the permitID, this need to be generated!!!
      this.props.onSavePermit(0, p, this.props.payment.payment.amount, this.props.payingDeposit);
      // this.props.resetBankAccount();
    }

    // const { permitForm } = this.state;
    if (this.props.errors !== null && this.props.errors.message === "Unable to make payment" && !this.state['isError']) {
      this.props.pendingCardPayment(false);
      this.setState({ error: [this.props.errors] });
      this.setState({ isError: true });
    }
  }

  componentWillReceiveProps(nextProps: any) {
  }

  handleSubmit(ev) {

    const purchase = this.props.savedPurchase || this.props.purchase;
    purchase.customer = this.props.userCustomer;
    ev.preventDefault();

    if (this.props.stripe) {
      this.props.stripe.createToken().then(({ token }) => {
        const payment = this.processPermitCalc(purchase)
        if (token && token.id !== undefined) {
          payment.sourceId = token.id;
          payment.userId = user().userId;
          payment.customerId = purchase.customer.customerId;

          this.props.paymentState(payment)
          this.props.newPurchase(purchase);

          this.props.stripe.createSource({
            type: 'card',
            currency: payment.currency,
            amount: payment.amount,
          }).then(response => {
            if (response.error) {
              this.setState({ error: [response.error] });
            } else {
              let source = response.source;
              if (source.card.three_d_secure === 'not_supported' &&
                source.status === 'chargeable') {
                this.props.makePayment(this.props.payment.paymentStore, this.props.payment.paymentStore.customerId);
                // SEND TO SERVER -> CHARGE
              } else if (source.card.three_d_secure === 'required' ||
                source.card.three_d_secure === 'recommended' ||
                source.card.three_d_secure === 'optional') {
                this.props.stripe.createSource({
                  type: 'three_d_secure',
                  currency: payment.currency,
                  amount: payment.amount,
                  three_d_secure: {
                    card: source.id
                  },
                  redirect: {
                    return_url: window.location.href
                  },
                }).then(response => {
                  if (response.error) {
                    this.setState({ error: [response.error] });
                  } else {
                    this.props.resetErrorState();
                    this.props.pendingCardPayment(true);
                    let redirect = response.source.redirect;
                    window.location.href = redirect.url
                  }
                });
              }
            }
          });
        } else {
          console.log(token, 'the token')
          // if (token !== undefined) {
          //   this.setState({ error: [payload.error] });
          // }
          console.log('something fucked')
        }
      });

    } else {
      console.log('stripe.js hasnt loaded yet!!!');
    }
  };

  processPermitCalc(purchase): IPayment {
    const priceForAllSpaces: number = this.priceForAllSpaces(purchase);
    const deposit: number = this.props.payingDeposit ? this.getDepositAmount(purchase) : 0;
    const priceUntilStartofNextMonth: number = this.priceUntilStartofDirectDebit(purchase);
    const formattedPrice: number = purchase.frequency.productFrequencyName === "Monthly" ? priceUntilStartofNextMonth : priceForAllSpaces;
    const grandTotal: number = Math.round((deposit + formattedPrice) * 100) / 100;
    const formattedStartDate: string = Moment(purchase.startDate).format('DD/MM/YYYY');
    const formattedEndDate: string = dateTimeHelper.getEndDateForPeriodAsDate(Moment(purchase.startDate).toDate(), purchase.frequency.productFrequencyName);
    const discount: string = purchase.discountPercentage > 0 ? ' including ' + purchase.discountPercentage.toString() + '% discount' : '';
    let payment: IPayment = new Payment;
    payment.amount = grandTotal * 100; //must be in pence
    payment.description = 'Deposit of £' + deposit.toFixed(2).toString() + ' and payment for permit usage of £' + formattedPrice.toFixed(2).toString() + ' from ' + formattedStartDate + ' to ' + formattedEndDate + discount;
    return payment;
  };

  priceForAllSpaces(purchase): number {
    return Math.round(purchase.frequency.price * purchase.spaces * ((purchase.discountEndDate != null && purchase.discountEndDate.date < Date.now ? (1 - purchase.discountPercentage / 100) : 1) * 100)) / 100;
  };

  monthsUntilStartOfDirectDebit(purchase): number {
    return (dateTimeHelper.getDaysUsedThisMonth(purchase.startDate) < 7 ? 1 : 0) +
      dateTimeHelper.getDaysUsedThisMonth((purchase.startDate)) / dateTimeHelper.getDaysTotalThisMonth(purchase.startDate.toDate);
  };

  priceUntilStartofDirectDebit(purchase): number {
    return Math.round(this.monthsUntilStartOfDirectDebit(purchase) * this.priceForAllSpaces(purchase) * 100) / 100;
  };

  getDepositAmount(purchase): number {
    let divideBy = { "Annually": 12, "Semi-Annually": 6, "Quarterly": 3, "Monthly": 1 };
    const divideByFactor: number = purchase.frequency ? divideBy[purchase.frequency.productFrequencyName] : 1;
    return Math.round(this.priceForAllSpaces(purchase) / divideByFactor * 100) / 100;
  };

  render() {
    return (
      <div className="stripForm-wrapper">
        <form className={this.state['error'].length > 0 ? 'stripe-form error' : 'stripe-form'} onSubmit={(e) => this.handleSubmit(e)}>
          <CardElement onReady={(el) => el.focus()} {...createOptions(this.props.fontSize)} />
          <ColorButton type="submit">PAY</ColorButton>
          {/* <button type='submit'>PURCHASE!!!</button> */}
          {/* <PaymentRequestForm purchase={this.props.purchase} stripe={injectStripe}></PaymentRequestForm> */}
        </form>
        {this.state['error'].length > 0 && <span className="error text">{this.state['error'][0]['message']}</span>}
        <br />
        {this.state['isError'] && <span style={{ marginTop: 0 }} className="error text">{this.state['error'][0]['error']['response']['data']}</span>}
      </div>
    );
  }
}
export const CardForm = injectStripe(_CardForm);

// const handleBlur = () => {
//   console.log('[blur]');
// };
// const handleChange = (change) => {
//   console.log('[change]', change);
// };
// const handleFocus = () => {
//   console.log('[focus]');
// };
// const handleReady = () => {
//   console.log('[ready]');
// };