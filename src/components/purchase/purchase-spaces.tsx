import * as React from 'react'
// import { NextButton, VerticalSpacer15, NumberSpacesInput } from '../../styles';
import { CSSTransition } from 'react-transition-group';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'

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
            marginBottom: '20px;',

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
})(TextField);

export interface IPurchaseSpacesProps {
    defaultSpaces: number;
    selectSpaces(spaces: number): void;
}

export interface IPurchaseSpacesState {
    spaces: number;
};

//  const animation = {
// '.active-enter': {  opacity: 0.01, transform: `scale(0.9) translateY('50%')`},
// '.active-enter-active': {  opacity: 1,  transform: `scale(1.0) translateY('0%')`, transition: 'all 300ms ease-out'},
// '.active-exit': {  opacity: 1,  transform: `scale(1.0) translateY('0%')`},
// '.active-exit-active': {  opacity: 0.01,  transform: `scale(0.9) translateY('50%')`,  transition: 'all 300ms ease-out'}
// };

export class PurchaseSpaces extends React.Component<IPurchaseSpacesProps, IPurchaseSpacesState> {
    constructor(props: IPurchaseSpacesProps) {
        super(props);
        this.state = { spaces: this.props.defaultSpaces };
    }

    selectSpaces() {
        this.props.selectSpaces(this.state.spaces);
    }

    // onChangeText(value: string) {
    //     this.setState({ spaces: parseFloat(value) });
    // }

    handleChange = (val) => {
        this.setState({ spaces: parseFloat(val) });
      }

    render() {
        const { spaces } = this.state;
        return (
            <div>
                {/* <VerticalSpacer15/> */}
                {/* <input type="number" min={1} value={spaces} onChange={e => this.onChangeText(e.currentTarget.value)} /> */}
                <div>
                    <CssTextField
                        // min={1}
                        label="Spaces"
                        variant="outlined"
                        id="custom-css-outlined-input"
                        value={spaces}
                        onChange={e => this.handleChange(e.currentTarget.value)}
                        name="spaces"
                        type="number"
                    />
                </div>
                {/* <VerticalSpacer15/> */}
                <CSSTransition unmountOnExit in={this.state.spaces ? true : false} classNames="active" timeout={300}>
                    <span onClick={() => this.selectSpaces()}>
                        <FontAwesomeIcon style={{ color: "#712177", cursor: 'pointer' }} size="4x" icon={faArrowAltCircleRight} />
                    </span>
                </CSSTransition>
            </div>
        )
    }
}


