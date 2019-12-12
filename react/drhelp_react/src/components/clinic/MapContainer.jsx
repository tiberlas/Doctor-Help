import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'; 


/*
THIS COMPONENT SHOWS ADDRESS OF CLINIC IN GOOGLE MAPS,
IT USES 2 API-ES
OpenCage Gecode API (https://opencagedata.com/) for getting the longitude and latitude of the address, city and state
Google maps API (https://www.npmjs.com/package/google-maps-react) to drow a map and pinpoint the location; it uses longitude and latitude
*/
export class MapContainer extends Component {
  state = {
    name: this.props.name,
    address: this.props.address,
    city: this.props.city,
    state: this.props.state,
    lat: 0, //45.236476
    lng: 0, //19.839958
    showingInfoWindow: false,
    activeMarker: {},
  };

  //stavlja + umesto space; bitno je da adresa nema space u sebi
  stringParser = (path) => {
    var words = path.split(' ')
    var ret = words[0]
    var i
    for(i=1; i<words.length; i++) {
        ret += '+'+words[i]
    }

    return ret
  }

  componentDidMount() {
    //url example: number address, city, state
    fetch('https://api.opencagedata.com/geocode/v1/json?q='+this.stringParser(this.state.address)+'%2c+'+this.stringParser(this.state.city)+'%2c+'+this.stringParser(this.state.state)+'&key=c94e6fbd30c540dba84374d9fc772e18&pretty=1')
      .then(response => response.json())
      .then(data => {
        console.log(data)
          if(data.status !== 200 && data.status.code == undefined) {
            this.setState({
              address: 'not available',
              state: 'not available',
              city: 'not available',
            })
          } else {
            this.setState({
              lat: data.results[0].geometry.lat,
              lng: data.results[0].geometry.lng			
              })
          }
      })
  }

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

    if(this.state.lat === 0 && this.state.lng === 0) {
      return(
        <div>
          <h2>NOT AVAILABLE</h2>
        </div>
      );
    } else {
      return (
            <Map google={this.props.google} zoom={12} style={mapStyles} initialCenter={{ lat: this.state.lat, lng: this.state.lng}}>

            <Marker position={{ lat: this.state.lat, lng: this.state.lng}} onClick={this.onMarkerClick} name={'Current location'} />

                <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}>
                    <div class="card border-secondary mb-3">
                    <div class="card-header">{this.state.name}</div>
                    <div class="card-body">
                        <p class="card-text">address: {this.state.address}</p>
                        <p class="card-text">city: {this.state.city}</p>
                        <p class="card-text">state: {this.state.state}</p>
                    </div>
                    </div>
                </InfoWindow>
              
          </Map>
          
        );
    }
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBY3X6VX-26IaWT_XqgGhKQjiInpN-aKFI'
})(MapContainer)