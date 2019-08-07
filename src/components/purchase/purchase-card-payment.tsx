import * as React from 'react'
import { IPurchase } from '../../models/purchase';
import { CardPayment } from '../card-payment';
import { IPayment, IClient, IPermitProduct, IPermit, ICustomer } from '../../models';
import { IPaymentState } from '../../store/state/payment-state';
import { PermitEditForm } from '../../models/permit-forms';

export interface IPurchaseCardPaymentProps {
    savedPurchase: IPurchase;
    purchase:IPurchase;
    paymentStatus: string;
    userCustomer: ICustomer | null; 
    buyPermit():void;
    makePayment(payment: IPayment, customerId: number): void;
    paymentState(payment: IPayment): void;
    newPurchase(purchase: IPurchase): void;
    pendingCardPayment(pendingPayment: boolean): void;
    onSavePermit(permitId: number, form: PermitEditForm, paymentAmount: number, payingDeposit:boolean): void;
    resetErrorState(): void;
    client: IClient;
    product: IPermitProduct | null;
    payment: IPaymentState;
    permit: IPermit | null;
    payingDeposit: boolean;
    errors: any;
}
    
export interface IPurchaseCardPaymentState {
};
    
export class PurchaseCardPayment extends React.Component<IPurchaseCardPaymentProps, IPurchaseCardPaymentState> {
    constructor(props: IPurchaseCardPaymentProps) {
        super(props);
        this.state = {};         
    }

render() {
    const {purchase} = this.props;
    return (
         <div style={{margin:'0 auto'}}>
             <CardPayment resetErrorState={this.props.resetErrorState} userCustomer={this.props.userCustomer} errors={this.props.errors} pendingCardPayment={this.props.pendingCardPayment} newPurchase={this.props.newPurchase} savedPurchase={this.props.savedPurchase} payingDeposit={this.props.payingDeposit} permit={this.props.permit} onSavePermit={this.props.onSavePermit} payment={this.props.payment} client={this.props.client} product={this.props.product} paymentStatus={this.props.paymentStatus} purchase={purchase} buyPermit={this.props.buyPermit} makePayment={this.props.makePayment} paymentState={this.props.paymentState}/>
         </div>
    )}
}


