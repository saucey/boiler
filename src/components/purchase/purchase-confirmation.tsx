import * as React from 'react'
import { IPurchase } from '../../models/purchase';
// import { CenteredText, VerticalSpacer5 } from '../../styles/style';
import { Link } from 'react-router-dom'
import Moment from 'moment'
import { dateTimeHelper } from '../../helpers';
import { purchaseCalculator } from '../../helpers/purchase-calculator';
import { IPermit } from '../../models';
import NumberFormat from 'react-number-format';
// import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';

export interface IPurchaseConfirmationProps {
    purchase: IPurchase;
    permit: IPermit | null;
    payingDeposit: boolean;
    pendingCardPayment(pendingPayment: boolean): void;
}

export interface IPurchaseConfirmationState {
};

export class PurchaseConfirmation extends React.Component<IPurchaseConfirmationProps, IPurchaseConfirmationState> {
    constructor(props: IPurchaseConfirmationProps) {
        super(props);
        this.state = {};
    }
    
    componentDidMount() {
        localStorage.removeItem('state');
        localStorage.removeItem('source');
        localStorage.removeItem('client_secret');
        this.props.pendingCardPayment(false);
    }

    render() {
        const { /*purchase,*/ permit } = this.props;

        let formattedStartDate: string;
        let formattedEndDate: string;
        let grandTotal: number;

        if (this.props.payingDeposit) {
            const productFrequencyName = permit.productFrequency.productFrequencyName;
            let priceForAllSpaces: number = permit.productFrequency.price * permit.spaces;
            const priceUntilStartofNextMonth: number = purchaseCalculator.priceUntilStartofNextMonth(priceForAllSpaces, Moment(permit.startDate).toDate());
            formattedStartDate = Moment(permit.startDate).format('DD/MM/YYYY');
            formattedEndDate = dateTimeHelper.getEndDateForPeriodAsDate(Moment(permit.startDate).toDate(), permit.productFrequency.productFrequencyName);
            const deposit: number = purchaseCalculator.getDepositAmount(priceForAllSpaces, permit.productFrequency.productFrequencyName);
            const formattedPrice: number = productFrequencyName === "Monthly" ? priceUntilStartofNextMonth : priceForAllSpaces;
            grandTotal = Math.round((deposit + formattedPrice) * 100) / 100;
        } else {
            formattedStartDate = Moment(permit.startDate).format('DD/MM/YYYY');
            formattedEndDate = dateTimeHelper.getEndDateForPeriodAsDate(Moment(permit.startDate).toDate(), permit.productFrequency.productFrequencyName);
            grandTotal = Math.round(this.props.permit.initialPayment * 100) / 100;
        }

        return (
            <div>
                {/* <VerticalSpacer5/> */}
                <div>Thank you for your purchase.  You will receive a confirmation email shortly.</div>
                {permit && <div>Your permit reference number is {permit.permitId}.</div>}
                <div>You have just paid <NumberFormat style={{ color: '#ff7914' }} value={grandTotal} decimalScale={2} fixedDecimalScale={true} displayType={'text'} thousandSeparator={true} prefix={'£'} />.</div>
                <div>{permit.productFrequency.productFrequencyName !== "Monthly" ? `Your permit will start on ${formattedStartDate} and end on ${formattedEndDate}.` :
                    `Your permit will start on ${formattedStartDate} and will renew each month.`}</div>
                <div>To manage your permit, please go to the <Link to="" style={{ color: '#ff7914', textDecoration: 'underline' }}>Manage your Permits</Link> section.</div>
                <br />
            </div>
        )
    }
}

