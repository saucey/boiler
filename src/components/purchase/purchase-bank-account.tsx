import * as React from 'react'
import { IPurchase } from '../../models/purchase';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { IBankAccountAndSubscription } from '../../models/direct-debits';
import appConfig from '../../config/app-config';
import { IPaymentState } from '../../store/state';
// import { ICustomerAddForm } from '../../models';


// const customer = {
//     addressLine1: "2 Church Street",
//     addressLine2: "Ainsworth",
//     client: null,
//     company: "",
//     country: null,
//     county: "",
//     customerId: 109,
//     customerName: "",
//     directDebitCustomerId: "",
//     emailAddress: "richard.percival@davislangdon.com",
//     firstName: "G",
//     lastName: "Percival",
//     notes: "",
//     password: "",
//     passwordConfirmation: "",
//     phoneNumber: "",
//     postcode: "BL2 5RT",
//     town: "Bolton",
// }

const CssTextField = withStyles({
    root: {
        // padding: '10px',
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

const ColorButton = withStyles(theme => ({
    root: {
        '&.confirm' : {
            backgroundColor: 'rgb(255, 87, 32)'
        },
        color: '#fff',
        backgroundColor: '#712177',
        padding: '10px 20px',
        '&:hover': {
            backgroundColor: '#ff7914',
        },
    },
}))(Button);

export interface IPurchaseBankAccountProps {
    purchase: IPurchase;
    errors: any;
    payment: IPaymentState;
    addDirectDebitCustomer(customer): void;
    addDirectDebitSubscription(customerId: number, bankAccountAndSubscription: IBankAccountAndSubscription): void;
    directDebitSuccessful(): void;
}

export interface IPurchaseBankAccountState {
    account_holder_name: any,
    sort_code: any,
    account_number: any,
};

declare var GoCardless: any;

export class PurchaseBankAccount extends React.Component<IPurchaseBankAccountProps> {
    constructor(props: IPurchaseBankAccountProps) {
        super(props);
        this.state = {
            account_holder_name: '',
            sort_code: '',
            account_number: '',
            errorMsg: '',
            errors: false,
            step: 'Enter Bank Account'
        };
    }

    handleChange = (event) => {
        const { target: { name, value } } = event
        this.setState({ [name]: value })
    }

    componentDidMount() {
        // So set from API too store
        if (!this.props.purchase.customer.directDebitCustomerId) {
            this.setState({ step: 'Confirm Existing Bank Account' });
        }
    }

    componentDidUpdate(oldProps) {
        const newProps = this.props;
        if (oldProps.payment.status !== newProps.payment.status) {
            if (newProps.payment.status === 'Direct debit successful customer') {
                // Now lets process payment subscription;
                this.setState({ step: 'Confirm Direct Debit' });
            }
            if (newProps.payment.status === 'Direct debit successful') {
                this.props.directDebitSuccessful();
            }
            if (newProps.payment.status === 'Direct debit failed') {
                if (newProps.errors !== null) {
                    this.setState({ errorMsg: newProps.errors.message, errors: true });
                }
            }
        }
    }

    submitForm = () => {
        switch (this.state['step']) {
            case 'Enter Bank Account':
                this.createNewCustomer()
                break;
            case 'Confirm Direct Debit':
                this.createSubscriptionForNewAcc();
                break;
            case 'Confirm Existing Bank Account':
                this.createSubscriptionForExistingAcc();
                break;
            default:
        }
    }

    createNewCustomer() {
        this.props.addDirectDebitCustomer(this.props.purchase.customer);
    }

    createSubscriptionForNewAcc() {
        GoCardless.customerBankAccountTokens.create({
            publishable_access_token: appConfig.endPoints.goCardlessKey,
            customer_bank_account_tokens: {
                account_holder_name: this.state['account_holder_name'],
                branch_code: this.state['sort_code'], // 404209, //200000,
                account_number: this.state['account_number'], // 41382063,// 55779911,
                country_code: 'gb',
            }
        }, (response) => {
            if (response.error) {
                //register this with the app error object so can respond to this happening
            } else {
                var id = response.customer_bank_account_tokens.id;
                var ba: IBankAccountAndSubscription = {
                    customerId: this.props.payment.customer.directDebitCustomerId,
                    bankAccountToken: id, isNewBankAccount: true, description: 'Parking Permit', amount: 99.99, existingSubscriptionIdToCancel: ''
                };
                this.props.addDirectDebitSubscription(this.props.payment.customer.customerId, ba);
            }
        });
    }

    createSubscriptionForExistingAcc() {
        var ba: IBankAccountAndSubscription = {
            customerId: this.props.purchase.customer.directDebitCustomerId,
            bankAccountToken: null, isNewBankAccount: false, description: 'Parking Permit', amount: 88.88, existingSubscriptionIdToCancel: ''
        };
        this.props.addDirectDebitSubscription(this.props.purchase.customer.customerId, ba);
    }


    render() {
        // const {purchase} = this.props;
        return (
            <div>
                { this.state['step'] !== 'Confirm Existing Bank Account' && <ValidatorForm
                    ref="form"
                    onSubmit={() => this.submitForm()}
                    onError={errors => console.log(errors, 'errors')}>
                    <div>
                        <CssTextField
                            label="Account Holder Name"
                            variant="outlined"
                            id="custom-css-outlined-input"
                            value={this.state['account_holder_name']}
                            onChange={this.handleChange}
                            name="account_holder_name"
                            type="text"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                    </div>
                    <div>
                        <CssTextField
                            label="Sort Code"
                            variant="outlined"
                            id="custom-css-outlined-input"
                            value={this.state['sort_code']}
                            onChange={this.handleChange}
                            name="sort_code"
                            type="text"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                    </div>
                    <div>
                        <CssTextField
                            label="Account Number"
                            variant="outlined"
                            id="custom-css-outlined-input"
                            value={this.state['account_number']}
                            onChange={this.handleChange}
                            name="account_number"
                            type="text"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                    </div>
                    <div>
                        <p className="error">
                            {this.state['errors'] ? this.state['errorMsg'] : ''}
                        </p>
                    </div>
                    <div>
                        {this.state['step'] === 'Enter Bank Account' && <ColorButton type="submit">Purchase</ColorButton>}
                        {this.state['step'] === 'Confirm Direct Debit' && <ColorButton className="confirm" type="submit">Confirm</ColorButton>}
                    </div>
                </ValidatorForm>}
                {this.state['step'] === 'Confirm Existing Bank Account' && <ColorButton onClick={() => this.createSubscriptionForExistingAcc() }>existing account purchase</ColorButton>}
            </div>
        )
    }
}


