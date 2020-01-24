import React, { Component } from 'react';
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

class ScheduleAnother extends Component {
    state = {
        currentAppointment: this.props.currentAppointment, //samo id od trenutnog appointmenta
        firstFreeDate: '01.09.2020 90:30',
        recomended: '',
        date: '',
        time: '',
        doctorsOptions: [],
        selectedDoctor: [],
        selectedOption: 'appointment',
        procedures: {},
        procedureTypeId: '',
        disableOperatin: false,
        disabledDoctors: true,
        disableSubmit: true,
        successedSchedule: false, //disables all inputs and submit button
        errorDate: true,
        errorTime: true,
        errorInUse: false,
        errorType: true,
        errorDoctor: true,
        errorDoctoCount: true
    }

    componentDidMount() {
        this.getFirstFreeAppoiintment()        

        axios.get("http://localhost:8080/api/procedure+types/operation/all")
            .then(response => {
                this.setState({procedures: response.data}, () => {
                    if(this.state.procedures.length == 0) {
                        this.setState({disableOperatin: true})
                    }
                })
            }).catch(error => {
                this.setState({disableOperatin: true})
            })
    }

    getFirstFreeAppoiintment = () => {
        axios.get("http://localhost:8080/api/doctors/schedules/first_free")
            .then(response => {
                this.setState({firstFreeDate: response.data})
            })
    }

    getDoctors = () => {
        axios.get(`http://localhost:8080/api/doctors/all/specialization=${this.state.procedureTypeId}`)
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

    createTypeItems = () => {
        let items = []; 
        var size = Object.keys(this.state.procedures).length;
        items.push(<option key={size} name='procedureTypeId' value='' selected="selected"> ---- </option>);
        for (let i = 0; i < size; i++) {             
             items.push(<option key={i} name = "procedureTypeId" value={this.state.procedures[i].id} >{this.state.procedures[i].name}: {this.state.procedures[i].price}</option>);   
        }
        return items;
    }

    handleValidationTimeAndDate = () => {
        this.setState({errorDate: false, errorTime: false, disableSubmit: true}, () => {
            if(this.state.date === null || this.state.date === "") {
                this.setState({errorDate: true})
            } else if(this.state.time === null || this.state.time === "") {
                this.setState({errorTime: true})
            } else {
                //provera izabranog datuma
                let dateAndTime = this.state.date + " " + this.state.time;
                if(this.state.selectedOption === 'appointment') {
                    axios.post("http://localhost:8080/api/doctors/schedules/check", {
                        dateAndTimeString: dateAndTime
                    }).then(response => {
                        if(response.status === 201) {
                            //trazeni termin je zauzet i predlozen je drugi
                            this.setState({errorInUse: true, errorDate: true, errorTime: true, recomended: response.data})
                        } else {
                            this.setState({errorInUse: false, errorDate: false, errorTime: false}, () => {
                                //izabani datum je valida i submit je dozvoljen
                                this.setState({disableSubmit: false})
                            })
                        }
                    }).catch(error => {
                        this.setState({errorInUse: true, errorDate: true, errorTime: true})
                    })
                } else {
                    if(!this.state.errorDoctoCount) {
                        axios.post("http://localhost:8080/api/operations/schedules/check", {
                                dateAndTimeString: dateAndTime,
                                doctor0: this.state.selectedDoctor[0],
                                doctor1: this.state.selectedDoctor[1],
                                doctor2: this.state.selectedDoctor[2]
                            }).then(response => {
                                if(response.status === 201) {
                                    //trazeni termin je zauzet i predlozen je drugi
                                    this.setState({errorInUse: true, errorDate: true, errorTime: true, recomended: response.data})
                                } else {
                                    this.setState({errorInUse: false, errorDate: false, errorTime: false}, () => {
                                        //izabani datum je valida i submit je dozvoljen
                                        this.setState({disableSubmit: false})
                                    })
                                }
                            }).catch(error => {
                                this.setState({errorInUse: true, errorDate: true, errorTime: true, errorDoctoCount: true})
                            })
                    }
                }
            }
        })
    }

    handleChange = (event) => {
        this.setState({
            selectedOption: event.target.value,  firstFreeDate: 'calculating', date: '', time: '', errorDate: true, errorTime: true, errorDoctoCount: true, errorType: true, disableSubmit: true
          }, () => {
            if(this.state.selectedOption === 'appointment') {
                this.getFirstFreeAppoiintment()
            }
          });
    }

    handleChangeTime = (time) => {
        this.setState({time: time}, () => { this.handleValidationTimeAndDate()})
    }

    handleChangeDate = (event) => {
        //jquery :(
        let date = document.getElementById('date').value;
        this.setState({date: date}, () => { this.handleValidationTimeAndDate()})
    }

    handlerTypeChange = (event) => {
        let val = event.target.value

        this.setState({procedureTypeId: val}, () => {
            if(this.state.procedureTypeId === '' || this.state.procedureTypeId === null || this.state.procedureTypeId === undefined) {
                this.setState({errorType: true, disabledDoctors: true, doctorsOptions: [], errorDoctoCount: true})
            } else {
                this.setState({errorType: false, disabledDoctors: false, errorDoctor: true}, () => {
                    this.getDoctors();
                })
            }
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
                axios.post("http://localhost:8080/api/doctors/schedules/operation/first_free", {
                    doctor0: this.state.selectedDoctor[0],
                    doctor1: this.state.selectedDoctor[1],
                    doctor2: this.state.selectedDoctor[2]
                })
                    .then(response => {
                        this.setState({firstFreeDate: response.data})
                    })
            } else {
                this.setState({errorDoctoCount: true})
            }
        })
    }
     

    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.selectedOption === 'appointment') {

            axios.post('http://localhost:8080/api/appointments/request/doctor', {
                oldAppointmentID: parseInt(this.state.currentAppointment),
                dateAndTime: this.state.date + " " + this.state.time, 
            }).then(respense => {
                this.setState({successedSchedule: true, disableSubmit: true});
            }).catch(error => {
                alert("Please refresh the page and try agan")
            })

        } else {
            
            axios.post('http://localhost:8080/api/operations/request/doctor', {
                appointmentId: parseInt(this.state.currentAppointment),
                dateAndTimeString: this.state.date + " " + this.state.time,
                doctor0: this.state.selectedDoctor[0],
                doctor1: this.state.selectedDoctor[1],
                doctor2: this.state.selectedDoctor[2]
            }).then(respense => {
                this.setState({successedSchedule: true})
            }).catch(error => {
                alert("Please refresh the page and try agan")
            })
        }
    }

    render() { 
        return ( 
                <form onSubmit={this.handleSubmit}>
                <div class="form-group row">
                    <div class="col-sm-10">

                        <p>Select a type of the schedule:</p>
                        
                        <span class="form-grup">
                            <div class="custom-control custom-radio">
                                <input type="radio" id="customRadio1" name="radio" class="custom-control-input" onChange={this.handleChange} value="appointment" checked={this.state.selectedOption === 'appointment'} disabled={this.state.successedSchedule}/>
                                <label class="custom-control-label" for="customRadio1">appointment</label>
                            </div>
                            <div class="custom-control custom-radio">
                                <input type="radio" id="customRadio2" name="radio" class="custom-control-input" onChange={this.handleChange} value="operation" checked={this.state.selectedOption === 'operation'} disabled={this.state.successedSchedule}/>
                                <label class="custom-control-label" for="customRadio2">operation</label>
                            </div>
                        </span>
                        <br/>

                        {this.state.selectedOption === 'operation' &&
                            <div>
                                <div className={`form-group ${this.state.errorType? 'has-danger': ''}`}>
                                    <label for="nurse">Select operation</label>
                                    <select multiple="" className={`form-control ${this.state.errorType? 'is-invalid': 'is-valid'}`} id="type" name='typeId' onChange={this.handlerTypeChange} disabled={this.state.successedSchedule}>
                                        {this.createTypeItems()}
                                    </select>
                                </div>

                                <div className={`form-group ${this.state.errorDoctor? 'has-danger': ''}`}>
                                    <label for="doctorsSelect">Doctors</label>
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

                            </div>
                        }

                        <div>
                            <label>First available date</label>
                            <p>{this.state.firstFreeDate}</p>

                            <div>
                                <label for='date'>Selecte date</label>
                                <FormControl type="date" id='date' placeholder="Date in format: dd/mm/yyyy" onChange={this.handleChangeDate} className={`form-control ${this.state.errorDate? 'is-invalid': 'is-valid'}`} disabled={this.state.successedSchedule}/>
                            </div>
                            <div>
                                <label for='time'>Select time</label>
                                <TimePicker name='duration' id='time' onChange={this.handleChangeTime} locale="sv-sv" value={this.state.time} className={`form-control ${this.state.errorTime? 'is-invalid': 'is-valid'}`} disabled={this.state.successedSchedule}/>
                            </div>
                            {this.state.errorInUse && <p class="text-danger">The selected day and tyme are already reserved. Please try reserving an another day or time.</p>}
                            {this.state.errorInUse && this.state.recomended != "" && <p class="text-success">Recomended schedule is {this.state.recomended}</p>}
                        
                        </div>
                        
                        <br/>
                        <input type="submit" class="btn btn-success" value="request" disabled={this.state.disableSubmit || this.state.successedSchedule}/>
                        {this.state.successedSchedule && 
                            <p class='text-success'>
                                You have successfully send a request.  
                            </p>
                        }
                    </div>
                </div>
                </form>
         );
    }
}
 
export default ScheduleAnother;