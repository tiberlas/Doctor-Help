import React, { Component } from 'react';
import RoomItem from '../rooms/RoomItem';
import {ClinicAdminContext} from '../../context/ClinicAdminContextProvider';
import axios from 'axios';
import NewRoomModal from '../rooms/NewRoomModal';

class HandlingRooms extends Component {
    state = {
        rooms: [],
        name: '',
        isOpen: false
    }

    static contextType = ClinicAdminContext

    componentDidMount() {
        this.handleUpdate()
    }

    handleUpdate = () => {
        alert("Update")
        this.setState({isOpen: false})
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

    onAdd = () => {
        this.setState({isOpen: true})
    }

    showModal = () => {
        this.setState({isOpen: false})
    };

    render() {

        return ( 
            <div>
                <h2>{this.state.name}</h2>
                <button onClick={this.onAdd} class='btn btn-success'>add</button>
                <NewRoomModal handleUpdate={this.handleUpdate} show={this.state.isOpen} close={this.showModal}/>
                <div>
                    {this.state.rooms.map(c => (
                        <RoomItem key={c.Id} value={c} handleUpdate={this.handleUpdate} />
                    ))}
                </div>
            </div>
         );
    }
}
 
export default HandlingRooms;