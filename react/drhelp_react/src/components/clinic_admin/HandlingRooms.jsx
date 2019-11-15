import React, { Component } from 'react';
import RoomItem from './RoomItem';

class HandlingRooms extends Component {
    
    state = {
        rooms: []
    }

    componentDidMount() {
        fetch('http://localhost:8080/api/clinics/1/rooms', { method: "GET" })
        .then(response => response.json())
        .then(json => {
            this.setState({
                rooms: json.rooms
            })
        })


    }

    render() { 
        return ( 
            <div>
                {this.state.rooms.map(c => (
                    <RoomItem key={c.Id} value={c} />
                ))}
            </div>
         );
    }
}
 
export default HandlingRooms;