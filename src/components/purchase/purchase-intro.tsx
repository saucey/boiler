import * as React from 'react'
// import { LargeCenteredText, NextButton, VerticalSpacer15 } from '../../styles/style';
import { CSSTransition } from 'react-transition-group';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
//import { Transition, animated } from 'react-spring'

const ColorButton = withStyles(theme => ({
    root: {
        backgroundColor: 'none',
        display: 'inline-block',
        border: '3px solid#ff7914',
        width: '300px',
        margin: '20px 20px',
        padding: '10px',
        cursor: 'pointer',
        fontFamily: 'Roboto',
        textTransform: 'uppercase',
        color: 'black',
        'borderRadius': '0',
        background: 'none',
        '& MuiButton-root': {
            margin: '0 auto'
        },
        '&:hover': {
            backgroundColor: '#ff7914',
            color: '#fff'
        },
    },
}))(Button);

export interface IPurchaseIntroProps {
    begin(): void;
}

export interface IPurchaseIntroState {
    show: boolean;
};

export class PurchaseIntro extends React.Component<IPurchaseIntroProps, IPurchaseIntroState> {
    constructor(props: IPurchaseIntroProps) {
        super(props);
        this.state = { show: false };
    }

    componentDidMount() {
        setTimeout(x => this.setState({ show: true }), 50);
    }

    render() {
        return (
            <React.Fragment>
                {/* <Transition native items={true} from={{ transform: 'translate3d(0,30px,0)' }} enter={{ transform: 'translate3d(0,0px,0)' }} leave={{ transform: 'translate3d(0,30px,0)' }}>
          {show => show && (props => <animated.div style={props}><div style={{margin:'0 auto'}}><LargeCenteredText>Follow a few simple steps to purchase your parking season ticket</LargeCenteredText></div></animated.div>) }
        </Transition> */}
                {/* <VerticalSpacer15/> */}
                <p>Follow a few simple steps to purchase your parking season ticket</p>
                {/* <VerticalSpacer15/> */}
                <CSSTransition in={this.state.show} classNames="nextbuttoninfinite" timeout={1600000} unmountOnExit>
                    {/* <button onClick={() => this.props.begin()}>Begin</button> */}
                    <div>
                        <ColorButton onClick={() => this.props.begin()}>BEGIN</ColorButton>
                    </div>
                </CSSTransition>
            </React.Fragment>
        )
    }
}




