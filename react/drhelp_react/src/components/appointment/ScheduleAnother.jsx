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
        date: '',
        time: '',
        doctors: {},
        errorDate: true,
        errorTime: true,
        errorInUse: false
    }

    componentDidMount() {

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

        //uputi axios i proveri da li valja termin
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

                        <div class="form-group">
                            <div class="custom-control custom-radio">
                                <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input" />
                                <label class="custom-control-label" for="customRadio1">appointment</label>
                            </div>
                            <div class="custom-control custom-radio">
                                <input type="radio" id="customRadio2" name="customRadio" class="custom-control-input" />
                                <label class="custom-control-label" for="customRadio2">operation</label>
                            </div>
                        </div>

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

                    </div>
                </div>
                </form>
            </div>
         );
    }
}
 
export default ScheduleAnother;