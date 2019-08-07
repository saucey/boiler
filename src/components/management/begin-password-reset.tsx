import React, { useState, useEffect } from 'react'
import green from '@material-ui/core/colors/green';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import clsx from 'clsx';

const variantIcon = {
    success: CheckCircleIcon
  };

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

const BeginPasswordReset = ({ resetRecoverPasswordGuid, recoverPasswordGuid, recoverPassword }) => {
    // console.log(recoverPassword('email'), 'the props is loading');
    const classes = useStyles({});

    const [email, setEmail] = useState('');
    const [open, setOpen] = React.useState(false);
    // const prevCountRef = useRef();

    useEffect(() => {
        setOpen(recoverPasswordGuid)
    });

    return (
        <div>
            <h1 className="heading"><span>Begin password reset</span></h1>
            <ValidatorForm
                onSubmit={() => recoverPassword(email)}
                onError={errors => console.log(errors, 'errors')}>
                <div>
                    <TextValidator
                        className={classes.input}
                        label="Email"
                        variant="outlined"
                        id="custom-css-outlined-input"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        name="email"
                        type="text"
                        validators={['required', 'isEmail']}
                        errorMessages={['this field is required', 'email is not valid']}
                    />
                </div>

                <div>
                    <Button className={classes.button} type="submit">request</Button>
                </div>

            </ValidatorForm>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={() => resetRecoverPasswordGuid()}
            >
                <MySnackbarContentWrapper
                    onClose={() => resetRecoverPasswordGuid()}
                    variant="success"
                    message="A reset password link will be sent your email address"
                />
            </Snackbar>
        </div>
    );
};

export { BeginPasswordReset };

