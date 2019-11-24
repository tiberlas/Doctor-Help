import React, { Component } from 'react';
import RoomItem from './RoomItem';
import {ClinicAdminContext} from '../../context/ClinicAdminContextProvider';

class HandlingRooms extends Component {
    
    state = {
        rooms: []
    }

    static contextType = ClinicAdminContext

    componentDidMount() {
        fetch('http://localhost:8080/api/rooms/clinic='+this.context.admin.clinicId+'/all', { method: "GET" })
        .then(response => response.json())
        .then(json => {
            this.setState({
                rooms: json
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