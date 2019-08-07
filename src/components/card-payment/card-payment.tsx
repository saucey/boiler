import * as React from 'react'
import { StripeProvider } from 'react-stripe-elements'
import { Checkout } from '.';
import { IPurchase, IPayment, IClient, IPermitProduct, IPermit, ICustomer } from '../../models';
import { IPaymentState } from '../../store/state/payment-state';
import { PermitEditForm } from '../../models/permit-forms';

export interface ICardPaymentProps {
  savedPurchase:IPurchase;
  purchase: IPurchase;
  paymentStatus: string;
  userCustomer: ICustomer | null; 
  buyPermit(): void;
  makePayment(payment: IPayment, customerId: number): void;
  newPurchase(purchase: IPurchase): void;
  pendingCardPayment(pendingPayment: boolean): void;
  paymentState(payment: IPayment): void;
  onSavePermit(permitId: number, form: PermitEditForm, paymentAmount: number, payingDeposit:boolean): void;
  resetErrorState(): void;
  client: IClient;
  product: IPermitProduct | null;
  payment: IPaymentState;
  permit: IPermit | null;
  payingDeposit: boolean;
  errors: any;
}

export interface ICardPaymentState {
}

export class CardPayment extends React.Component<ICardPaymentProps, ICardPaymentState>{
  constructor(props: ICardPaymentProps) {
    super(props);
    this.state = {};
  }

  render() {
    const { purchase } = this.props;
    return (
      <StripeProvider apiKey="pk_test_Lq0aD6djsm4pANJItCXGOk2m">
        <Checkout userCustomer={this.props.userCustomer} resetErrorState={this.props.resetErrorState} errors={this.props.errors} pendingCardPayment={this.props.pendingCardPayment} newPurchase={this.props.newPurchase} savedPurchase={this.props.savedPurchase} payingDeposit={this.props.payingDeposit} permit={this.props.permit} onSavePermit={this.props.onSavePermit} payment={this.props.payment} client={this.props.client} product={this.props.product} paymentStatus={this.props.paymentStatus} makePayment={this.props.makePayment} purchase={purchase} buyPermit={this.props.buyPermit} paymentState={this.props.paymentState}/>
      </StripeProvider>
    );
  }
}


