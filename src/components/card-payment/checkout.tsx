import glamorous from "glamorous";
import React from "react";
import { CardForm, PaymentRequestForm } from ".";
import { Elements } from 'react-stripe-elements'
// import { VerticalSpacer5, PayButton } from "../../styles/style";
import { IPurchase, IPayment, IClient, IPermitProduct, IPermit, ICustomer } from "../../models";
import { IPaymentState } from "../../store/state/payment-state";
import { PermitEditForm } from "../../models/permit-forms";


export const CheckoutDiv = glamorous.div({ margin: '0 auto', fontFamily: 'Panton W01 Light', width: 400, maxWidth: 800, boxSizing: 'border-box', padding: '0 5px' });

export interface ICheckoutProps {
  savedPurchase: IPurchase;
  purchase: IPurchase;
  paymentStatus: string;
  userCustomer: ICustomer | null; 
  buyPermit(): void;
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

export interface ICheckoutState {
  elementFontSize: string;
}

const url = `https://staticresource.blob.core.windows.net/fonts/1519110/86377c61-f730-4059-8764-41ea8a511df9.woff`;
const font = [{ family: 'Panton W01 Light', src: `url(${url})` }];

export class Checkout extends React.Component<ICheckoutProps, ICheckoutState> {
  constructor(props: ICheckoutProps) {
    super(props);
    this.state = { elementFontSize: window.innerWidth < 450 ? '14px' : '20px', };
    window.addEventListener('resize', () => {
      if (window.innerWidth < 450 && this.state.elementFontSize !== '14px') {
        this.setState({ elementFontSize: '14px' });
      } else if (window.innerWidth >= 450 && this.state.elementFontSize !== '20px') { this.setState({ elementFontSize: '20px' }); }
    });
  }

  render() {
    const { purchase } = this.props;
    const { elementFontSize } = this.state;
    return (
      <CheckoutDiv>
        <Elements fonts={font}>
          <CardForm userCustomer={this.props.userCustomer} resetErrorState={this.props.resetErrorState} errors={this.props.errors} pendingCardPayment={this.props.pendingCardPayment} newPurchase={this.props.newPurchase} savedPurchase={this.props.savedPurchase} payingDeposit={this.props.payingDeposit} permit={this.props.permit} onSavePermit={this.props.onSavePermit} payment={this.props.payment} client={this.props.client} product={this.props.product} purchase={purchase} fontSize={elementFontSize} makePayment={this.props.makePayment} paymentStatus={this.props.paymentStatus} buyPermit={this.props.buyPermit} paymentState={this.props.paymentState} />
        </Elements>
        <Elements>
          <PaymentRequestForm purchase={purchase} />
        </Elements>
        {/* <button onClick={() => this.props.buyPermit()}>Buy Permit</button> */}
      </CheckoutDiv>
    );
  }
}