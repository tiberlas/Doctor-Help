import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'; 
 
export class MapContainer extends Component {
  state = {
    name: this.props.name,
    address: this.props.address,
    lat: this.props.lat,
    lng: this.props.lng,
    showingInfoWindow: false,
    activeMarker: {},
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      activeMarker: marker,
      showingInfoWindow: true
    }); 
   }
  
  render() {
  
	const mapStyles = {
        position: 'static',
        margin: 'auto',
        width: '80%',
        height: '400px',
    };
    //neradi
    const infoStyle = {
        'background-color': 'black'
    };
	return (
        <Map google={this.props.google} zoom={12} style={mapStyles} initialCenter={{ lat: this.state.lat, lng: this.state.lng}}>

		    <Marker position={{ lat: this.state.lat, lng: this.state.lng}} onClick={this.onMarkerClick} name={'Current location'} />

            <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            style={infoStyle}>
                <div class="card border-secondary mb-3">
                <div class="card-header">{this.state.name}</div>
                <div class="card-body">
                    <p class="card-text">address: {this.state.address}</p>
                </div>
                </div>
            </InfoWindow>
           
	    </Map>
			
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBY3X6VX-26IaWT_XqgGhKQjiInpN-aKFI'
})(MapContainer)