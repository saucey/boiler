import * as React from 'react'
import { IPurchase } from '../../models/purchase';
// import { NextButton } from '../../styles/style';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // Make sure to import the default stylesheet
import { getClient } from '../../helpers';
//import { Moment } from 'moment';
//import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import Moment from 'moment';

const theme = {
    accentColor: '#712177',
    floatingNav: { background: 'rgba(113, 33, 119, .5)', chevron: '#ff7914', color: '#FFF' },
    headerColor: '#712177',
    selectionColor: '#ff5720',
    textColor: { active: '#712177', default: '#333' },
    todayColor: '#ff7914',
    weekdayColor: '#f7f2f7'
};


export interface IPurchaseStartDateProps {
    purchase: IPurchase;
    productEndDate: Date | null;
    selectStartDate(startDate: Moment.Moment): void;
    footerHeight: number
}

export interface IPurchaseStartDateState {
    startDate: Date | null;
};

export class PurchaseStartDate extends React.Component<IPurchaseStartDateProps, IPurchaseStartDateState> {
    constructor(props: IPurchaseStartDateProps) {
        super(props);
        this.state = { startDate: new Date() };
    }

    selectDate(startDate: Date) {
        this.setState({ startDate: startDate });
    }

    render() {
        var today = new Date();
        const { productEndDate } = this.props;
        return (
            <React.Fragment>
                <div style={{ margin: '0 auto', paddingBottom: this.props.footerHeight + 100 }}>
                    <span className="calendar-btn-wrapper" onClick={() => this.props.selectStartDate(Moment(this.state.startDate))}>
                        <FontAwesomeIcon style={{ color: "#712177", cursor: 'pointer', marginBottom: '25px' }} size="4x" icon={faArrowAltCircleRight} />
                    </span>
                    <InfiniteCalendar height={500} width={window.innerWidth > 1200 ? 1200 : window.innerWidth - 60} selected={this.state.startDate} disabledDays={[]} theme={theme}
                        min={new Date(new Date().setFullYear(new Date().getFullYear() - 1))} max={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                        minDate={today} maxDate={getClient().clientId === 447 && productEndDate ? productEndDate : new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                        onSelect={(e) => this.selectDate(e)} />
                    <span className="calendar-btn-wrapper" onClick={() => this.props.selectStartDate(Moment(this.state.startDate))}>
                        <FontAwesomeIcon style={{ color: "#712177", cursor: 'pointer', marginTop: '5px' }} size="4x" icon={faArrowAltCircleRight} />
                    </span>
                </div>
            </React.Fragment>
        )
    }
}








