import React, { Component } from 'react';
import RoomItem from './RoomItem';
import {ClinicAdminContext} from '../../context/ClinicAdminContextProvider';
import axios from 'axios';

class HandlingRooms extends Component {
    
    state = {
        rooms: []
    }

    static contextType = ClinicAdminContext

    componentDidMount() {
        axios.get('http://localhost:8080/api/rooms/clinic='+this.context.admin.clinicId+'/all')
        .then(response => {
            this.setState({
                rooms: response.data
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