import * as React from 'react'
// import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import { SignUpInput, NextButton } from '../../styles';
import { withStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Link } from 'react-router-dom';

const CssTextField = withStyles({
  root: {
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
    backgroundColor: '#712177',
    padding: '10px 20px',
    '&:hover': {
      backgroundColor: '#ff7914',
    },
  },
}))(Button);

export interface ISignInProps {
  nextUrl: string;
  errors: any;
  login(userName: string, password: string, nextUrl: string): void;
}

export interface ISignInState {
  userName: any;
  password: any;
  errors: boolean;
};

export class SignIn extends React.Component<ISignInProps> {
  constructor(props: ISignInProps) {
    super(props);

    this.state = {
      userName: '',
      password: '',
      errors: false,
    };
  }

  handleChange = (event) => {
    const { target: { name, value } } = event
    this.setState({ [name]: value })
  }

  componentDidUpdate(prevProps: ISignInProps) {
    if (this.props.errors !== prevProps.errors) {
      this.setState({ errors: true });
    }
  }

  render() {
    return (
      <ValidatorForm
        ref="form"
        onSubmit={() => this.props.login(this.state['userName'], this.state['password'], this.props.nextUrl)}
        onError={errors => console.log(errors, 'errors')}>
        <div>
          <CssTextField
            className={this.state['errors'] ? 'error' : ''}
            label="Username"
            variant="outlined"
            id="custom-css-outlined-input"
            value={this.state['userName']}
            onChange={this.handleChange}
            name="userName"
            type="text"
            validators={['required']}
            errorMessages={['this field is required']}
          />
        </div>
        <div style={{ position: 'relative' }}>
          <CssTextField
            className={this.state['errors'] ? 'error' : ''}
            label="Password"
            variant="outlined"
            id="custom-css-outlined-input"
            value={this.state['password']}
            onChange={this.handleChange}
            name="password"
            type="password"
            validators={['required']}
            errorMessages={['this field is required']}
          />
          <Link to={{ pathname: '/management/begin-password-reset' }} style={{ paddingbottom: '5px', position: 'absolute', bottom: '-25px', left: '50%', transform: 'translate(-50%, -50%)', color: 'rgb(113, 33, 119)', textDecoration: 'underline' }}>
            <span>Forgotten your password?</span>
          </Link>
        </div>
        {this.state['errors'] && <p className="error">
          Your username or password is incorrect
        </p>}
        <div style={{ marginTop: '20px' }}>
          <ColorButton type="submit">LOGIN</ColorButton>
        </div>
      </ValidatorForm>
    )
  }
}
