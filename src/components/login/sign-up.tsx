import * as React from 'react'
// import { VrmGrid, SignUpInput} from '../../styles';
import { ICustomerAddForm, CustomerAddForm } from '../../models';
import { withStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';


const CssTextField = withStyles({
    root: {
        '& MuiFormHelperText-root MuiFormHelperText-contained Mui-error': {
            color: 'green'
        },
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
        color: '#fff',
        padding: '10px 20px',
        backgroundColor: '#712177',
        '&:hover': {
            backgroundColor: '#ff7914',
        },
    },
}))(Button);


export interface ISignUpProps {
    onValid: any;
    reg: any;
}

export interface ISignUpState {
    customerForm: ICustomerAddForm | null;
    errors: any;
    // purchase:IPurchase | null;
    // nextUrl: string;
};

//  const animation = {
// '.active-enter': {  opacity: 0.01, transform: `scale(0.9) translateY('50%')`},
// '.active-enter-active': {  opacity: 1,  transform: `scale(1.0) translateY('0%')`, transition: 'all 300ms ease-out'},
// '.active-exit': {  opacity: 1,  transform: `scale(1.0) translateY('0%')`},
// '.active-exit-active': {  opacity: 0.01,  transform: `scale(0.9) translateY('50%')`,  transition: 'all 300ms ease-out'}
// };

export class SignUp extends React.Component<ISignUpProps, ISignUpState> {
    constructor(props: ISignUpProps) {
        super(props);
        this.state = { customerForm: new CustomerAddForm, errors: {} };

        const payloadNew = {
            customerId: 0,
            firstName: 'Leo2',
            lastName: 'Scott2',
            customerName: 'Leo The Customer',
            company: 'Roberty Gordon University',
            client: {
                'clientId': 307,
                'clientName': "string",
                'shouldShowSites': true
            },
            addressLine1: '43 harold road',
            addressLine2: 'crystal palace',
            town: 'London',
            county: 'Greater London',
            postcode: 'SE193PL',
            country: {
                'countryId': 0,
                'countryName': "string"
            },
            userId: 0,
            phoneNumber: '07492065784',
            emailAddress: 'leo@designanddev14.com',
            password: 'password123',
            notes: 'N/A',
            createdBy: 0,
            createdDate: new Date(),
            updatedBy: 0,
            updatedDate: new Date()
        }

        this.props.reg(payloadNew);
    }

    onChange(changedState: any) {
        const { customerForm } = this.state;
        this.setState(this.setFormState({ ...changedState }, customerForm));
    }

    onChangeText(key: string, value: string) {
        const { customerForm } = this.state;

        let changedState = { [key]: value };
        this.setState(this.setFormState({ ...changedState }, customerForm));
    }

    setFormState(changedState: any, customerForm: ICustomerAddForm | null) {
        return { customerForm: { ...customerForm, ...changedState } };
    }

    formSubmit() {
        this.setState(state => (state.customerForm.customerName = this.state.customerForm.firstName, state));
        this.props.reg(this.state.customerForm);
    }

    render() {
        const { customerForm } = this.state;
        return (
            <ValidatorForm
                ref="form"
                onSubmit={() => this.formSubmit()}
                onError={errors => this.setState({ errors: errors })}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-3">
                            <CssTextField
                                label="First Name *"
                                variant="outlined"
                                id="custom-css-outlined-input"
                                onChange={e => this.onChangeText('firstName', e.currentTarget.value)}
                                name="firstName"
                                autoFocus={true} value={customerForm.firstName} autoCapitalize='off' autoCorrect='off' spellCheck={false}
                                type="text"
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                        </div>
                        <div className="col-3">
                            <CssTextField
                                label="Last Name *"
                                variant="outlined"
                                id="custom-css-outlined-input"
                                onChange={e => this.onChangeText('lastName', e.currentTarget.value)}
                                name="lastName"
                                autoFocus={false} value={customerForm.lastName} autoCapitalize='off' autoCorrect='off' spellCheck={false}
                                type="text"
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-3">
                            <CssTextField
                                label="Company"
                                variant="outlined"
                                id="custom-css-outlined-input"
                                onChange={e => this.onChangeText('company', e.currentTarget.value)}
                                name="company"
                                autoFocus={false} value={customerForm.company} autoCapitalize='off' autoCorrect='off' spellCheck={false}
                                type="text"
                            />
                        </div>
                        <div className="col-3">
                            <CssTextField
                                label="Phone"
                                variant="outlined"
                                id="custom-css-outlined-input"
                                onChange={e => this.onChangeText('phoneNumber', e.currentTarget.value)}
                                name="phone"
                                autoFocus={false} value={customerForm.phoneNumber} autoCapitalize='off' autoCorrect='off' spellCheck={false}
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-3">
                            <CssTextField
                                label="Address Line 1"
                                variant="outlined"
                                id="custom-css-outlined-input"
                                onChange={e => this.onChangeText('addressLine1', e.currentTarget.value)}
                                name="address_line_1"
                                autoFocus={false} value={customerForm.addressLine1} autoCapitalize='off' autoCorrect='off' spellCheck={false}
                                type="text"
                            />
                        </div>
                        <div className="col-3">
                            <CssTextField
                                label="Address Line 2"
                                variant="outlined"
                                id="custom-css-outlined-input"
                                onChange={e => this.onChangeText('addressLine2', e.currentTarget.value)}
                                name="address_line_2"
                                autoFocus={false} value={customerForm.addressLine2} autoCapitalize='off' autoCorrect='off' spellCheck={false}
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-3">
                            <CssTextField
                                label="City *"
                                variant="outlined"
                                id="custom-css-outlined-input"
                                onChange={e => this.onChangeText('town', e.currentTarget.value)}
                                name="city"
                                autoFocus={false} value={customerForm.town} autoCapitalize='off' autoCorrect='off' spellCheck={false}
                                type="text"
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                        </div>
                        <div className="col-3">
                            <CssTextField
                                label="Postcode *"
                                variant="outlined"
                                id="custom-css-outlined-input"
                                onChange={e => this.onChangeText('postcode', e.currentTarget.value)}
                                name="postcode"
                                autoFocus={false} value={customerForm.postcode} autoCapitalize='off' autoCorrect='off' spellCheck={false}
                                type="text"
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-3">
                            <CssTextField
                                label="Email *"
                                variant="outlined"
                                id="custom-css-outlined-input"
                                onChange={e => this.onChangeText('emailAddress', e.currentTarget.value)}
                                name="email"
                                autoFocus={false} value={customerForm.emailAddress} autoCapitalize='off' autoCorrect='off' spellCheck={false}
                                type="text"
                                validators={['required', 'isEmail']}
                                errorMessages={['this field is required', 'email is not valid']}
                            />
                        </div>
                        <div className="col-3">
                            <CssTextField
                                label="Password *"
                                variant="outlined"
                                id="custom-css-outlined-input"
                                onChange={e => this.onChangeText('password', e.currentTarget.value)}
                                name="password"
                                autoFocus={false} value={customerForm.password} autoCapitalize='off' autoCorrect='off' spellCheck={false}
                                type="password"
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                        </div>
                    </div>
                </div>
                <ColorButton type="submit">SUBMIT</ColorButton>
            </ValidatorForm>
        )
    }
}
