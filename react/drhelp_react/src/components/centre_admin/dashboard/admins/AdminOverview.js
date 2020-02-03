import React, { Fragment, Component } from 'react'
import axios from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from 'react-bootstrap/Button'
import AddAdminModal from './AddAdminModal';

const sortTypes = {
    name_up: {
        fn: (a, b) => b.email.localeCompare(a.email)
    },
    name_down: {
        fn: (a, b) => a.email.localeCompare(b.email)
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


export class AdminOverview extends Component {
    
    state = {
        centreAdmins: [],
        clinicAdmins: [],
        currentSort: 'default',
        showAddModal: false,
        showCentreAdmins: true,
        showClinicAdmins: false,
        adminType: 'CENTRE'
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/centreAdmins/all').then( response => {
            this.setState({centreAdmins: response.data}, () => {
                axios.get('http://localhost:8080/api/clinicAdmins/all').then(response => {
                    this.setState({clinicAdmins: response.data})
                })
            })
        })

    }


    
    onSortChange = (name) => {
		const { currentSort } = this.state;
        let nextSort;

        if(name === 'email') {
            if (currentSort === 'name_down') nextSort = 'name_up';
            else if (currentSort === 'name_up') nextSort = 'default';
            else nextSort = 'name_down';
        }

		this.setState({
			currentSort: nextSort
		}, () => {
            this.renderArrowName()
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

    toggle = () => {
        this.setState({showAddModal: !this.state.showAddModal})
    }

    handleCheck = (event) => {
        this.setState( {
            [event.target.name]: event.target.value
        })
    }


    update = () => {
        if(this.state.adminType === 'CENTRE') {
            axios.get('http://localhost:8080/api/centreAdmins/all').then( response => {
                this.setState({centreAdmins: response.data, admins: response.data, showAddModal: false})
            })
        } else if(this.state.adminType === 'CLINIC') {
            axios.get('http://localhost:8080/api/clinicAdmins/all').then( response => {
                this.setState({clinicAdmins: response.data, admins: response.data, showAddModal: false})
            })
        }
    }

    render() {
        let i = 0
        return (
            <Fragment> 
            <div class="row d-flex justify-content-center">
                <div class='col-md-10'>
               <div >
                <Table class="table table-hover">
                    <TableHead class="table-active">
                        <TableRow class="table-active" style={{height: "35px"}}>
                            <TableCell class="text-success cursor-pointer" onClick={() => this.onSortChange('email')}>Email{this.renderArrowName()}</TableCell>
                            <TableCell class="text-success">First name</TableCell>
                            {this.state.adminType === 'CLINIC' && <TableCell colSpan="6"></TableCell>}
                            <TableCell class="text-success">Last name</TableCell>
                            {this.state.adminType === 'CLINIC' && <TableCell colSpan="6"></TableCell>}
                            {this.state.adminType === 'CLINIC' && <TableCell class="text-success">Clinic</TableCell>}
                            
                            <TableCell> 
                            <label>
                            <input required
                                type="radio" 
                                name="adminType"
                                value="CENTRE"
                                checked={this.state.adminType === "CENTRE"}
                                onChange={this.handleCheck}
                            /> <span class="text text-white"> Centre admins </span>
                        </label> &nbsp;
                        <label>
                            <input required
                                type="radio" 
                                name="adminType"
                                value="CLINIC"
                                checked={this.state.adminType === "CLINIC"}
                                onChange={this.handleCheck}
                            /> 
                        </label> <span class="text text-white"> Clinic admins </span>

                            </TableCell>

                            <TableCell class="text-success"><Button class="btn btn-success" onClick={this.toggle}>Add</Button></TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
                <div style={{ overflow: 'auto', height: '350px' }}>
                <Table style={{tableLayout: 'fixed'}}>
                    <TableBody >
                        {this.state.adminType === 'CENTRE' && this.state.centreAdmins.sort(sortTypes[this.state.currentSort].fn).map (c => (
                            <TableRow className={(++i)%2? `table-dark` : ``} >
                                <TableCell colspan="1" class='text text-white'>&nbsp;{c.email}</TableCell>
                                <TableCell class='text text-white'>&nbsp;{c.firstName}</TableCell>
                                <TableCell class='text text-white'>&nbsp;{c.lastName}</TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                              
                            </TableRow>
                        ))  }

                        {this.state.adminType === 'CLINIC' && this.state.clinicAdmins.sort(sortTypes[this.state.currentSort].fn).map (c => (
                            <TableRow className={(++i)%2? `table-dark` : ``} >
                                <TableCell colspan="1" class='text text-white'>&nbsp;{c.email}</TableCell>
                                <TableCell class='text text-white'>&nbsp;{c.firstName}</TableCell>
                                <TableCell  class='text text-white'>&nbsp;{c.lastName}</TableCell>
                              <TableCell  class='text text-white'>&nbsp;{c.clinicName}</TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                        ))  }

                    </TableBody>
                    
                </Table>
                </div>
                </div>

                {this.state.showAddModal && <AddAdminModal modal={this.state.showAddModal}
                                    toggle={this.toggle}
                                    update={this.update}/>}
                
               </div>
               </div>
            </Fragment>)
    }
}