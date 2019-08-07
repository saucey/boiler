import * as React from 'react'
import { ISiteLookup } from '../models';
// import { SiteInfo, SiteInfoSite, SiteInfoSiteTitle, SiteInfoSiteAddress, SiteInfoSiteSpaces, SiteInfoOpeningHours, SiteInfoOpeningHoursTitle, SiteInfoOpeningHoursRow, SiteInfoOpeningHoursDay, SiteInfoOpeningHoursHours, NextButton, SiteInfoSiteTown, SiteInfoOpeningHoursBox, CloseButton } from '../styles/style';
import { CSSTransition } from 'react-transition-group';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './selected-site.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'

export interface ISelectedSiteProps {
    isOpenId: number;
    site: ISiteLookup | null;
    selectSite(site: ISiteLookup): void;
    close(): void;
}

export interface ISelectedSiteState {
    open: boolean;
    nextButtonShown: boolean;
}

export class SelectedSite extends React.Component<ISelectedSiteProps, ISelectedSiteState>{
    constructor(props: ISelectedSiteProps) {
        super(props);
        this.state = { open: props.isOpenId !== 0, nextButtonShown: false };
    }

    // static getDerivedStateFromProps(props:ISelectedSiteProps, state:ISelectedSiteState){
    //   return {
    //       open: props.isOpenId !== 0
    //   }
    // }

    // componentDidUpdate(){
    //     setTimeout(x => this.setState({nextButtonShown:this.props.isOpenId !== 0}) ,50);
    // }

    componentWillReceiveProps(nextProps: ISelectedSiteProps) {
        this.setState({ open: nextProps.isOpenId !== 0 });
        setTimeout(x => this.setState({ nextButtonShown: nextProps.isOpenId !== 0 }), 50);
    }

    render() {
        const { site } = this.props;
        const openingHours = [{ day: 'Monday', times: '6:30 am - 20:00 pm' }, { day: 'Tuesday', times: '6:30 am - 20:00 pm' }, { day: 'Wednesday', times: '6:30 am - 20:00 pm' },
        { day: 'Thursday', times: '6:30 am - 20:00 pm' }, { day: 'Friday', times: '6:30 am - 20:00 pm' }, { day: 'Saturday', times: '6:30 am - 20:00 pm' }, { day: 'Sunday', times: 'closed' }];
        return (
            <CSSTransition in={this.state.open} classNames="selectedsite" mountOnEnter timeout={300} appear={true} unmountOnExit>
                <div>
                    <div className="site-info">
                        {/* <button onClick={() => this.props.close()}>Close</button> */}
                        {/* <span style={{ cursor: 'pointer' }} onClick={() => this.props.close()}>
                            <FontAwesomeIcon style={{ color: "#712177", float: "right" }} size="1x" icon={faTimesCircle} />
                        </span> */}
                        <span className="general sitename">{site ? site.siteName : ''}</span>
                        <span className="general address">{site ? site.addressLine1 : ''}</span>
                        <span className="general town">{site ? site.town : ''}</span>
                        <span className="general spaces">{4} spaces available</span>
                        <CSSTransition in={this.state.nextButtonShown} classNames="nextbutton" timeout={11600} unmountOnExit>
                            <span onClick={() => this.props.selectSite(site)}>
                                <FontAwesomeIcon style={{ color: "#712177", cursor: 'pointer' }} size="4x" icon={faArrowAltCircleRight} />
                            </span>
                            {/* <button onClick={() => this.props.selectSite(site)}>Select Site</button> */}
                        </CSSTransition>
                    </div>
                    <div className="site-time">
                        <span className="sitehours-title">Opening Hours</span>
                        <div className="site-time-day-wrapper">
                            <div className="general site-day-wrapper">
                                <span className="text-wrapper">
                                    {openingHours.map((item, index) =>
                                        <div key={index}>
                                            <span>{item.day}</span>
                                        </div>
                                    )}
                                </span>
                            </div>
                            <div className="general site-time-wrapper">
                                {/* <span className="text-wrapper"> */}
                                {openingHours.map((item, index) =>
                                    <div key={index}>
                                        <span>{item.times}</span>
                                    </div>
                                )}
                                {/* </span> */}
                            </div>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        );
    }
}