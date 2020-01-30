import React, { Component } from 'react';
import { ClinicAdminContext } from '../../context/ClinicAdminContextProvider';
import MedicalStuffItem from './MedicalStuffItem';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from 'react-bootstrap/Button';
import '../../customRadioButton.css';
import CreateMedicalStaff from './CreateMedicalStaff';

const sortTypes = {
    first_up: {
        fn: (a, b) => b.firstName.localeCompare(a.firstName)
    },
    first_down: {
        fn: (a, b) => a.firstName.localeCompare(b.firstName)
    },
    last_up: {
        fn: (a, b) => b.lastName.localeCompare(a.lastName)
    },
    last_down: {
        fn: (a, b) => a.lastName.localeCompare(b.lastName)
    },
    email_up: {
        fn: (a, b) => b.email.localeCompare(a.email)
    },
    email_down: {
        fn: (a, b) => a.email.localeCompare(b.email)
    },
    role_up: {
        fn: (a, b) => b.role.localeCompare(a.role)
    },
    role_down: {
        fn: (a, b) => a.role.localeCompare(b.role)
    },
    default: {
        fn: (a, b) => a
    }
}

class ClinicAdminMedicalStaff extends Component {
    static contextType = ClinicAdminContext

    state = {
        medicalStuff: [],
        shownMedicalStaff: [],
        clinicName: '',
        filterString: '',
        isFilterRoleActive: false,
        currentSort: 'default',
        checkedMedicalStaff: 'ALL',
        addModalDialog: false
    }

    componentDidMount() {
        this.handleMedicalStuff();
        this.handleCLinicName();
    }

    handleCLinicName = () => {
        axios.get("http://localhost:8080/api/clinics/id=" + this.context.admin.clinicId)
            .then(response => {
                this.setState({
                    clinicName: response.data.name
                })
            })
    }

    handleMedicalStuff = () => {
        axios.get("http://localhost:8080/api/medical+stuff/clinic=" + this.context.admin.clinicId + "/all")
            .then(response => {
                this.setState({
                    medicalStuff: response.data,
                    shownMedicalStaff: response.data
                })
            })
    }

    onSortChange = (name) => {
        const { currentSort } = this.state;
        let nextSort;

        if (name === 'first') {
            if (currentSort === 'first_down') nextSort = 'first_up';
            else if (currentSort === 'first_up') nextSort = 'default';
            else nextSort = 'first_down';
        } else if (name === 'last') {
            if (currentSort === 'last_down') nextSort = 'last_up';
            else if (currentSort === 'last_up') nextSort = 'default';
            else nextSort = 'last_down';
        } else if (name === 'email') {
            if (currentSort === 'email_down') nextSort = 'email_up';
            else if (currentSort === 'email_up') nextSort = 'default';
            else nextSort = 'email_down';
        } else {
            if (currentSort === 'role_down') nextSort = 'role_up';
            else if (currentSort === 'role_up') nextSort = 'default';
            else nextSort = 'role_down';
        }

        this.setState({
            currentSort: nextSort
        }, () => {
            this.renderArrowFirst()
            this.renderArrowLast()
            this.renderArrowEmail()
            this.renderArrowRole()
        });
    };

    renderArrowFirst = () => {
        if (this.state.currentSort === 'first_up') {
            return '\u2191'
        } else if (this.state.currentSort === 'first_down') {
            return '\u2193'
        } else {
            return ''
        }
    }

    renderArrowLast = () => {
        if (this.state.currentSort === 'last_up') {
            return '\u2191'
        } else if (this.state.currentSort === 'last_down') {
            return '\u2193'
        } else {
            return ''
        }
    }

    renderArrowEmail = () => {
        if (this.state.currentSort === 'email_up') {
            return '\u2191'
        } else if (this.state.currentSort === 'email_down') {
            return '\u2193'
        } else {
            return ''
        }
    }

    renderArrowRole = () => {
        if (this.state.currentSort === 'role_up') {
            return '\u2191'
        } else if (this.state.currentSort === 'role_down') {
            return '\u2193'
        } else {
            return ''
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleUpdate = (key, role) => {
        const items = this.state.medicalStuff.filter(item => (item.id !== key || item.role !== role));
        this.setState({ medicalStuff: items }, () => {
            this.handleFilterRole()
        });
    }

    handleOptionChange = (changeEvent) => {
        this.setState({
            checkedMedicalStaff: changeEvent.target.value
        }, () => {
            this.handleFilterRole()
        });
    }

    handleFilterRole = () => {
        if (this.state.checkedMedicalStaff == 'DOCTOR') {
            let items = this.state.medicalStuff.filter(item => item.role === 'DOCTOR');
            this.setState({ shownMedicalStaff: items })
        } else if (this.state.checkedMedicalStaff == 'NURSE') {
            let items = this.state.medicalStuff.filter(item => item.role === 'NURSE');
            this.setState({ shownMedicalStaff: items })
        } else {
            this.setState({ shownMedicalStaff: this.state.medicalStuff })
        }
    }

    handleFilter = () => {
        axios.post('http://localhost:8080/api/medical+stuff/filter',
            {
                string: this.state.filterString,
                role: 'DISABLED'
            }).then(response => {
                this.setState({ medicalStuff: response.data }, () => {
                    this.handleFilterRole();
                });
            }).catch(error => {
                console.log('error in filter of procedure types')
            })
    }

    handleAddMedicalStaff = () => {
        this.setState({ addModalDialog: !this.state.addModalDialog });
    }

    render() {
        let i = 0;
        return (
            <div class='row d-flex justify-content-center'>
                <div class='col-md-8'>
                    <br />
                    <h3 class=''>Clinic {this.state.clinicName}</h3>
                    <div class='row'>
                        <div class='col'>
                            <h4>List of employees</h4>
                        </div>
                        <div class='col'>
                            <button class='btn btn-success rounded-circle float-right mr-5' onClick={this.handleAddMedicalStaff}>+</button>
                        </div>
                    </div>
                    <br />
                    <CreateMedicalStaff
                        show={this.state.addModalDialog}
                        onHide={this.handleAddMedicalStaff}
                    />
                    <Table class="table table-hover">
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan='3'>
                                    <ul>
                                        <li>
                                            <input
                                                type="radio"
                                                id="customRadio3"
                                                name="customRadio"
                                                value="ALL"
                                                defaultChecked
                                                onChange={this.handleOptionChange}
                                            />
                                            <label
                                                class="text-white"
                                                for="customRadio3"
                                            >
                                                all
											</label>
                                            <div class="check"></div>
                                        </li>
                                        <li>
                                            <input
                                                type="radio"
                                                id="customRadio1"
                                                name="customRadio"
                                                value="DOCTOR"
                                                onChange={this.handleOptionChange}
                                            />
                                            <label
                                                class="text-white"
                                                for="customRadio1"
                                            >
                                                doctors
											</label>
                                            <div class="check"></div>
                                        </li>
                                        <li>
                                            <input
                                                type="radio"
                                                id="customRadio2"
                                                name="customRadio"
                                                value="NURSE"
                                                onChange={this.handleOptionChange}
                                            />
                                            <label
                                                class="text-white"
                                                for="customRadio2"
                                            >
                                                nurses
											</label>
                                            <div class="check"></div>
                                        </li>
                                    </ul>
                                </TableCell>
                                <TableCell>
                                    <input type="text" placeholder="Filter..." name="filterString" onChange={this.handleChange} />
                                </TableCell>
                                <TableCell>
                                    <Button variant="success" onClick={this.handleFilter}>Search</Button>
                                </TableCell>
                            </TableRow>
                            <TableRow class="table-active">
                                <TableCell class="text-success cursor-pointer" onClick={() => this.onSortChange('first')}>first name{this.renderArrowFirst()}</TableCell>
                                <TableCell class="text-success cursor-pointer" onClick={() => this.onSortChange('last')}>last name{this.renderArrowLast()}</TableCell>
                                <TableCell class="text-success cursor-pointer" onClick={() => this.onSortChange('email')}>email{this.renderArrowEmail()}</TableCell>
                                <TableCell class="text-success cursor-pointer" onClick={() => this.onSortChange('role')}>role{this.renderArrowRole()}</TableCell>
                                <TableCell class="text-success"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.shownMedicalStaff.sort(sortTypes[this.state.currentSort].fn).map(c => (
                                <TableRow className={(++i) % 2 ? `table-dark` : ``} >
                                    <MedicalStuffItem key={i} value={c} handleUpdate={this.handleUpdate} />
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default ClinicAdminMedicalStaff;