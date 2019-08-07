import * as React from 'react'
import { ISiteLookup, IGeoLocation, ITown } from '../../models';
import { StyledGoogleMap } from '../google-map';
import { Marker, withGoogleMap } from 'react-google-maps';
import { SelectedSite } from '../selected-site';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
// import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
// import { Redirect } from 'react-router';
// import { Redirect } from 'react-router-dom';

const DrawerCustom = withStyles({
    root: {
        '& .MuiDrawer-paperAnchorRight': {
            width: '500px',
            height: '500px'
        },
        '& .MuiPaper-elevation16': {
            boxShadow: 'none'
        }
    },
})(Drawer);

export interface IPurchaseSiteProps {
    sites: Array<ISiteLookup>;
    town: ITown;
    selectSite(site: ISiteLookup): void;
    footerHeight: number;
};

export interface IPurchaseSiteState {
    isOpenId: number;
    mapCentre: IGeoLocation | null;
    zoomLevel: number;
};

export class PurchaseSite extends React.Component<IPurchaseSiteProps> {
    constructor(props: IPurchaseSiteProps) {
        super(props);
        this.state = {
            isOpenId: 0, zoomLevel: this.props.town.zoomLevel ? this.props.town.zoomLevel : 12,
            mapCentre: {
                latitude: this.props.town.latitude ? this.props.town.latitude : 51.33,
                longitude: this.props.town.longitude ? this.props.town.longitude + 0.01 : -0.15564799999999998
            },
            top: false,
            left: false,
            bottom: false,
            right: false,
            drawerWidth: '640px',
        };

    }

    // this.toggleDrawer = (side, open) => event => {
    //     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    //         return;
    //     }
    //     this.setState({ ...state, [side]: open });
    // };

    sideList = (side) => {
        return (
            <div
                // className={classes.root}
                role="presentation"
            // onClick={this.toggleDrawer(side, false)}
            // onKeyDown={this.toggleDrawer(side, false)}>
            >
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            {/* <ListItemIcon>{index % 2 === 0 ? '<InboxIcon />' : '<MailIcon />'}</ListItemIcon> */}
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </div>
        )
    };


    toggleDrawer = (side, open, siteId) => event => {

        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        this.setState({ [side]: open });

        if (siteId !== null) {
            let newSiteId: number = siteId;
            if (this.state['isOpenId'] === newSiteId) { newSiteId = 0; }
            this.setState({ isOpenId: newSiteId });
        }
    }

    // componentWillMount() {
    //     this.getGeoLocationForTown(this.props.town.town);
    // };

    onGoogleApiLoaded = (map, maps) => {
        if (map) {
            const bounds = new maps.LatLngBounds();
            map.fitBounds(bounds);
            this.bindResizeListener(map, maps, bounds);
        }
    };

    bindResizeListener = (map, maps, bounds) => {
        maps.event.addDomListenerOnce(map, 'idle', () => {
            maps.event.addDomListener(window, 'resize', () => {
                map.fitBounds(bounds);
            });
        });
    };

    getGeoLocationForTown(town: string) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': `${town}, uk` }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
                //let lat = results[0].geometry.location.lat();
                //let lng = results[0].geometry.location.lng()+0.01;
                //this.setState({mapCentre: {latitude:lat, longitude:lng}});
            } else {
                alert("Something went wrong " + status);
            }
        });
    }

    onToggleOpen(siteId: number) {
        let newSiteId: number = siteId;
        if (this.state['isOpenId'] === newSiteId) { newSiteId = 0; }
        this.setState({ isOpenId: newSiteId });
    }

    selectSite(site: ISiteLookup) {
        this.props.selectSite(site);
    }

    close() {
        this.toggleDrawer('right', false, null)
        // this.setState({ isOpenId: 0 });
    }

    useStyle() {
        return makeStyles(theme => ({
            root: {
                display: 'flex',
                width: this.state['drawerWidth'],
            },
        }));
    }

    render() {
        const { sites } = this.props;
        return (
            <div id="drawer-container" style={{ position: 'relative', paddingBottom: this.props.footerHeight }}>
                <div>
                    <StyledGoogleMap key="oneMap" zoom={this.state['zoomLevel']} onGoogleApiLoaded={this.onGoogleApiLoaded} yesIWantToUseGoogleMapApiInternals
                        center={{ lat: this.state['mapCentre'] && this.state['mapCentre'].latitude ? this.state['mapCentre'].latitude : 0, lng: this.state['mapCentre'] && this.state['mapCentre'].longitude ? this.state['mapCentre'].longitude : 0 }}  >

                        {sites && sites.map(item => (
                            // <Marker key={item.siteId} position={{ lat: item.latitude, lng: item.longitude }} onClick={this.toggleDrawer('right', true)}
                            <Marker key={item.siteId} position={{ lat: item.latitude, lng: item.longitude }} onClick={this.toggleDrawer('right', true, item.siteId)}
                                icon={{ url: this.state['isOpenId'] === item.siteId ? '/icons/parkingMarkerOrange.png' : '/icons/parkingMarker.png', size: new google.maps.Size(30, 30) }}></Marker>
                        ))}
                    </StyledGoogleMap>
                </div>
                {/* <SelectedSite isOpenId={this.state['isOpenId']} site={this.state['isOpenId'] !== 0 ? sites.find(x => x.siteId === this.state['isOpenId']) : null} selectSite={(e) => this.selectSite(e)} close={() => this.close()} /> */}
                <div>
                    {/* <Button onClick={this.toggleDrawer('left', true)}>Open Left</Button>
                    <Button onClick={this.toggleDrawer('right', true)}>Open Right</Button>
                    <Button onClick={this.toggleDrawer('top', true)}>Open Top</Button>
                    <Button onClick={this.toggleDrawer('bottom', true)}>Open Bottom</Button> */}
                    {/* <Drawer open={this.state['left']} onClose={this.toggleDrawer('left', false)}>
                        {this.sideList('left')}
                    </Drawer>
                    <Drawer anchor="top" open={this.state['top']} onClose={this.toggleDrawer('top', false)}>
                        {this.fullList('top')}
                    </Drawer>
                    <Drawer anchor="bottom" open={this.state['bottom']} onClose={this.toggleDrawer('bottom', false)}>
                        {this.fullList('bottom')}
                    </Drawer> */}

                    <DrawerCustom PaperProps={{ style: { position: 'absolute' } }} ModalProps={{ container: document.getElementById('drawer-container'), style: { position: 'absolute', width: '500px', left: 'auto' } }} anchor="right" open={this.state['right']} onClose={this.toggleDrawer('right', false, null)}>
                        <div style={{ height: '100%' }}>
                            <span className='close-wrapper' onClick={this.toggleDrawer('right', false, this.state['isOpenId'])} style={{ display: 'inline-block', cursor: 'pointer', textAlign: "right", margin: '5px' }}>
                                <FontAwesomeIcon style={{ color: "#712177" }} size="1x" icon={faTimesCircle} />
                            </span>\
                            <SelectedSite isOpenId={this.state['isOpenId']} site={this.state['isOpenId'] !== 0 ? sites.find(x => x.siteId === this.state['isOpenId']) : null} selectSite={(e) => this.selectSite(e)} close={() => this.close()} />
                            {/* {this.sideList('right')} */}
                        </div>
                    </DrawerCustom>
                </div>
            </div>
        )
    }
}

export default withGoogleMap(PurchaseSite);


