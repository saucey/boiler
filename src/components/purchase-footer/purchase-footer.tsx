import * as React from 'react'
// import { PurchaseFooterList, PurchaseFooterListItem, PurchaseFooterItemIcon, PurchaseFooterItemLink, 
// PurchaseFooterItemText, PurchaseFooterItemWideIcon, PurchaseFooterHelp, PurchaseFooterBackground } from "../../styles/style";
import { CSSTransition } from 'react-transition-group'
import { IPurchase } from '../../models/purchase';
import { getClient } from '../../helpers';
import { IClient, IPreProduct } from '../../models';
import Measure from 'react-measure';
// import LocationIcon from './location.png';
// import ParkingIcon from './parking.png';
// import TicketIcon from './ticket.png';
// import CarIcon from './car.png';
// import PlateIcon from './plate.png';
// import CalendarIcon from './calendar.png';
import { Link } from 'react-router-dom'
import Moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faParking, faReceipt, faCarAlt, faCalendarCheck } from '@fortawesome/free-solid-svg-icons'

export interface IPurchaseFooterProps {
  step: number;
  purchase: IPurchase;
  innerREf: any;
  preProduct: IPreProduct | null;
}

export interface IPurchaseFooterState {
  dimensions: any;
}

export class PurchaseFooter extends React.Component<IPurchaseFooterProps, IPurchaseFooterState> {

  constructor(props: IPurchaseFooterProps) {
    super(props);
    this.state = { dimensions: null };
  }

  render() {
    const { purchase, step, innerREf, preProduct } = this.props;    

    let client: IClient = getClient();
    return (
      <div ref={innerREf} className="footer" id="footer">
        {((step > 1 && step < 9 && client.clientId !== 447) || (step > 3 && step < 9 && client.clientId === 447))
          && (!this.state.dimensions || (this.state.dimensions && this.state.dimensions.height < 90))
          && <span className="title">Click on any step to reselect your choice:</span>}

        <Measure bounds onResize={contentRect => { this.setState({ dimensions: contentRect.bounds }) }}>
          {({ measureRef }) => (
            <div ref={measureRef}>
              <ul className={preProduct ? "footer-flow pre-product-list" : "footer-flow"}>
                <CSSTransition in={step > 1 && step < 9 && client.clientId !== 447} classNames="footer" appear={true} timeout={300} unmountOnExit>
                  <li style={{pointerEvents: preProduct ? 'none': 'auto' }}>
                    <Link to="/purchase/city" state={purchase}>
                      {/* <img src={LocationIcon} /> */}
                      {/* <h1 className="plates">the number plate</h1> */}
                      <FontAwesomeIcon style={{color:"#fff", margin: "0 10px 0 5px"}} size="2x" icon={faMapMarkerAlt} />
                      <span>{purchase.town ? purchase.town.town : ''}</span>
                    </Link>
                  </li>
                </CSSTransition>
                <CSSTransition in={step > 3 && step < 9} classNames="footer" timeout={300} appear={true} unmountOnExit>
                  <li style={{pointerEvents: preProduct ? 'none': 'auto' }}>
                    <Link to={{ pathname: client.clientId === 447 ? '/purchase/product' : '/purchase/site', state: { purchase: purchase } }}>
                      {/* <img src={ParkingIcon} /> */}
                      <FontAwesomeIcon style={{color:"#fff", margin: "0 10px 0 5px"}} size="2x" icon={faParking} />
                      <span>{purchase.productName}</span>
                    </Link>
                  </li>
                </CSSTransition>
                <CSSTransition in={step > 4 && step < 9 && client.clientId !== 447} classNames="footer" appear={true} timeout={300} unmountOnExit>
                  <li style={{pointerEvents: preProduct ? 'none': 'auto' }}>
                    <Link to={{ pathname: '/purchase/frequency', state: { purchase: purchase } }}>
                      {/* <img src={TicketIcon} /> */}
                      <FontAwesomeIcon style={{color:"#fff", margin: "0 10px 0 5px"}} size="2x" icon={faReceipt} />
                      <span>{purchase.frequency ? purchase.frequency.productFrequencyName + ' £' + purchase.frequency.price : ''}</span>
                    </Link>
                  </li>
                </CSSTransition>
                <CSSTransition in={step > 5 && step < 9 && client.clientId !== 447} classNames="footer" appear={true} timeout={300} unmountOnExit>
                  <li style={{pointerEvents: preProduct ? 'none': 'auto' }}>
                    <Link to={{ pathname: '/purchase/spaces', state: { purchase: purchase } }}>
                      <FontAwesomeIcon style={{color:"#fff", margin: "0 10px 0 5px"}} size="2x" icon={faCarAlt} />
                      <span>{purchase.spaces}</span>
                    </Link>
                  </li>
                </CSSTransition>
                <CSSTransition in={step > 6 && step < 9} classNames="footer" timeout={300} appear={true} unmountOnExit>
                  <li style={{pointerEvents: preProduct ? 'none': 'auto' }}>
                    <Link to={{ pathname: '/purchase/vrms', state: { purchase: purchase } }}>
                      {/* <img src={PlateIcon} /> */}
                      <span className="plates">XYZ 123</span>
                      <span>{'\u2714'}</span>
                    </Link>
                  </li>
                </CSSTransition>
                <CSSTransition in={step > 7 && step < 9} classNames="footer" timeout={300} appear={true} unmountOnExit>
                  <li style={{pointerEvents: preProduct ? 'none': 'auto' }}>
                    <Link to={{ pathname: '/purchase/startDate', state: { purchase: purchase } }}>
                      <FontAwesomeIcon style={{color:"#fff", margin: "0 10px 0 5px"}} size="2x" icon={faCalendarCheck} />
                      <span>{purchase.startDate ? Moment(purchase.startDate).toDate().toLocaleDateString() : ''}</span>
                    </Link>
                  </li>
                </CSSTransition>
              </ul>
            </div>
          )}
        </Measure>

      </div>
    );
  }
}