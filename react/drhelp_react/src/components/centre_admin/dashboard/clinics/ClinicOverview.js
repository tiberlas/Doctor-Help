import React, { Fragment } from 'react'
import axios from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from 'react-bootstrap/Button'
import AddClinicModal from './AddClinicModal';



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


export class ClinicOverview extends React.Component {


    state = {
        clinics: [],
        currentSort: 'default',
        showAddModal: false
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/clinics/admin-all').then( response => {
            this.setState({clinics: response.data})
        })
    }


    
    onSortChange = (name) => {
		const { currentSort } = this.state;
        let nextSort;

        if(name === 'name') {
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

    update = () => {
        axios.get('http://localhost:8080/api/clinics/admin-all').then( response => {
            this.setState({clinics: response.data, showAddModal: false})
        })
    }

    handleDelete = (clinic) => {
        if(clinic.hasAdmin)
            return

         axios.delete('http://localhost:8080/api/clinics/delete='+clinic.id).then(this.update)
    }



    render() {
        let i = 0
        return (
         
            <Fragment> 
            <div class="row d-flex justify-content-center">
                <div class='col-md-9'>
               <div style={{ overflow: "auto" }} >
                <Table class="table table-hover">
                    <TableHead class="table-active">
                        <TableRow class="table-active" style={{height: "35px"}}>
                            <TableCell class="text-success cursor-pointer" onClick={() => this.onSortChange('name')}>Name{this.renderArrowName()}</TableCell>
                            <TableCell class="text-success">Address</TableCell>
                            <TableCell class="text-success">City</TableCell>
                            <TableCell class="text-success">State</TableCell>
                            <TableCell class="text-success">Description</TableCell>
                            <TableCell class="text-success"><Button class="btn btn-success" onClick={this.toggle}>Add</Button></TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
                <div style={{ overflow: 'auto', height: '350px' }}>
                <Table style={{tableLayout: 'fixed'}}>
                    <TableBody >
                        {this.state.clinics.sort(sortTypes[this.state.currentSort].fn).map (c => (
                            <TableRow className={(++i)%2? `table-dark` : ``} >
                                <TableCell class='text text-white'>&nbsp;{c.name}</TableCell>
                                <TableCell class='text text-white'>&nbsp;{c.address}</TableCell>
                                <TableCell class='text text-white'>&nbsp;{c.city}</TableCell>
                                <TableCell class='text text-white'>&nbsp;{c.state}</TableCell>
                                <TableCell class='text text-white'>&nbsp;{c.description}</TableCell>
                                <TableCell><button class='btn btn-danger' onClick={() => this.handleDelete(c)} disabled={c.hasAdmin}>Delete</button></TableCell>
                            </TableRow>
                        ))  }

                    </TableBody>
                    
                </Table>
                </div>
                </div>

                {this.state.showAddModal && <AddClinicModal modal={this.state.showAddModal}
                                    toggle={this.toggle}
                                    update={this.update}/>}
                
               </div>
               </div>
            </Fragment>)
    }
}