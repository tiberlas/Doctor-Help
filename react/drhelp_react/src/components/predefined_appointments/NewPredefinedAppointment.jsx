import React, { Component } from 'react';
import {ClinicAdminContext} from '../../context/ClinicAdminContextProvider';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import TimePicker from 'react-time-picker/dist/TimePicker';
import FormControl from 'react-bootstrap/FormControl';

class NewPredefinedAppointment extends Component {
    state = {
        dateAndTime: '',
        procedureTypeId: '',
        roomId: '', 
        doctorId: '',
        nurseId: '',
        price: 0,
        disscount: 0,
        time: '',
        date: '',

        doctorListRender: {},
        roomListRender: {},

        roomList: {},
        doctorList: {},
        nurseList: {},
        procedureList: {},

        doctorDisabled: true,
        roomDisabled: true,
        errorNurse: true,
        errorRoom: true,
        errorDisscount: true,
        errorTime: true,
        errorDate: true,
        errorTimeAndDate: true,
        errorPrice: true,
        go_profile: false 
    }

    static contextType = ClinicAdminContext

    componentDidMount() {
        axios.get('http://localhost:8080/api/doctors/clinic='+this.context.admin.clinicId+'/all')
            .then(response => {
                this.setState({doctorList: response.data})
            })

        axios.get('http://localhost:8080/api/rooms/all')
            .then(response => {
                this.setState({roomList: response.data})
            })

        axios.get('http://localhost:8080/api/procedure+types/appointments/all')
            .then(response => {
                this.setState({procedureList: response.data})
            })

        axios.get('http://localhost:8080/api/nurses/all')
            .then(response => {
                this.setState({nurseList: response.data})
            })
    }
    
    handleValidation = () => {
        this.setState({errorDisscount: false, errorPrice: false, doctorDisabled: false, roomDisabled: false, errorRoom: false}, () => {

            if(this.state.price === null || this.state.price === '' || this.state.price < 1) {
                this.setState({errorPrice: true});
            }
            
            if(this.state.disscount === null || this.state.disscount === '' || this.state.disscount < 0 || this.state.disscount > 100) {
                this.setState({errorDisscount: true});
            }

            if(this.state.procedureTypeId === null || this.state.procedureTypeId === "" || this.state.procedureTypeId === NaN) {
                this.setState({doctorDisabled: true, roomDisabled: true, errorRoom: true, doctorId: ""})
            } else {
                    var size = Object.keys(this.state.doctorList).length;
                    let items = []
                    for(let i=0; i<size; ++i) {
                        if(this.state.doctorList[i].procedureTypeId == this.state.procedureTypeId) {
                            items.push(this.state.doctorList[i]) 
                        }
                    }

                    this.setState({doctorListRender: items})
            }
            
            if(this.state.doctorId === null || this.state.doctorId === "") {
                this.setState({roomDisabled: true, errorRoom: true, roomId: ""})
            } else {
                var size = Object.keys(this.state.roomList).length;
                    let items = []
                    for(let i=0; i<size; ++i) {
                        if(this.state.roomList[i].procedureTypeId == this.state.procedureTypeId) {
                            items.push(this.state.roomList[i]) 
                        }
                    }
                    this.setState({roomListRender: items})
            }

            if(this.state.roomId === null || this.state.roomId === "") {
                this.setState({errorRoom: true})
            }

            if(this.state.nurseId === null || this.state.nurseId === "") {
                this.setState({errorNurse: true})
            } else {
                this.setState({errorNurse: false})
            }

        })
    }

    handleValidationTimeAndDate = () => {
        this.setState({errorDate: false, errorTime: false, errorTimeAndDate: false}, () => {
            if(this.state.date === null || this.state.date === "") {
                this.setState({errorDate: true, errorTimeAndDate: true})
            } else if(this.state.time === null || this.state.time === "") {
                this.setState({errorTime: true, errorTimeAndDate: true})
            } else {
                this.setState({dateAndTime: this.state.date+' '+this.state.time})
            }
        })
    }

    handlerChange = (event) => {
        let nam = event.target.name
        let val = event.target.value
        console.log(event.target)
        this.setState({[nam]: val}, () => { this.handleValidation()})
    }

    handlerChangeProcedureType = (event) => {
        let val = event.target.value.split("-")
        if(val[0] === '') {
            this.setState({procedureTypeId: ''}, () => { this.handleValidation()})
        } else {
            this.setState({procedureTypeId: parseInt(val[0]), price: parseInt(val[1])}, () => { this.handleValidation()})
        }
    }

    handleChangeTime = (time) => {
        this.setState({time: time}, () => { this.handleValidationTimeAndDate()})
    }

    handleChangeDate = (event) => {
        //jquery :(
        let date = document.getElementById('date').value;
        this.setState({date: date}, () => { this.handleValidationTimeAndDate()})
    }

    createDoctorItems() {
        let items = []; 
        var size = Object.keys(this.state.doctorListRender).length;
        items.push(<option key={size} name='doctorId' value="" selected="selected"> ---- </option>);
        for (let i = 0; i < size; ++i) {             
             items.push(<option key={i} name='doctorId' value={this.state.doctorListRender[i].id}> dr. {this.state.doctorListRender[i].lasttName} {this.state.doctorListRender[i].firstName} </option>);   
             //here I will be creating my options dynamically based on
             //what props are currently passed to the parent component
        }
        return items;
    }

    createNurseItems() {
        let items = []; 
        var size = Object.keys(this.state.nurseList).length;
        items.push(<option key={size} name='nurseId' value="" selected="selected"> ---- </option>);
        for (let i = 0; i < size; ++i) {             
             items.push(<option key={i} name='nurseId' value={this.state.nurseList[i].id}>{this.state.nurseList[i].lasttName} {this.state.nurseList[i].firstName} </option>);   
        }
        return items;
    }

    createRoomItems() {
        let items = []; 
        var size = Object.keys(this.state.roomListRender).length;
        items.push(<option key={size} name='roomId' value="" selected="selected"> ---- </option>);
        for (let i = 0; i < size; i++) {             
             items.push(<option key={i} name='roomId' value={this.state.roomListRender[i].id}>{this.state.roomListRender[i].name} {this.state.roomListRender[i].number} </option>);   
             //here I will be creating my options dynamically based on
             //what props are currently passed to the parent component
        }
        return items;
    } 

    createProcedureItems() {
        let items = []; 
        var size = Object.keys(this.state.procedureList).length;
        items.push(<option key={size} name='procedureTypeId' value="-" selected="selected"> ---- </option>);
        for (let i = 0; i < size; i++) {
            let durationParts = this.state.procedureList[i].duration.split(":"); 
             items.push(<option key={i} name = "procedureTypeId" value={this.state.procedureList[i].id+'-'+this.state.procedureList[i].price} >
                    {this.state.procedureList[i].name} 
                    &nbsp;({this.state.procedureList[i].price})
                    &nbsp;{durationParts[0]}:{durationParts[1]} H
                </option>);   
             //here I will be creating my options dynamically based on
             //what props are currently passed to the parent component
        }
        return items;
    } 

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/api/predefined+appointments/newPredefinedAppointment', {
            dateAndTime: this.state.dateAndTime,
	        procedureTypeId: this.state.procedureTypeId,
            roomId: this.state.roomId,
            doctorId: this.state.doctorId,
            nurseId: this.state.nurseId,
	        price: this.state.price,
	        disscount: this.state.disscount
        }).then( (response) => {
            this.setState({go_profile: true})
        }).catch((error) => {
            this.setState({ 
                errorName: true
            })
        });
    }

    handleCancel = () => {
        this.setState({go_profile: true})
    }

    render() {
        if(this.state.go_profile === true)
            return(<Redirect to='/clinic-administrator/predefined-appointments'></Redirect> ); 
        return (  
            <div class='row d-flex justify-content-center'>
            <div class='col-md-3'> 
                <div>
                    <br/>
                    <h4>Create a predefined appointment</h4>
                    <br/>
                </div>
                <form onSubmit={this.handleSubmit}> 

                    <div className={`form-group ${this.state.doctorDisabled? 'has-danger': ''}`} >
                        <label for="procedureTypeId">appointment type</label>
                        <select multiple="" className={`form-control ${this.state.doctorDisabled? 'is-invalid': 'is-valid'}`} id="procedureTypeId" name='procedureTypeId' onChange={this.handlerChangeProcedureType} >
                            {this.createProcedureItems()}
                        </select>
                    </div>

                    <div className={`form-group ${this.state.roomDisabled? 'has-danger': ''}`}>
                        <label for="doctor">doctor</label>
                        <select multiple="" className={`form-control ${this.state.roomDisabled? 'is-invalid': 'is-valid'}`} id="doctor" name='doctorId' onChange={this.handlerChange} disabled={this.state.doctorDisabled}>
                            {this.createDoctorItems()}
                        </select>
                    </div>

                    <div className={`form-group ${this.state.errorNurse? 'has-danger': ''}`}>
                        <label for="nurse">nurse</label>
                        <select multiple="" className={`form-control ${this.state.errorNurse? 'is-invalid': 'is-valid'}`} id="nurse" name='nurseId' onChange={this.handlerChange}>
                            {this.createNurseItems()}
                        </select>
                    </div>

                    <div className={`form-group ${this.state.errorRoom? 'has-danger': ''}`}>
                        <label for="room">room</label>
                        <select multiple="" className={`form-control ${this.state.errorRoom? 'is-invalid': 'is-valid'}`} id="room" name='roomId' onChange={this.handlerChange} disabled={this.state.roomDisabled}>
                            {this.createRoomItems()}
                        </select>
                    </div>

                    <div>
                        <label for='date'>date</label>
                        <FormControl type="date" id='date' placeholder="Date in format: dd/mm/yyyy" onChange={this.handleChangeDate} className={`form-control ${this.state.errorDate? 'is-invalid': 'is-valid'}`}/>
                    </div>
                    <div>
                        <label for='time'>time</label>
                        <TimePicker name='duration' id='time' onChange={this.handleChangeTime} locale="sv-sv" value={this.state.time} className={`form-control ${this.state.errorTime? 'is-invalid': 'is-valid'}`}/>
                    </div>

                    <div class='form-group'>
                        <label class="form-control-label" for="price">price:</label>
                        <input type='number' name='price' id='price' class='form-control' value={this.state.price} disabled />
                    </div>

                    <div className={`form-group ${this.state.errorDisscount? 'has-danger': ''}`}>
                        <label class="form-control-label" for="price">disscount:</label>
                        <div class='input-group'>
                            <input type='number' min="0" max="100" name='disscount' id='disscount' className={`form-control ${this.state.errorDisscount? 'is-invalid': 'is-valid'}`} value={this.state.disscount} onChange={this.handlerChange} />
                            <div class="input-group-append">
                                <span class="input-group-text">%</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class='col-md text-left'>
                            <input type="submit" class="btn btn-success" disabled={ this.state.errorDisscount || this.state.errorTimeAndDate || this.state.errorRoom || this.state.errorNurse} value="submit"/>
                        </div>
                        <div class='col-md text-right'>
                            <button type="button" class="btn btn-danger" onClick={this.handleCancel}>Cancel</button>
                        </div>
                    </div>
                </form>
                
            </div>
            </div>
        );
    }
}
 
export default NewPredefinedAppointment;