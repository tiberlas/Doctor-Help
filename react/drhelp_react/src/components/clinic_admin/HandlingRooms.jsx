import React, { Component } from 'react';
import RoomItem from '../rooms/RoomItem';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class HandlingRooms extends Component {
    state = {
        rooms: [],
        refresh: false
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/rooms/all')
        .then(response => {
            this.setState({
                rooms: response.data,
                refresh: false
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
        let i = 0;
        return (
            <div class='row d-flex justify-content-center'>
            <div class='col-md-7'> 
                <br/>
                <h2>List of rooms</h2>
                <br/>
                <Table class="table table-hover ">
                    <TableHead class="table-active">
                        <TableRow class="table-active">
                            <TableCell class="text-success">room name</TableCell>
                            <TableCell class="text-success">number</TableCell>
                            <TableCell class="text-success">procedure name</TableCell>
                            <TableCell class="text-success"></TableCell>
                            <TableCell class="text-success"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.rooms.map (c => (
                            <TableRow className={(++i)%2? `table-dark` : ``} >
                                <RoomItem key={c.id} id={c.id} value={c} handleUpdate={this.handleUpdate} />
                            </TableRow>
                        ))  }

                    </TableBody>
                </Table>
            </div>
            </div>
         );
    }
}
 
export default HandlingRooms;