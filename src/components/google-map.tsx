import * as React from 'react';
//import { Marker } from "react-google-maps";
//import { googleApiKey} from '../app-config/general-config'
import { withHandlers } from 'recompose';

const { compose, withProps, withStateHandlers } = require("recompose");
const { //withScriptjs, 
  withGoogleMap, GoogleMap, } = require("react-google-maps");

export const StyledGoogleMap = compose(
  // withState('center', 'setCenter', ({ center }) => ({ center:center, zoom: 12 })),
  withProps(props => ({
    //googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`,
    loadingElement: <div style={{ height: `500px`, width: `100%` }} />,
    containerElement: <div style={{ height: `500px`, width: `100%` }} />,
    mapElement: <div style={{ height: `500px`, width: `100%` }} />,
    center: props.center,
    ref: React.createRef()
  })),

  withStateHandlers(() => ({ isOpen: false, }), {
    onToggleOpen: ({ isOpen }) => () => ({ isOpen: !isOpen, })
  }),
  withHandlers({}),
  // lifecycle({
  //   componentDidMount(){
  //   {const mapHeight = window.innerHeight;
  //   }
  // componentWillUpdate(nextProps) {
  //   if (this.props.center !== nextProps.center)
  //     this.setState({center: { center: nextProps.center, zoom: 12 }})
  // }
  // }),
  //withScriptjs,
  withGoogleMap
)(props =>

  <GoogleMap defaultCenter={props.center} defaultZoom={props.zoom}
    defaultOptions={{ streetViewControl: false, mapTypeControl: false, fullscreenControl: false }}
    options={{ streetViewControl: false, mapTypeControl: false, fullscreenControl: false }} >
    {props.children}
  </GoogleMap>
);
<StyledGoogleMap />