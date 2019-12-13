import React, { Component, Fragment } from 'react';
import RoomItem from '../rooms/RoomItem';
import {ClinicAdminContext} from '../../context/ClinicAdminContextProvider';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class HandlingRooms extends Component {
    state = {
        rooms: [],
        name: '',
        refresh: false
    }

    static contextType = ClinicAdminContext

    componentDidMount() {
        axios.get('http://localhost:8080/api/rooms/clinic='+this.context.admin.clinicId+'/all')
        .then(response => {
            this.setState({
                rooms: response.data,
                refresh: false
            })
        })

        axios.get('http://localhost:8080/api/clinics/id='+this.context.admin.clinicId)
        .then(response => {
            this.setState({
                name: response.data.name
            })
        })
    }

    handleUpdate = (key) => {
        const items = this.state.rooms.filter(item => item.id !== key);
        console.log('items', items)
        this.setState({ rooms: items, refresh: true });
        console.log("state", items)
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
                        {this.state.rooms.map (c => (
                            <Fragment>
                                <RoomItem key={c.id} id={c.id} value={c} handleUpdate={this.handleUpdate} />
                            </Fragment>
                        ))  }

                    </tbody>
                </table>
            </div>
            </div>
         );
    }
}
 
export default HandlingRooms;