import React, { Component } from 'react';
import ProcedureTypeItem from '../procedureType/ProcedureTypeItem';
import {ClinicAdminContext} from '../../context/ClinicAdminContextProvider';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from 'react-bootstrap/Button';
import Checkbox from '@material-ui/core/Checkbox';

class HandleingProcedureTypes extends Component {
    state = {
        procedures: [],
        name: '',
        refresh: false,
        filterString: '',
        isFilterOperationActive: false,
        filterOperation: false,
        filterOperationDTO: 'NOT_DEFINED'
    }

    static contextType = ClinicAdminContext

    componentDidMount() {
        axios.get('http://localhost:8080/api/procedure+types/all')
        .then(response => {
            this.setState({
                procedures: response.data,
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
        const items = this.state.procedures.filter(item => item.id !== key);
        this.setState({ procedures: items, refresh: true });
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleActivateFilter = () => {
        this.setState({isFilterOperationActive: !this.state.isFilterOperationActive},
            () => {
                if(this.state.isFilterOperationActive === true) {
                    if(this.state.filterOperation === true) {
                        this.setState({filterOperationDTO: 'OPERATION'})
                    } else {
                        this.setState({filterOperationDTO: 'NOT_OPERATION'})
                    }
                } else {
                    this.setState({filterOperationDTO: 'NOT_DEFINED'})
                }
            })
    }

    handleFilter = () => {
        axios.post('http://localhost:8080/api/procedure+types/filter', 
            {
                string: this.state.filterString,
                operation: this.state.filterOperationDTO
            }).then(response => {
                this.setState({procedures: response.data});
            }).catch(error => {
                console.log('error in filter of procedure types')
            })
        
    }

    handleFilterOperation = () => {
        this.setState({filterOperation: !this.state.filterOperation}, 
            () => {
                if(this.state.isFilterOperationActive === true) {
                    if(this.state.filterOperation === true) {
                        this.setState({filterOperationDTO: 'OPERATION'})
                    } else {
                        this.setState({filterOperationDTO: 'NOT_OPERATION'})
                    }
                }
            })

    }
    
    render() {
        let i = 0;
        return ( 
            <div class='row d-flex justify-content-center'>
            <div class='col-md-7'> 
                <h2>Clinic {this.state.name}</h2>
                <br/>
                <Table class="table table-hover ">
                    <TableHead class="table-active">
                        <TableRow class="table-active">
                            <TableCell class="text-success">name</TableCell>
                            <TableCell class="text-success">duration</TableCell>
                            <TableCell class="text-success">is operation</TableCell>
                            <TableCell class="text-success">price</TableCell>
                            <TableCell class="text-success">
                                    <div>
                                        <input type = "text" placeholder="Filter..." name = "filterString" onChange = {this.handleChange}/> 
                                    </div>
                                    <div>
                                        <Checkbox checked={this.state.isFilterOperationActive} onChange={this.handleActivateFilter}/>
                                        <label className={this.state.isFilterOperationActive? `text-success`:`text-muted` }>filter by operation: </label>
                                    </div> 
                            </TableCell>
                            <TableCell> 
                                <Button class="btn btn-success" onClick = {this.handleFilter}>Search</Button> 
                                <Checkbox checked={this.state.filterOperation} onChange={this.handleFilterOperation} disabled={!this.state.isFilterOperationActive}/>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.procedures.map (c => (
                            <TableRow className={(++i)%2? `table-dark` : ``} >
                                <ProcedureTypeItem key={c.id} id={c.id} value={c} handleUpdate={this.handleUpdate} />
                            </TableRow>
                        )) }    
                    </TableBody>
                </Table>
            </div>
            </div>
         );
    }
}
 
export default HandleingProcedureTypes;