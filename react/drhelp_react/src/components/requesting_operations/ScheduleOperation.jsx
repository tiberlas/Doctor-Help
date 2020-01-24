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
        scheduleRecomendedDate: '',
        doctorsOptions: [],
        selectedDoctor: [],
        success: false,
        fatalError: false,
        errorDoctor: false,
        errorDoctoCount: true,
        errorNoDoctors: false
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
                        this.handelStringToDateAndTimeConversion()
                    })
                })
        }
    }

    handelStringToDateAndTimeConversion = () => {
        let parts = this.state.dateAndTime.split(" ");
        let dates = parts[0].split("/");
        let svDate = dates[2] +"-"+ dates[0] +"-"+ dates[1];
        this.setState({date: svDate}, () => {this.handleChanngeDateAndTime()})

        if(parts[2] == 'PM') {
            let hoursAndMinutes = parts[1].split(":")
            let hours = parseInt(hoursAndMinutes[0]);
            hours += 12;

            let timeString = hours +":"+hoursAndMinutes[1]
            this.setState({time: timeString}, () => {this.handleChanngeDateAndTime()})
        } else {
            this.setState({time: parts[1]}, () => {this.handleChanngeDateAndTime()});
        }
    }

    handleDateAndTimeToStringConversion = () => {
        let dateParts = this.state.date.split('-');
        let time = this.state.time;
        let dayPeriod = 'AM';
        let timePart = this.state.time.split(":");
        if(parseInt(timePart[0]) > 11) {
            dayPeriod = 'PM';
            time = parseInt(timePart[0]) - 11;
            time = time.toString +":"+ timePart[1];
        }

        return dateParts[1]+"/"+dateParts[2]+"/"+dateParts[0]+' '+time+' '+dayPeriod;
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
                this.setState({errorDoctor: true, disabledDoctors: true, errorNoDoctors: true, doctorsOptions: [], errorDoctoCount: true})
            })
    }

    handleDoctorChange = (options) => {
        if(options === null) {
            this.setState({selectedDoctor: []})
            return
        }
        let doctors = []
        for(let i=0; i<options.length; ++i) {
            doctors.push(options[i].value)
        }

        this.setState({selectedDoctor: doctors}, () => {
            if(this.state.selectedDoctor.length === 3) {
                this.setState({errorDoctoCount: false})
                axios.post("http://localhost:8080/api/operations/schedules/first_free", {
                    doctor0: this.state.selectedDoctor[0],
                    doctor1: this.state.selectedDoctor[1],
                    doctor2: this.state.selectedDoctor[2]
                }).then(response => {
                    this.setState({scheduleRecomendedDate: response.data}, () => {
                        if(this.state.dateAndTime != this.state.scheduleRecomendedDate) {
                            this.setState({errorDateAndTime: true})
                        } else {
                            this.setState({errorDateAndTime: false})
                        }
                    })
                })
            } else {
                this.setState({errorDoctoCount: true})
            }
        })
    }

    handleChanngeDateAndTime = () => {
        this.setState({dateAndTime: this.handleDateAndTimeToStringConversion()})
    }

    handleChangeTime = (time) => {
        this.setState({time}, () => {this.handleChanngeDateAndTime() })
    }

    handleChangeDate = (event) => {
        this.setState({date: event.target.value}, () => {this.handleChanngeDateAndTime() });
    }

    handleBless = (event) => {
        event.preventDefault();
        let dateAndTimeString = this.state.date + " " + this.state.time;
            axios.post("http://localhost:8080/api/operations/schedules/bless", {
                dateAndTimeString: dateAndTimeString,
                operationId: this.props.operationId,
                doctor0: this.state.selectedDoctor[0],
                doctor1: this.state.selectedDoctor[1],
                doctor2: this.state.selectedDoctor[2],
                roomId: this.props.roomId
            }).then(response => {
                this.setState({errorDateAndTime: false, success: true})
            }).catch(error => {
                if(error.response.status == 409) {
                    //dobijen predlog za drugi termin
                    let errorParts = error.response.data.split("#");
                    if(errorParts[0] == 'DOCTOR') {
                        this.setState({errorDoctors: true, scheduleRecomendedDate: error.response.data})
                    } else {
                        this.setState({errorDateAndTime: true, scheduleRecomendedDate: error.response.data})
                    }
                } else {
                    if(this.state.errorDoctoCount == false) {
                        this.setState({fatalError: true})
                    }
                }
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
                                    isDisabled={this.state.success}
                                />  
                            </div>
                            {this.state.errorDoctoCount && <p class='text-warning'>Must select exact 3 doctors</p>}

                        <div>
                            <label for='date'>date</label>
                            <FormControl type="date" id='date' placeholder="Date in format: dd/mm/yyyy" onChange={this.handleChangeDate} value={this.state.date} className={`form-control ${this.state.errorDateAndTime? 'is-invalid': 'is-valid'}`} disabled={this.state.success}/>
                        </div>
                        <div>
                            <label for='time'>time</label>
                            <TimePicker name='duration' id='time' onChange={this.handleChangeTime} locale="us" value={this.state.time} className={`form-control ${this.state.errorDateAndTime? 'is-invalid': 'is-valid'}`} disabled={this.state.success}/>
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
                        <input type="submit" class="btn btn-success" value="Bless" disabled={this.state.success?true:(this.state.errorDoctoCount)}/>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}
 
export default ScheduleOperation;