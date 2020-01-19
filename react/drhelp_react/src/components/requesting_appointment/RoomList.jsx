import React, { Component } from 'react';
import {ClinicAdminContext} from '../../context/ClinicAdminContextProvider';
import RoomReservingItem from './RoomReservingItem.jsx';
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
    number_up: {
        fn: (a, b) => a.number - b.number
    },
    number_down: {
        fn: (a, b) => b.number - a.number
    },
    date_up: {
        fn: (a, b) => b.firstFreeSchedule.localeCompare(a.firstFreeSchedule)
    },
    date_down: {
        fn: (a, b) => a.firstFreeSchedule.localeCompare(b.firstFreeSchedule)
    },
    default: {
        fn: (a, b) => a
    }
}

class RoomList extends Component {
    state = {
        type: this.props.type,
        rooms: [],
        currentSort: 'default',
        modalShow: false,
        name: ''
    }

    static contextType = ClinicAdminContext;

    componentDidMount() {
        this.handleGetAllRooms();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.type !== this.props.type) {
            this.setState({type: this.props.type}, () => {
                this.handleGetAllRooms();
            })
        }
    }

    handleGetAllRooms = () => {
        axios.get('http://localhost:8080/api/rooms/all/type='+this.state.type)
            .then(response => {
                this.setState({rooms: response.data, currentSort: 'default'});
            })
    }

    onSortChange = (name) => {
		const { currentSort } = this.state;
        let nextSort;

        if(name === 'name') {
            if (currentSort === 'name_down') nextSort = 'name_up';
            else if (currentSort === 'name_up') nextSort = 'default';
            else nextSort = 'name_down';
        } else if(name === 'date') {
            if (currentSort === 'date_down') nextSort = 'date_up';
            else if (currentSort === 'date_up') nextSort = 'default';
            else nextSort = 'date_down';
        } else {
            if (currentSort === 'number_down') nextSort = 'number_up';
            else if (currentSort === 'number_up') nextSort = 'default';
            else nextSort = 'number_down';
        }

		this.setState({
			currentSort: nextSort
		}, () => {
            this.renderArrowName();
            this.renderArrowNumber();
            this.renderArrowDate();
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

    renderArrowNumber = () => {
        if(this.state.currentSort === 'number_up') {
            return '\u2191'
        } else if(this.state.currentSort === 'number_down') {
            return '\u2193'
        } else {
            return ''
        }
    }

    renderArrowDate = () => {
        if(this.state.currentSort === 'date_up') {
            return '\u2191'
        } else if(this.state.currentSort === 'date_down') {
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

    handleShowAll = () => {
        this.handleGetAllRooms();
    }

    handleRoomSearch = (name, number, date, time) => {
        this.setState({modalShow: false})
        let rname = null
        let rnumber = null
        let rdate = null 
        
        if(name !== "" && name !== null) {
            rname = name
        }
        if(number !== "" && number !== null) {
            rnumber = number
        }
        if(date !== "" && date !== null && time !== "" && time !== null) {
            rdate = date + " " + time;
        }

        console.log(rname, rnumber, rdate)

        axios.post('http://localhost:8080/api/rooms/search', {
            name: rname,
            number: rnumber,
            typeId: this.state.type,
            date: rdate
        }).then((response) => {
            this.setState({rooms: response.data})//daje sa drugin nazivima treba premapirati
        })

    }

    render() {
        let i = 0;
        return (
            <div class='row d-flex justify-content-center'>
            <div class='col-md-7'> 
                <h4>List of rooms</h4>
                <br/>
                <Table class="table table-hover ">
                    <TableHead class="table-active">
                        <TableRow class="table-active">
                            <TableCell class="text-success cursor-pointer" onClick={() => this.onSortChange('name')}>room name{this.renderArrowName()}</TableCell>
                            <TableCell class="text-success cursor-pointer" onClick={() => this.onSortChange('number')}>number{this.renderArrowNumber()}</TableCell>
                            <TableCell class="text-success cursor-pointer" onClick={() => this.onSortChange('date')}>first free date{this.renderArrowDate()}</TableCell>
                            <TableCell class="text-success"><Button class="btn btn-success" onClick={this.handleShowAll} >show all</Button></TableCell>
                            <TableCell class="text-success"><Button class='btn btn-success' onClick={this.handleSearchClick}>search</Button></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.rooms.sort(sortTypes[this.state.currentSort].fn).map (c => (
                            <TableRow className={(++i)%2? `table-dark` : ``} >
                                <RoomReservingItem key={c.id} id={c.id} value={c} />
                            </TableRow>
                        ))  }

                    </TableBody>
                </Table>

                <RoomModalSearch
                    hasType={true}
                    show={this.state.modalShow}
                    onHide={this.handleHideModal}
                    handleSearch={(name, number, date, time) => this.handleRoomSearch(name, number, date, time)}
                />

            </div>
            </div>
        );
    }
}
 
export default RoomList;