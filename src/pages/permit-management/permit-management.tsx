import * as React from 'react'
import { IPageProps } from '../page-props'
import "font-awesome/css/font-awesome.css";
import { IPermit, Vrm } from '../../models';
import { AppContainer } from '../../components'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { formatHelper } from '../../helpers'
import Moment from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPlusSquare, faSave, faEdit, faSpinner } from '@fortawesome/free-solid-svg-icons'
import Snackbar from '@material-ui/core/Snackbar';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
// import CheckCircleIcon from '@material-ui/icons/CheckCircle';
// import ErrorIcon from '@material-ui/icons/Error';
// import InfoIcon from '@material-ui/icons/Info';
// import CloseIcon from '@material-ui/icons/Close';
// import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';
// import { withStyles, WithStyles } from '@material-ui/core/styles';
// import DeleteIcon from '@material-ui/icons/Delete';

// import { ImageIcon, VerticalSpacer15, LargeCenteredText, PurchaseFooterItemLink } from '../../styles';

const useStyles1 = makeStyles(theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.main,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}));

// const variantIcon = {
//     success: CheckCircleIcon,
//     warning: WarningIcon,
//     error: ErrorIcon,
//     info: InfoIcon,
// };

const MySnackbarContentWrapper = (props) => {
    const classes = useStyles1({});
    const { className, message, onClose, variant, ...other } = props;
    // const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={clsx(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    {/* <Icon className={clsx(classes.icon, classes.iconVariant)} /> */}
                    {message}
                </span>
            }
            action={[
                <IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
                    {/* <CloseIcon className={classes.icon} /> */}
                </IconButton>,
            ]}
            {...other}
        />
    );
}





const CssTextField = withStyles({
    root: {
        width: '100%',
        // padding: '10px',
        '&.TextValidator-root-151 .Mui-error.MuiInput-underline:after': {
            borderBottomColor: 'red'
        },
        '& .MuiInputLabel-outlined': {
            lineHeight: '5px'
        },
        '& .MuiOutlinedInput-input': {
            padding: '12px 18px',
        },
        '& label.Mui-focused': {
            color: '#712177',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'blue',
        },
        '& .MuiOutlinedInput-root': {
            marginBottom: '30px;',

            '& fieldset': {
                borderColor: '#712177',
                borderWidth: '2px',
            },
            '&:hover fieldset': {
                borderColor: '#ff7914',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#ff7914',
            },
        },
    },
})(TextValidator);

export interface IPermitManagementProps extends IPageProps {
    permit: IPermit;
    permitUpdate(permitId: number, form: IPermit): void;
    purchaseUpdate: boolean;
    resetPurchaseUpdate(): void;
    classes: any;
}

export interface IPermitManagementState {
    permit: IPermit | null;
}

// export const PermitManagement = withStyles(styles1)(class PermitManagement extends React.Component<IPermitManagementProps & WithStyles>{
export class PermitManagement extends React.Component<IPermitManagementProps> {

    constructor(props: IPermitManagementProps) {
        super(props);

        this.state = {
            permit: null,
            edit: false,
            loading: false,
            open: false
        };
    }

    // static getDerivedStateFromProps(props: IPermitManagementProps, state: IPermitManagementState) {
    //     if (props.permit !== state.permit) {
    //         alert('change state');
    //         return {
    //             permit: props.permit,
    //         }
    //     }
    //     return null;
    // }

    componentDidMount() {
        this.setState({ permit: this.props.permit });
    }

    componentDidUpdate(prevProps: IPermitManagementProps, prevState: IPermitManagementState) {
        if (prevProps.permit !== this.props.permit) {
            this.setState({ permit: this.props.permit });
        }

        if (prevProps.purchaseUpdate !== this.props.purchaseUpdate) {
            if (this.props.purchaseUpdate) {
                this.setState({ loading: false, edit: false, open: true });
            }
        }
    }

    handleChange = (event) => {
        const { target: { name, value } } = event;
        this.setState({ permit: { [name]: value } });
    }

    handleChangeVrm = idx => evt => {

        const VRM = [];

        this.state['permit'].vrms.forEach((val, i) => {
            if (idx == i) {
                val.vrm = evt.target.value
            }
            return VRM.push(val);
        })

        const permit = { ...this.state['permit'] }
        permit.vrms = VRM;
        this.setState({ permit })

    };

    removeVrm = (index) => {

        const VRM = this.state['permit'].vrms.filter((el) => {
            if (this.state['permit'].vrms[index] !== el) {
                return el;
            }
        });

        var permit = { ...this.state['permit'] }
        permit.vrms = VRM;
        this.setState({ permit })

    }

    addVrm = () => {
        const VRMs = this.state['permit'].vrms;
        VRMs.push(new Vrm);
        const permit = { ...this.state['permit'] }
        permit.vrms = VRMs;
        this.setState({ permit })
    }

    savePermit = () => {
        this.props.permitUpdate(this.state['permit'].permitId, this.state['permit']);
        this.setState({ edit: false });
        this.setState({ loading: true });
    }

    editForm(e) {
        e.preventDefault()
        this.setState({ edit: true });
        this.props.resetPurchaseUpdate();
    }

    render() {
        const permit = this.state['permit'];
        return (
            <AppContainer title='Dashboard' isLogOut={false} isManagement={true} isPurchase={false} renderFooter={() => { return true && <span></span> }} render={() => {
                //if (isProcessing && customer === undefined) { return <AppLoading/>};
                return (
                    <div>
                        <Snackbar
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            open={this.state['open']}
                            autoHideDuration={6000}
                            onClose={() => this.setState({open:false})}
                        >
                            <MySnackbarContentWrapper
                                onClose={() => this.setState({open:false})}
                                variant="success"
                                message="Your permit has been successfully saved!"
                            />
                        </Snackbar>

                        <h1 className="heading"><span>Permit</span></h1>
                        {permit !== null && <ValidatorForm
                            ref="form"
                            onSubmit={() => this.savePermit()}
                            onError={errors => console.log(errors, 'errors')}>
                            <Paper style={{ maxWidth: 1200, margin: '0 auto 20px', padding: '20px' }}>
                                <span style={{ marginBottom: '40px', display: 'inline-block', color: '#712177', textDecoration: 'underline', fontSize: '1.4em', float: 'left' }}>General Permit Information</span>

                                {this.state['edit'] && <p style={{ float: 'right', marginTop: '4px' }}>
                                    {permit.vrms.length >= 1 && !this.state['loading'] ? <Button disableRipple style={{ marginLeft: '20px' }} variant="contained" color="primary" type="submit">
                                        SAVE
                                    <FontAwesomeIcon style={{ color: "#fff", margin: "0 0 0 15px" }} size="2x" icon={faSave} />
                                    </Button> : <FontAwesomeIcon style={{ color: "#eae2e2", margin: "0 auto" }} className="fa-spin" size="2x" icon={faSpinner} />}
                                </p>}


                                {this.state['loading'] && <p style={{ float: 'right', marginTop: '4px' }}>
                                    <FontAwesomeIcon style={{ color: "#eae2e2" }} className="fa-spin" size="2x" icon={faSpinner} />
                                </p>}

                                {!this.state['edit'] && !this.state['loading'] && <p style={{ float: 'right', marginTop: '4px' }}>
                                    {<Button disableRipple style={{ marginLeft: '20px', color: 'white', backgroundColor: '#43a047' }} variant="contained" onClick={(e) => this.editForm(e)}>
                                        EDIT
                                    <FontAwesomeIcon style={{ color: "#fff", margin: "0 0 0 15px" }} size="2x" icon={faEdit} />
                                    </Button>}
                                </p>}

                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <CssTextField
                                            disabled={true}
                                            label="Client"
                                            id="custom-css-outlined-input"
                                            value={permit.clientName}
                                            onChange={this.handleChange}
                                            name="clientName"
                                            type="text"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <CssTextField
                                            disabled={true}
                                            label="Product"
                                            id="custom-css-outlined-input"
                                            value={permit.permitProductName}
                                            onChange={this.handleChange}
                                            name="permitProductName"
                                            type="text"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <CssTextField
                                            disabled={true}
                                            label="Frequency"
                                            id="custom-css-outlined-input"
                                            value={permit.productFrequencyName}
                                            onChange={this.handleChange}
                                            name="productFrequencyName"
                                            type="text"
                                            validators={['required']}
                                            errorMessages={['this field is required']}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <CssTextField
                                            disabled={true}
                                            label="Spaces"
                                            // variant="outlined"
                                            id="custom-css-outlined-input"
                                            value={permit.spaces}
                                            onChange={this.handleChange}
                                            name="space"
                                            type="text"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <CssTextField
                                            disabled={true}
                                            label="Price Per Space"
                                            // variant="outlined"
                                            id="custom-css-outlined-input"
                                            value={formatHelper.toCurrency(permit.price)}
                                            onChange={this.handleChange}
                                            name="price"
                                            type="text"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <CssTextField
                                            disabled={true}
                                            label="Total Price"
                                            // variant="outlined"
                                            id="custom-css-outlined-input"
                                            value={formatHelper.toCurrency(permit.price * permit.spaces)}
                                            onChange={this.handleChange}
                                            name="total"
                                            type="text"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <CssTextField
                                            disabled={true}
                                            label="start Date"
                                            // variant="outlined"
                                            id="custom-css-outlined-input"
                                            value={permit.startDate ? Moment(this.props.permit.startDate).format("LL") : ''}
                                            onChange={this.handleChange}
                                            name="startDate"
                                            type="text"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <CssTextField
                                            disabled={true}
                                            label="End Date"
                                            // variant="outlined"
                                            id="custom-css-outlined-input"
                                            value={permit.endDate ? Moment(this.props.permit.endDate).format("LL") : ''}
                                            onChange={this.handleChange}
                                            name="endDate"
                                            type="text"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <CssTextField
                                            disabled={true}
                                            label="Discount %"
                                            // variant="outlined"
                                            id="custom-css-outlined-input"
                                            value={permit.discountPercentage}
                                            onChange={this.handleChange}
                                            name="discountPercentage"
                                            type="text"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <CssTextField
                                            disabled={true}
                                            label="Discount End Date"
                                            // variant="outlined"
                                            id="custom-css-outlined-input"
                                            value={permit.discountEndDate ? Moment(permit.discountEndDate).format("LL") : ''}
                                            onChange={this.handleChange}
                                            name="discountEndDate"
                                            type="text"
                                        />
                                    </Grid>
                                </Grid>
                            </Paper>
                            <Paper className="customPaper" style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
                                <span style={{ marginBottom: permit.vrms.length >= 1 ? '40px' : '0px', display: 'inline-block', color: '#712177', textDecoration: 'underline', fontSize: '1.4em', float: 'left' }}>Permit VRM's</span>
                                <Button className="editBtn" variant="contained" color="secondary" disabled={!this.state['edit']} onClick={() => this.addVrm()} style={{ marginBottom: '0px', cursor: 'pointer', float: 'right', color: '#fff', fontWeight: 600 }}><span style={{ verticalAlign: '0.7em' }}>Add VRM</span><FontAwesomeIcon style={{ color: "#fff", margin: "0 0 0 15px" }} size="2x" icon={faPlusSquare} /></Button>
                                {permit.vrms.length >= 1 && <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>No</TableCell>
                                            <TableCell>VRM's</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {permit.vrms.map((row, i) => (
                                            <TableRow key={i}>
                                                <TableCell align="left">{i + 1}</TableCell>
                                                <TableCell align="left">
                                                    <CssTextField
                                                        disabled={!this.state['edit']}
                                                        label="Vrm"
                                                        // variant="outlined"
                                                        id="custom-css-outlined-input"
                                                        value={row.vrm}
                                                        onChange={this.handleChangeVrm(i)}
                                                        // name="vrm"
                                                        type="text"
                                                        validators={['required']}
                                                        errorMessages={['this VRM field is required']}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Button style={{ color: 'white' }} disableRipple disabled={!this.state['edit']} variant="contained" color="secondary" onClick={() => this.removeVrm(i)}>
                                                        Delete
                                                        <FontAwesomeIcon style={{ color: "#fff", margin: "0 0 0 15px" }} size="1x" icon={faTrashAlt} />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>}
                            </Paper>
                        </ValidatorForm>}
                    </div>
                );
            }} />
        );
    }
}