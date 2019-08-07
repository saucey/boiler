import * as React from 'react'
import "font-awesome/css/font-awesome.css";
import { IPermit } from '../../models';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles, WithStyles } from '@material-ui/core/styles';

const styles = {
    table: {
        maxWidth: 1200,
        margin: '20px auto',
        border: '1px solid #712177',
        backgroundColor: '#f7f2f7',
        '& .MuiTableCell-root': {
            padding: '50px 25px',
        },
        '& .MuiTableBody-root .MuiTableCell-root': {
            padding: '50px 25px',
            cursor: 'pointer',
        },
        '& .MuiTableBody-root .MuiTableRow-root': {
            '&:hover': {
                backgroundColor: '#f6f3f9'
            }
        },
    },
};

export interface IPermitsProps {
    permits: Array<IPermit>;
    classes: any;
    permitEdit(permitId): void;
}

export interface IPermitsState {
    // selectedTab: number;
}



export const Permits = withStyles(styles)(class Permits extends React.Component<IPermitsProps, IPermitsState>{
    // export class Permits extends React.Component<IPermitsProps, IPermitsState>{
    // export class Permits extends React.Component<IPermitsProps, IPermitsState>{

    constructor(props: IPermitsProps & WithStyles) {
        super(props);
    }


    render() {
        // this.state['step']
        const { permits } = this.props;
        //const {customer, isProcessing, clients, regions, countries, fetchCustomer, onSave, resetSuccess, onCancel, isSaved } = this.props;
        if(permits.length > 0) {
        return (
            <div>
                <h1 className="heading"><span>Permits</span></h1>
                <div className={this.props.classes.table}>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Client</TableCell>
                                    <TableCell align="right">Product</TableCell>
                                    <TableCell align="right">Frequency</TableCell>
                                    <TableCell align="right">Spaces</TableCell>
                                    <TableCell align="right">Start Date</TableCell>
                                    <TableCell align="right">End Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {permits.map((row, i) => (
                                    <TableRow key={i} onClick={() => this.props.permitEdit(row.permitId)}>
                                        <TableCell component="th" scope="row">
                                            {row.client.clientName}
                                        </TableCell>
                                        <TableCell align="right">{row.product.permitProductName}</TableCell>
                                        <TableCell align="right">{row.productFrequencyName}</TableCell>
                                        <TableCell align="right">{row.spaces}</TableCell>
                                        <TableCell align="right">{row.startDate}</TableCell>
                                        <TableCell align="right">{row.endDate}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            </div>
        )} else {
            return (
                <div>
                    <h1 className="heading"><span>Permits</span></h1>
                    <p>Sorry no permits are available</p>
                </div>
            )
        }
    }
})