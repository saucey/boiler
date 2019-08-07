import * as React from 'react'
import { Purchase } from '../../models/purchase';
// import { CenteredText, VerticalSpacer5, VrmGrid, VrmGridRow, VrmGridAddButton, VrmGridDeleteButton, NextButton, VrmGridInput } from '../../styles';
import { IVrm, Vrm } from '../../models';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import  '../../styles/css.css'
//import { Flipper } from 'react-flip-toolkit';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleRight, faTrashAlt } from '@fortawesome/free-solid-svg-icons'


const CssTextField = withStyles({
    root: {
        // padding: '10px',
        float: 'left',

        '& error-input': {
            border: '1px solid red',
            '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                    borderColor: 'red',
                },
            },
        },
        '& .MuiInputLabel-outlined': {
            lineHeight: '5px'
        },
        '& .MuiOutlinedInput-input': {
            padding: '12px 18px',
            width: '230px',
        },
        '& label.Mui-focused': {
            color: '#712177',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'blue',
        },
        '& .MuiOutlinedInput-root': {
            marginBottom: '15px;',
            marginRight: '10px',
            float: 'left',

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

export interface IPurchaseVrmsProps {
    purchase: Purchase;
    selectVrms(Vrms: Array<IVrm>): void;
}

export interface IPurchaseVrmsState {
    VRMs: Array<IVrm>;
    addingRow: boolean;
};

export class PurchaseVrms extends React.Component<IPurchaseVrmsProps, IPurchaseVrmsState> {
    constructor(props: IPurchaseVrmsProps) {
        super(props);
        this.state = { VRMs: this.props.purchase.VRMs.length > 0 ? this.props.purchase.VRMs : [new Vrm], addingRow: false };
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log(nextState, 'next state!!!')
    // }

    onChangeText(text: string, index: number) {
        let VRMs: Array<IVrm> = this.state.VRMs;
        let VRM: IVrm = VRMs[index];
        VRM.vrm = text.toUpperCase();
        this.setState({ VRMs: VRMs });
    }

    addRow() {
        let VRMs: Array<IVrm> = this.state.VRMs;
        let VRM: IVrm = new Vrm;
        VRMs.push(VRM);
        this.setState({ VRMs: VRMs, addingRow: true });
    }

    deleteRow(index: number) {
        let VRMs: Array<IVrm> = this.state.VRMs;
        VRMs.splice(index, 1);
        this.setState({ VRMs: VRMs });
    }

    selectVrms() {

        const VRM = [];

        this.state.VRMs.forEach((val) => {
            val.inValid = val.vrm === '' || val.vrm.length > 10 ? true : false;
            return VRM.push(val);
        })

        this.setState({ VRMs: VRM });
        
        const isVRMValid = VRM.filter(val => val.inValid === true).length > 0;

        //If no errors submit to next step
        if(!isVRMValid) {
            this.props.selectVrms(this.state.VRMs);
        }

    }



    render() {
        const { purchase } = this.props;
        const max: number = purchase.maxVRMs * purchase.spaces;
        const active: number = purchase.activeVRMs * purchase.spaces;
        const { VRMs } = this.state;
        return (
            <div>
                <div className="vrm-sub-title">
                    <div>You're entitled to {max} vehicle registration{max !== 1 ? "s" : ""}{purchase.maxVRMs !== purchase.activeVRMs ? `, ${active} of which can be active` : ''}.</div>
                    {purchase.maxVRMs !== purchase.activeVRMs && <div>You can switch, at any point, which of the registrations are active.</div>}
                </div>
                <div>
                    <TransitionGroup key={1} unmountOnExit in={this.state.VRMs.length > 0 ? true : false} classNames="vrm" timeout={300} appear={true} exit={true}>
                        {VRMs.map((item, index, array) =>
                            <CSSTransition key={index} in={this.state.VRMs.length > 0} classNames="vrm" mountOnEnter timeout={300} appear={true} exit={true} unmountOnExit>
                                <div className="vrm-item-wrapper" key={index}>
                                    {/* <Flipper flipKey={array.length === 1 || array.length === 2}> */}
                                    <CssTextField
                                        // min={1}
                                        style={{ 'width': max !== 1 ? 'auto' : '100%' }}
                                        // className={}
                                        label="VRM"
                                        variant="outlined"
                                        error= {item.inValid}
                                        id="custom-css-outlined-input"
                                        value={item.vrm}
                                        onChange={e => this.onChangeText(e.currentTarget.value, index)}
                                        name="spaces"
                                        type="text"
                                        autoFocus={array.length - 1 === index}
                                        autoCapitalize='on' autoCorrect='off' spellCheck={false}
                                    />

                                    {/* <input onChange={e => this.onChangeText(e.currentTarget.value, index)} maxLength={10} autoFocus={array.length - 1 === index} value={item.vrm}
                                        autoCapitalize='on' autoCorrect='off' spellCheck={false} /> */}
                                    {array.length !== 1 ?
                                        // <Flipped flipId='switchButtons'>
                                        <span onClick={() => this.deleteRow(index)}>
                                            <FontAwesomeIcon style={{ color: "#712177", cursor: 'pointer', marginTop: '5px' }} size="2x" icon={faTrashAlt} />
                                        </span>
                                        /* </Flipped>  */
                                        : ''}
                                    {array.length - 1 === index && (index + 1 < max) ?
                                        // <Flipped flipId='switchButtons'>
                                        <span onClick={() => this.addRow()}>
                                            <FontAwesomeIcon style={{ color: "#712177", cursor: 'pointer', marginTop: '5px' }} size="2x" icon={faArrowAltCircleRight} />
                                        </span>
                                        // </Flipped>
                                        : ''}
                                    {item.inValid && <span className="error-text error">Please put a valid vechicle registration Mark</span>}
                                    {/* </Flipper> */}
                                </div>
                            </CSSTransition>
                        )}
                    </TransitionGroup>
                </div>
                {/* <VerticalSpacer5/> */}

                <span className="vrm-btn-wrapper" onClick={() => this.selectVrms()}>
                    <FontAwesomeIcon style={{ color: "#712177", cursor: 'pointer' }} size="4x" icon={faArrowAltCircleRight} />
                </span>

                {/* <button onClick={() => this.props.selectVrms(VRMs)}>Select Vrms</button> */}
            </div>
        )
    }
}


