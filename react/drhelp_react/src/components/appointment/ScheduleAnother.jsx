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
        firstFreeDate: '01.09.2020 90:30',
        recomended: '',
        date: '',
        time: '',
        isAppointment: true,
        isOperation: false,
        doctors: {},
        errorDate: true,
        errorTime: true,
        errorInUse: false
    }

    componentDidMount() {
        axios.get("http://localhost:8080/api/doctors/schedules/first_free")
            .then(response => {
                this.setState({firstFreeDate: response.data})
            })
    }

    handleValidationTimeAndDate = () => {
        this.setState({errorDate: false, errorTime: false}, () => {
            if(this.state.date === null || this.state.date === "") {
                this.setState({errorDate: true})
            } else if(this.state.time === null || this.state.time === "") {
                this.setState({errorTime: true})
            } else {
                //provera izabranog datuma
                let dateAndTime = this.state.date + " " + this.state.time;
                axios.post("http://localhost:8080/api/doctors/schedules/check", {
                    dateAndTimeString: dateAndTime,
                }).then(response => {
                    if(response.status === 201) {
                        //trazeni termin je zauzet i predlozen je drugi
                        this.setState({errorInUse: true, errorDate: true, errorTime: true, recomended: response.data})
                    } else {
                        this.setState({errorInUse: false, errorDate: false, errorTime: false})
                    }
                }).catch(error => {
                    this.setState({errorInUse: true, errorDate: true, errorTime: true})
                })
            }
        })
    }

    handlerChange = (event) => {
        this.setState({isAppointment: this.state.isAppointment})
    
    }

    handleChangeTime = (time) => {
        this.setState({time: time}, () => { this.handleValidationTimeAndDate()})
    }

    handleChangeDate = (event) => {
        //jquery :(
        let date = document.getElementById('date').value;
        this.setState({date: date}, () => { this.handleValidationTimeAndDate()})
    }

    render() { 
        return ( 
            <div>
                <form>
                <div class="form-group row">
                    <div class="col-sm-10">

                        <label>First available date</label>
                        <p>{this.state.firstFreeDate}</p>

                        <div>
                            <label for='date'>Selecte date</label>
                            <FormControl type="date" id='date' placeholder="Date in format: dd/mm/yyyy" onChange={this.handleChangeDate} className={`form-control ${this.state.errorDate? 'is-invalid': 'is-valid'}`}/>
                        </div>
                        <div>
                            <label for='time'>Select time</label>
                            <TimePicker name='duration' id='time' onChange={this.handleChangeTime} locale="sv-sv" value={this.state.time} className={`form-control ${this.state.errorTime? 'is-invalid': 'is-valid'}`}/>
                        </div>
                        {this.state.errorInUse && <p class="text-danger">The selected day and tyme are already reserved. Please try reserving an another day or time.</p>}
                        {this.state.errorInUse && this.state.recomended != "" && <p class="text-success">Recomended schedule is {this.state.recomended}</p>}

                        <div class="form-group">
                            <div class="custom-control custom-radio">
                                <input type="radio" id="customRadio1" name="isAppointment" class="custom-control-input" onChange={this.handleChange} checked={this.state.isAppointment}/>
                                <label class="custom-control-label" for="customRadio1">appointment</label>
                            </div>
                            <div class="custom-control custom-radio">
                                <input type="radio" id="customRadio2" name="isOperation" class="custom-control-input" onChange={this.handleChange} checked={!this.state.isAppointment}/>
                                <label class="custom-control-label" for="customRadio2">operation</label>
                            </div>
                        </div>

                        {!this.state.isAppointment &&
                            <Select 
                            id="doctorsSelect" 
                            styles={fontStyles} 
                            className="basic-single" 
                            classNamePrefix="select" 
                            name="doctors" 
                            options={this.state.doctors} 
                            defaultValue={this.state.doctors[0]} 
                            onChange = {this.props.handleDoctorsChange}
                                />
                        }
                    </div>
                </div>
                </form>
            </div>
         );
    }
}
 
export default ScheduleAnother;