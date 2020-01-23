import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import TimePicker from 'react-time-picker/dist/TimePicker';
import FormControl from 'react-bootstrap/FormControl';
import Select from 'react-select';

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

class ScheduleOperation extends Component {
    state = {
        room: '',
        patient: '',
        procedure: '',
        procedureId: '',
        dateAndTime: '',
        time: '',
        date: '',
        doctorsOptions: [],
        selectedDoctor: [],
        disabledDoctors: true,
        errorDoctor: true,
        errorDoctoCount: true
    }
    
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.roomId != this.props.roomId) {
            axios.get('http://localhost:8080/api/rooms/one/room='+this.props.roomId)
                .then(response => {
                    this.setState({room: response.data.name+': '+response.data.number})
                })

            axios.get('http://localhost:8080/api/operations/requests/id='+this.props.operationId)
                .then(response => {
                    this.setState({
                        dateAndTime: response.data.date,
                        procedure: response.data.procedureName+" "+response.data.procedureDuration+" H",
                        procedureId: response.data.procedureId,
                        patient: response.data.patient
                    }, ()=> {
                        this.getDoctors()
                        this.handelDateAndTimeConversion()
                    })
                })
        }
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

    getDoctors = () => {
        axios.get(`http://localhost:8080/api/doctors/all/specialization=${this.state.procedureId}`)
            .then(response => {
                let items = []; 
                var size = Object.keys(response.data).length;

                for (let i = 0; i < size; i++) {
                    let option = {
                        label: 'dr ' + response.data[i].firstName + ' ' + response.data[i].lastName,
                        value: response.data[i].id
                    }             
                    items.push(option);
                }

                console.log("doctors: ", items)
                this.setState({
                    doctorsOptions: items, errorDoctor: true, disabledDoctors: false, errorDoctoCount: true
                })
            }).catch(error => {
                this.setState({errorDoctor: true, disabledDoctors: true, errorType: true, doctorsOptions: [], errorDoctoCount: true})
            })
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

    render() { 
        return (
            <Modal
              size="md"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={this.props.show}
            >

                <Modal.Header closeButton onClick={this.props.onHide}>
                    <Modal.Title id="contained-modal-title-vcenter">Schedule operation{this.props.operationId}</Modal.Title>
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
                                <label for="doctorsSelect">Select doctors</label>
                                <Select 
                                    id="doctorsSelect" 
                                    styles={fontStyles} 
                                    isMulti
                                    className={'basic-multi-select'} 
                                    classNamePrefix="select" 
                                    name="doctors" 
                                    options={this.state.doctorsOptions}  
                                    onChange = {this.handleDoctorChange}
                                    isClearable="true"
                                    isDisabled={this.state.successedSchedule || this.state.disabledDoctors}
                                />  
                            </div>
                            {this.state.errorDoctoCount && <p class='text-warning'>Must select exact 3 doctors</p>}

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
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={(success) => {this.props.onHide(this.state.success)}}>Close</button>
                        <input type="submit" class="btn btn-success" value="Bless" disabled={this.state.success}/>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}
 
export default ScheduleOperation;