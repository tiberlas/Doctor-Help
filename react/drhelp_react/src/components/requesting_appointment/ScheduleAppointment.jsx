import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import TimePicker from 'react-time-picker/dist/TimePicker';
import FormControl from 'react-bootstrap/FormControl';

const fontStyles = {
    option: provided => ({
    ...provided,
    color: 'black'
    }),
    control: provided => ({
    ...provided,
    color: 'black'
    }),
    singleValue: provided => ({
    ...provided,
    color: 'black'
    })
}

class ScheduleAppointment extends Component {
    state = {
        procedure: "",
        patient: "",
        room: '',
        doctorList: [],
        nurse: '',
        date: '',
        time: '',
        dateAndTime: '',
        procedureId: 0,
        doctorSelected: '',
        scheduleRecomendedDate: '',
        doctorRecomendedDate: '',
        errorDate: false,
        errorTime: false,
        errorDateAndTime: false,
        errorDoctor: false,
        success: false,
        fatalError: false
    }
    
    handleGetDoctors = () => {
        axios.get('http://localhost:8080/api/doctors/all/specialization='+this.state.procedureId)
            .then(response => {
                this.setState({doctorList: response.data})
            })
    }

    handelDateAndTimeConversion = () => {
        let parts = this.state.dateAndTime.split(" ");
        let dates = parts[0].split("/");
        let svDate = dates[2] +"-"+ dates[0] +"-"+ dates[1];
        this.setState({date: svDate}, () => {this.handleChanngeDateAndTime()})

        if(parts[2] == 'PM') {
            let hoursAndMinutes = parts[1].split(":")
            let hours = parseInt(hoursAndMinutes[0]);
            let minutes = parseInt(hoursAndMinutes[1]);
            hours += 12;

            let timeString = hours + ":"+minutes
            this.setState({time: timeString}, () => {this.handleChanngeDateAndTime()})
        } else {
            this.setState({time: parts[1]}, () => {this.handleChanngeDateAndTime()});
        }
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.roomId !== this.props.roomId) {
            axios.get('http://localhost:8080/api/rooms/one/room='+this.props.roomId)
                .then(response => {
                    this.setState({room: response.data.name+': '+response.data.id})
                })

            axios.get('http://localhost:8080/api/appointments/requests/id='+this.props.appointmentId)
                .then(response => {
                    this.setState({procedure: response.data.type+' '+response.data.duration+' H',
                                    patient: response.data.patient,
                                    doctorSelected: response.data.doctor,
                                    procedureId: response.data.typeId,
                                    dateAndTime: response.data.date
                                }, ()=> {
                                    this.handleGetDoctors()
                                    this.handelDateAndTimeConversion()
                                })
                })
        }
    }

    createDoctorItems = () => {
        let items = []; 
        var size = Object.keys(this.state.doctorList).length;
        for (let i = 0; i < size; i++) {
            if(this.state.doctorList[i].email == this.state.doctorSelected) {
                items.push(<option key={i} name = "doctor" selected="selected" value={this.state.doctorList[i].email} >{this.state.doctorList[i].email}</option>);
            } else {
                items.push(<option key={i} name = "doctor" value={this.state.doctorList[i].email} >{this.state.doctorList[i].email}</option>);
            }
        }
        return items;
    }

    handlerChangeDoctor = (event) => {
        let val = event.target.value
        this.setState({doctorSelected: val, errorDoctor: false})
    }

    handleChanngeDateAndTime = () => {
        this.setState({dateAndTime: this.state.date +' '+ this.state.time, errorDate: false})
    }

    handleChangeTime = (time) => {
        this.setState({time: time, errorTime: false}, () => {this.handleChanngeDateAndTime() })
    }

    handleChangeDate = (event) => {
        this.setState({date: event.target.value}, () => {this.handleChanngeDateAndTime() });
    }

    handleBless = (event) => {
        event.preventDefault();

        this.setState({errorDateAndTime: false, errorDoctor: false}, () => {
            axios.post('http://localhost:8080/api/appointments/bless', {
                patientEmail: this.state.patient,
                doctorEmail: this.state.doctorSelected,
                roomId: this.props.roomId,
                procedureId: this.state.procedureId,
                dateAndTime: this.state.dateAndTime,
                appointmentRequestedId: this.props.appointmentId
            }).then(response => {
                //aleluja
                this.setState({success: true})
            }).catch(error => {
                if(error.response.status == 406) {
                    let status = error.response.data.split("#");
                    if(status[0] == 'DOCTOR') {
                        this.setState({errorDoctor: true, doctorRecomendedDate: status[1]})
                    } else {
                        this.setState({errorDateAndTime: true, errorDate: true, errorTime: true, scheduleRecomendedDate: status[1]})
                    }
                } else {
                    //fatalan error
                    this.setState({fatalError: true})
                }
            })
        })
    }

    render() { 
        return (
            <Modal
              size="md"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={this.props.show}
            >

                <Modal.Header closeButton onClick={this.props.onHide}>
        <Modal.Title id="contained-modal-title-vcenter">Schedule appointment{this.props.appointmentId}</Modal.Title>
                </Modal.Header>
                <form onSubmit={this.handleBless}>
                    <Modal.Body>
                        <div class="form-group">
                            <fieldset disabled="">
                                <label class="control-label" for="disabledInput">Procerure</label>
                                <input style={fontStyles} class="form-control" id="disabledInput" type="text" value={this.state.procedure} disabled="true" />
                            </fieldset>
                        </div>
                        <div class="form-group">
                            <fieldset disabled="">
                                <label class="control-label" for="disabledInput">Pacient</label>
                                <input style={fontStyles} class="form-control" id="disabledInput" type="text" value={this.state.patient} disabled="true" />
                            </fieldset>
                        </div>
                        <div class="form-group">
                            <fieldset disabled="true">
                                <label class="control-label" for="disabledInput">Room</label>
                                <input style={fontStyles} class="form-control" id="disabledInput" type="text" value={this.state.room} disabled="" />
                            </fieldset>
                        </div>
                        <hr class="my-4" />

                        <div className={`form-group ${this.state.errorDoctor? 'has-danger': ''}`}>
                            <label for="doctor">Doctor</label>
                            <select multiple="" className={`form-control ${this.state.errorDoctor? 'is-invalid': 'is-valid'}`} id="doctor" name='doctor' onChange={this.handlerChangeDoctor} disabled={this.state.success}>
                                {this.createDoctorItems()}
                            </select>
                            { (this.state.errorDoctor) && <div class="invalid-feedback"> Doctor is occupied for this schedule, try {this.state.doctorRecomendedDate} </div>}
                        </div>

                        <div>
                            <label for='date'>date</label>
                            <FormControl type="date" id='date' placeholder="Date in format: dd/mm/yyyy" onChange={this.handleChangeDate} value={this.state.date} className={`form-control ${this.state.errorDate? 'is-invalid': 'is-valid'}`} disabled={this.state.success}/>
                        </div>
                        <div>
                            <label for='time'>time</label>
                            <TimePicker name='duration' id='time' onChange={this.handleChangeTime} locale="us" value={this.state.time} className={`form-control ${this.state.errorTime? 'is-invalid': 'is-valid'}`} disabled={this.state.success}/>
                        </div>
                        {this.state.errorDateAndTime && 
                            <div class="text-danger"> Schedule is occupied, try {this.state.scheduleRecomendedDate} </div>
                        }

                        {this.state.success &&
                            <p class="text-success">Successfully blessed appointment</p>
                        }
                        {this.state.fatalError &&
                            <p class="text-danger">Fatal error, please reaload the page</p>
                        }

                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={this.props.onHide}>Close</button>
                        <input type="submit" class="btn btn-success" value="Bless" disabled={this.state.success}/>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}
 
export default ScheduleAppointment;