import * as React from 'react'
import { IPurchase } from '../../models/purchase';
// import { CenteredText, CenteredTextWithUnderline } from '../../styles';
import Moment from 'moment';
import { CostSummaryTable } from '../cost-summary-table';
import NumberFormat from 'react-number-format'
import { dateTimeHelper } from '../../helpers';
import { RouteComponentProps } from 'react-router-dom';
// import movieTranslations from "../../translations/movies.json";

export interface IPurchaseSummaryProps {
    purchase: IPurchase;
    payingDeposit: boolean;
}

export interface IPurchaseSummaryState {
};

export class PurchaseSummary extends React.Component<IPurchaseSummaryProps & RouteComponentProps, IPurchaseSummaryState> {
    constructor(props: IPurchaseSummaryProps) {
        super(props);
        this.state = {};
        // props.location
    }

    render() {
        const { purchase } = this.props;
        const frequencyName: string = purchase.frequency.productFrequencyName;
        const formattedEndDate: string = dateTimeHelper.getEndDateForPeriodAsDate(Moment(purchase.startDate).toDate(), purchase.frequency.productFrequencyName);
        let totalPrice: number = purchase.frequency.price * purchase.spaces;
        const formattedStartDate: string = Moment(purchase.startDate).format('DD/MM/YYYY');
        return (
            <React.Fragment>
                <div>
                    <div>{purchase.productName}</div>
                    <div>{frequencyName} at £{purchase.frequency.price} x {purchase.spaces} {purchase.spaces > 1 ? "spaces" : "space"} =
                    <NumberFormat value={totalPrice} decimalScale={2} fixedDecimalScale={true} displayType={'text'} thousandSeparator={true} prefix={'£'} /></div>
                    {frequencyName === "Annually" && <div style={{ whiteSpace: 'pre-wrap' }}>{`Your ${purchase.spaces > 1 ? "permits" :
                        "permit"} will start on ${formattedStartDate} and end on ${formattedEndDate}`}</div>}
                    {(frequencyName === "Quarterly" || frequencyName === "Monthly") &&
                        <div>{`Your ${purchase.spaces > 1 ? "permits" : "permit"} will start on ${formattedEndDate}`}</div>}
                    <CostSummaryTable payingDeposit={this.props.payingDeposit} purchase={purchase} />
                    <div style={{ fontFamily: 'Panton Narrow W00 Light Italic' }}>{frequencyName === "Monthly" ? "Continue to enter bank account details" : "Continue to enter card details for payment"}</div>
                </div>
            </React.Fragment>
        )
    }
}

export default PurchaseSummary;


