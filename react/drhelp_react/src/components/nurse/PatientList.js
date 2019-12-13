import React, {Component, Fragment}  from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button'



class PatientList extends Component {

	state = {
        patients: [],
        filter: ""
	}

	componentDidMount () {
		axios.get ('http://localhost:8080/api/nurses/patientList')
		.then (response => {
			this.setState ({
				patients: response.data
			})
        })
        
        document.addEventListener('keydown', this.handleKeyPress);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
        //alert("handled enter remove")
     }

     handleKeyPress(event) {
        if (event.keyCode === 13) { //enter button keyCode
            //this.filterSubmit()
        }
      }

   
    handleChange = (event) => {
        this.setState( {
            [event.target.name]: event.target.value
        })

        console.log("filter: " + this.state.filter)
    }

    filterSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:8080/api/nurses/filterPatients', {
            filterResults: this.state.filter
        }).then(response => {
            this.setState({
                patients: response.data
            })
        })
    }

  


    

    generatePatientRows(row) {
        let profileUrl = '/profile/' + row.insuranceNumber
        return (
            <Fragment>
                <TableCell><Link exact to = {profileUrl} >{row.insuranceNumber}</Link></TableCell>
                <TableCell><p class='text-white'>{row.firstName}</p></TableCell>
                <TableCell><p class='text-white'>{row.lastName}</p></TableCell>
                <TableCell><p class='text-white'>{row.email}</p></TableCell>
                <TableCell></TableCell>
             </Fragment>
        )
    }

	render () {

        let size = this.state.patients.length
		return (
			<div>
                <div class="row d-flex justify-content-center">
                    <div class='col-md-5'>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><p class='text-success'>Insurance number</p></TableCell>
                                        <TableCell><p class='text-success'>First name</p></TableCell>
                                        <TableCell><p class='text-success'>Last name</p></TableCell>
                                        <TableCell><p class='text-success'>Mail</p></TableCell>
                                        <TableCell> <input type = "text" placeholder="Filter patients..." name = "filter" onChange = {this.handleChange}/> </TableCell>
                                        <TableCell> <Button className="btn btn-success" onClick = {this.filterSubmit}>Search</Button> </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {size > 0 ? this.state.patients.map (row => (
                                        <TableRow key={row.id}>
                                            {this.generatePatientRows(row)}
                                        </TableRow>
                                    )) : <h3> No results found. :( </h3> }
                                </TableBody>
                            </Table>
                    </div>
                </div>
			</div>
		);
	}

}

export default PatientList;