import React, {Component, Fragment}  from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import {NurseContext} from '../../context/NurseContextProvider';

class PerscriptionList extends Component {
    state = {
        perscriptions: []
    }

    static contextType = NurseContext

    componentDidMount () {
		axios.get('http://localhost:8080/api/nurses/pendingPerscriptions')
		.then (response => {
			this.setState ({
				perscriptions: response.data
			})
        })
    }

    handleClick = (event) => {
        event.preventDefault()
        let url = 'http://localhost:8080/api/nurses/signOff/' + this.context.nurse.id + '/' + event.target.value
        alert(url)
        axios.put (url)
		.then (response => {
            console.log("response data" + response.data)
			this.handleUpdate(response.data.id)
        })
    }

    handleUpdate = (key) => {
        const items = this.state.perscriptions.filter(item => item.perscriptionId !== key);
        console.log('items', items)
        this.setState({ perscriptions: items});
        console.log("state", this.state.perscriptions)
    }

    generatePerscriptionRows(row) {
        console.log("rowmeds" + row.medicationList)
                const meds = row.medicationList.map(item => item.medicationName)
                let medString = ""
                for(let i = 0; i < meds.length; i++) {
                    medString += meds[i] + ","
                }
                medString = medString.substring(0, medString.length - 1)
        return (
            <Fragment>
                
                <TableCell><p class='text-white'>{row.doctor}</p></TableCell>
                <TableCell><p class='text-white'>{row.patient}</p></TableCell>
                <TableCell><p class='text-white'>{row.diagnosis}</p></TableCell>
                <TableCell><p class='text-white'>{medString}</p></TableCell>
                <TableCell><Button name = "perscriptionId" value = {row.perscriptionId} className ="btn btn-success" onClick = {this.handleClick}> Sign off</Button></TableCell>
             </Fragment>
        )
    }


    render() {

         let size = this.state.perscriptions.length
		return (
			<div>
                <div class="row d-flex justify-content-center">
                    <div class='col-md-8'>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><p class='text-success'>Doctor</p></TableCell>
                                        <TableCell><p class='text-success'>Patient</p></TableCell>
                                        <TableCell><p class='text-success'>Diagnosis</p></TableCell>
                                        <TableCell><p class='text-success'>Perscribed medication</p></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {size > 0 ? this.state.perscriptions.map (row => (
                                        <TableRow key={row.id}>
                                            {this.generatePerscriptionRows(row)}
                                        </TableRow>
                                    )) : <h3> No pending perscriptions found. </h3> }
                                </TableBody>
                            </Table>
                    </div>
                </div>
			</div>
		);

    }



}


export default PerscriptionList