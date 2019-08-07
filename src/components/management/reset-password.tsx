import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import ErrorIcon from '@material-ui/icons/Error';


const useStyles = makeStyles(theme => ({
    button: {
        color: '#fff',
        backgroundColor: '#712177',
        padding: '10px 20px',
        '&:hover': {
            backgroundColor: '#ff7914',
        }
    },
    input: {
        '&.error': {
            '& .MuiOutlinedInput-root': {
                marginBottom: '30px;',
                '& fieldset': {
                    borderColor: 'red!important',
                    borderWidth: '2px',
                },
                '&:hover fieldset': {
                    borderColor: 'red!important',
                },
                '&.Mui-focused fieldset': {
                    borderColor: 'red!important',
                },
            },
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
}));

const variantIcon = {
    error: ErrorIcon,
};

const useStyles1 = makeStyles(theme => ({
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.main,
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

const MySnackbarContentWrapper = (props) => {
    const classes = useStyles1({});
    const { className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={clsx(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={clsx(classes.icon, classes.iconVariant)} />
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

const ResetPassword = ({ resetPasswordResetErrors, resetPasswordErrors, resetPassword, guid }) => {
    // console.log(recoverPassword('email'), 'the props is loading');
    const classes = useStyles({});
    const [open, setOpen] = React.useState(false);
    const [errMsg, setErrMsg] = React.useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');

    useEffect(() => {

        setErrMsg(resetPasswordErrors && resetPasswordErrors.response.data ? resetPasswordErrors.response.data : '');
        setOpen(!!resetPasswordErrors);

        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== password) {
                return false;
            }
            return true;
        });
    });

    return (
        <div>
            <h1 className="heading"><span>Reset password</span></h1>
            <ValidatorForm
                onSubmit={() => resetPassword({ 'password': password, 'resetPasswordGuid': guid })}
                onError={errors => console.log(errors, 'errors')}>
                <div>
                    <TextValidator
                        className={classes.input}
                        label="Password"
                        variant="outlined"
                        id="custom-css-outlined-input"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        name="email"
                        type="password"
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                </div>
                <div>
                    <TextValidator
                        className={classes.input}
                        label="Password Confirmation"
                        variant="outlined"
                        id="custom-css-outlined-input"
                        value={password_confirmation}
                        onChange={e => setPasswordConfirmation(e.target.value)}
                        name="password_confirmation"
                        type="password"
                        validators={['isPasswordMatch', 'required']}
                        errorMessages={['Password mismatch', 'this field is required']}
                    />
                </div>

                <div>
                    <Button className={classes.button} type="submit">Reset</Button>
                </div>
            </ValidatorForm>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={() => resetPasswordResetErrors()}
            >
                <MySnackbarContentWrapper
                    onClose={() => resetPasswordResetErrors()}
                    variant="error"
                    message={errMsg}
                />
            </Snackbar>
        </div>
    );
};

export { ResetPassword };

