import React, { Component } from 'react';
import RoomItem from '../rooms/RoomItem';
import {ClinicAdminContext} from '../../context/ClinicAdminContextProvider';
import axios from 'axios';

class HandlingRooms extends Component {
    state = {
        rooms: [],
        name: ''
    }

    static contextType = ClinicAdminContext

    componentDidMount() {
        this.handleUpdate()
    }

    handleUpdate = () => {
        axios.get('http://localhost:8080/api/rooms/clinic='+this.context.admin.clinicId+'/all')
        .then(response => {
            this.setState({
                rooms: response.data
            })
        })

        axios.get('http://localhost:8080/api/clinics/id='+this.context.admin.clinicId)
        .then(response => {
            this.setState({
                name: response.data.name
            })
        })
    }

    render() {

        return ( 
            <div class='row d-flex justify-content-center'>
            <div class='col-md-7'> 
                <h2>Clinic {this.state.name}</h2>
                <br/>
                <table class="table table-hover ">
                    <thead>
                        <th class="text-success">name</th>
                        <th class="text-success">number</th>
                        <th></th>
                        <th></th>
                    </thead>
                    <tbody>
                        {this.state.rooms.map(c => (
                            <RoomItem key={c.Id} value={c} handleUpdate={this.handleUpdate} />
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
         );
    }
}
 
export default HandlingRooms;