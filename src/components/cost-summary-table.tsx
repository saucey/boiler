import * as React from 'react'
import { IPurchase } from '../models/purchase';
// import { TableRowDescription, TableRowAmount, TableHeader, TableRow, Table } from '../styles';
import { dateTimeHelper } from '../helpers';
import Moment from 'moment';
import { purchaseCalculator } from '../helpers/purchase-calculator';
var NumberFormat = require('react-number-format');
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
import { withStyles, WithStyles } from '@material-ui/core/styles';

export interface ICardPaymentSummaryProps {
    purchase: IPurchase;
    classes: any;
    payingDeposit: boolean;
}

const styles = {
    root: {
        backgroundColor: 'red',
    },
    table: {
        maxWidth: 700,
        margin: '20px auto',
        border: '1px solid #712177',
        backgroundColor: '#f7f2f7',
    },
};

export const CostSummaryTable = withStyles(styles)(class CostSummaryTable extends React.Component<ICardPaymentSummaryProps>{
    constructor(props: ICardPaymentSummaryProps & WithStyles) {
        super(props);
    }

    render() {
        // const classes = useStyles();
        const { purchase } = this.props;
        const productFrequencyName: string = purchase.frequency.productFrequencyName;
        let priceForAllSpaces: number = purchase.frequency.price * purchase.spaces;
        const priceUntilStartofNextMonth: number = purchaseCalculator.priceUntilStartofNextMonth(priceForAllSpaces, Moment(purchase.startDate).toDate());

        const formattedStartOfNextMonth: string = dateTimeHelper.getStartOfNextMonthAsDate(Moment(purchase.startDate).toDate());
        const formattedStartDate: string = Moment(purchase.startDate).format('DD/MM/YYYY');
        const formattedEndDate: string = dateTimeHelper.getEndDateForPeriodAsDate(Moment(purchase.startDate).toDate(), purchase.frequency.productFrequencyName);
        const formattedPartialPayment: string = productFrequencyName === "Monthly" ?
            `Period from ${formattedStartDate} to end of the ${purchase.frequency.productFrequencyPeriodName}` : `Period from ${formattedStartDate} to ${formattedEndDate}`;

        const deposit: number = this.props.payingDeposit ? purchaseCalculator.getDepositAmount(priceForAllSpaces, purchase.frequency.productFrequencyName) : 0;
        const formattedPrice: number = productFrequencyName === "Monthly" ? priceUntilStartofNextMonth : priceForAllSpaces;
        const grandTotal: number = Math.round((deposit + formattedPrice) * 100) / 100;
        return (
            <React.Fragment>
                <div className={this.props.classes.table}>
                    <div>Card Payment</div>
                    <Table><TableBody>
                        {this.props.payingDeposit && <TableRow>
                            <TableCell>Deposit of one month here</TableCell>
                            <TableCell><NumberFormat value={deposit} decimalScale={2} fixedDecimalScale={true} displayType={'text'} thousandSeparator={true} prefix={'£'} /></TableCell>
                        </TableRow>}
                        <TableRow>
                            <TableCell>{formattedPartialPayment}</TableCell>
                            <TableCell><NumberFormat style={{ textDecoration: 'underline' }} value={formattedPrice} decimalScale={2} fixedDecimalScale={true} displayType={'text'} thousandSeparator={true} prefix={'£'} /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Total</TableCell>
                            <TableCell><NumberFormat value={grandTotal} displayType={'text'} fixedDecimalScale={true} decimalScale={2} thousandSeparator={true} prefix={'£'} /></TableCell>
                        </TableRow>
                    </TableBody></Table>
                    {purchase.frequency.productFrequencyName === "Monthly" &&
                        <React.Fragment>
                            <div>Direct Debit</div>
                            <Table><TableBody>
                                <TableRow>
                                    <TableCell>Ongoing {purchase.frequency.productFrequencyName.toLowerCase()} payments starting {formattedStartOfNextMonth}</TableCell>
                                    <TableCell><NumberFormat value={priceForAllSpaces} displayType={'text'} fixedDecimalScale={true} decimalScale={2} thousandSeparator={true} prefix={'£'} /></TableCell>
                                </TableRow>
                            </TableBody></Table>
                        </React.Fragment>}
                </div>
            </React.Fragment>
        );
    }
})

// export default withStyles(styles)(CostSummaryTable)