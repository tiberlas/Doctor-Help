import React, { Component, Fragment } from 'react';
import ProcedureTypeItem from '../procedureType/ProcedureTypeItem';
import {ClinicAdminContext} from '../../context/ClinicAdminContextProvider';
import axios from 'axios';

class HandleingProcedureTypes extends Component {
    state = {
        procedures: [],
        name: '',
        refresh: false
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
    
    render() {
        return ( 
            <div class='row d-flex justify-content-center'>
            <div class='col-md-7'> 
                <h2>Clinic {this.state.name}</h2>
                <br/>
                <table class="table table-hover ">
                    <thead>
                        <th class="text-success">name</th>
                        <th class="text-success">duration</th>
                        <th class="text-success">is opeartion </th>
                        <th class="text-success">price</th>
                        <th></th>
                        <th></th>
                    </thead>
                    <tbody>
                        {this.state.procedures.map (c => (
                            <Fragment>
                                <ProcedureTypeItem key={c.id} id={c.id} value={c} handleUpdate={this.handleUpdate} />
                            </Fragment>
                        ))  }

                    </tbody>
                </table>
            </div>
            </div>
         );
    }
}
 
export default HandleingProcedureTypes;