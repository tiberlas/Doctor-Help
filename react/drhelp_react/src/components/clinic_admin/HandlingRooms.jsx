import React, { Component } from 'react';
import RoomItem from '../rooms/RoomItem';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from 'react-bootstrap/Button';
import RoomModalSearch from '../rooms/RoomModalSearch';

const sortTypes = {
    name_up: {
        fn: (a, b) => b.name.localeCompare(a.name)
    },
    name_down: {
        fn: (a, b) => a.name.localeCompare(b.name)
    },
    type_up: {
        fn: (a, b) => b.procedureTypeName.localeCompare(a.procedureTypeName)
    },
    type_down: {
        fn: (a, b) => a.procedureTypeName.localeCompare(b.procedureTypeName)
    },
    number_up: {
        fn: (a, b) => a.number - b.number
    },
    number_down: {
        fn: (a, b) => b.number - a.number
    },
    default: {
        fn: (a, b) => a
    }
}

class HandlingRooms extends Component {
    state = {
        rooms: [],
        refresh: false,
        currentSort: 'default',
        modalShow: false
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

    onSortChange = (name) => {
		const { currentSort } = this.state;
        let nextSort;

        if(name === 'name') {
            if (currentSort === 'name_down') nextSort = 'name_up';
            else if (currentSort === 'name_up') nextSort = 'default';
            else nextSort = 'name_down';
        } else if(name === 'type') {
            if (currentSort === 'type_down') nextSort = 'type_up';
            else if (currentSort === 'type_up') nextSort = 'default';
            else nextSort = 'type_down';
        } else {
            if (currentSort === 'number_down') nextSort = 'number_up';
            else if (currentSort === 'number_up') nextSort = 'default';
            else nextSort = 'number_down';
        }

		this.setState({
			currentSort: nextSort
		}, () => {
            this.renderArrowName()
            this.renderArrowNumber()
            this.renderArrowType()
        });
    };

    renderArrowName = () => {
        if(this.state.currentSort === 'name_up') {
            return '\u2191'
        } else if(this.state.currentSort === 'name_down') {
            return '\u2193'
        } else {
            return ''
        }
    }

    renderArrowType = () => {
        if(this.state.currentSort === 'type_up') {
            return '\u2191'
        } else if(this.state.currentSort === 'type_down') {
            return '\u2193'
        } else {
            return ''
        }
    }

    renderArrowNumber = () => {
        if(this.state.currentSort === 'number_up') {
            return '\u2191'
        } else if(this.state.currentSort === 'number_down') {
            return '\u2193'
        } else {
            return ''
        }
    }

    handleSearchClick = () => {
        this.setState({modalShow: !this.state.modalShow})
    }

    handleHideModal = () => {
        this.setState({modalShow: false})
    }

    handleRoomSearch = (name, number, typeId, date, time) => {
        this.setState({modalShow: false})
        let rname = null
        let rnumber = null
        let rtype = null
        let rdate = null 
        
        if(name !== "" && name !== null) {
            rname = name
        }
        if(number !== "" && number !== null) {
            rnumber = number
        }
        if(typeId !== "" && typeId !== null) {
            rtype = typeId
        }
        if(date !== "" && date !== null && time !== "" && time !== null) {
            rdate = date + " " + time;
        }

        console.log(rname, rnumber, rtype, rdate)

        axios.post('http://localhost:8080/api/rooms/search', {
            name: rname,
            number: rnumber,
            typeId: rtype,
            date: rdate
        }).then((response) => {
            this.setState({rooms: response.data})
        })

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
                            <TableCell class="text-success cursor-pointer" onClick={() => this.onSortChange('name')}>room name{this.renderArrowName()}</TableCell>
                            <TableCell class="text-success cursor-pointer" onClick={() => this.onSortChange('number')}>number{this.renderArrowNumber()}</TableCell>
                            <TableCell class="text-success cursor-pointer" onClick={() => this.onSortChange('type')}>procedure name{this.renderArrowType()}</TableCell>
                            <TableCell class="text-success">first free date</TableCell>
                            <TableCell class="text-success"></TableCell>
                            <TableCell class="text-success"><Button class='btn btn-success' onClick={this.handleSearchClick}>search</Button></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.rooms.sort(sortTypes[this.state.currentSort].fn).map (c => (
                            <TableRow className={(++i)%2? `table-dark` : ``} >
                                <RoomItem key={c.id} id={c.id} value={c} handleUpdate={this.handleUpdate} />
                            </TableRow>
                        ))  }

                    </TableBody>
                </Table>

                <RoomModalSearch 
                    show={this.state.modalShow}
                    onHide={this.handleHideModal}
                    handleSearch={(name, number, typeId, date, time) => this.handleRoomSearch(name, number, typeId, date, time)}
                />

            </div>
            </div>
         );
    }
}
 
export default HandlingRooms;