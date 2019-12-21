import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import TimePicker from 'react-time-picker';
import Checkbox from '@material-ui/core/Checkbox';

class NewProcedureType extends Component {
    state = {
        price: 0,
        name: '',
        duration: '',
        operation: false,
        errorPrice: true,
        errorName: true,
        errorDuration: true,
        go_profile: false 
    }
    
    handleValidation = () => {
        this.setState({errorName: false, errorPrice: false, errorDuration: false})

        if(this.state.name === undefined || this.state.name === null || !this.state.name.trim() || this.state.name.length < 3) {
            this.setState({errorName: true});
        }

        if(this.state.price === undefined || this.state.price === null || this.state.price === "" || this.state.price < 1) {
            this.setState({errorPrice: true});
        }

        if(this.state.duration === undefined || this.state.duration === null || this.state.duration === "") {
            this.setState({errorDuration: true});
        }
    }

    handlerChange = (event) => {
        let nam = event.target.name
        let val = event.target.value
        this.setState({[nam]: val}, () => { this.handleValidation()})
    }

    handleChangeTime = (time) => {
        this.setState({duration: time}, () => { this.handleValidation()})
    }

    handleChecked = (event) => {
        this.setState({operation: event.target.checked});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/api/procedure+types/new+procedure+type', {
            name: this.state.name,
            price: parseInt(this.state.price),
            duration: this.state.duration,
            operation: this.state.operation
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
            return(<Redirect to='/clinic-administrator/procedure-types'></Redirect> ); 
        return (  
            <div class='row d-flex justify-content-center'>
            <div class='col-md-3'> 
                <div>
                    <h5>Create a procedure type</h5>
                </div>
                <form onSubmit={this.handleSubmit}> 
                <div className={`form-group ${this.state.errorName? 'has-danger': ''}`}>
                            <label class="form-control-label" for="name">name:</label>
                            <input type='text' name='name' id='name' className={`form-control ${this.state.errorName? 'is-invalid': 'is-valid'}`} value={this.state.name} onChange={this.handlerChange} />
                            {(this.state.errorName) && <div class="invalid-feedback"> Procedure type name already exists. </div>}
                        </div>

                        <div className={`form-group ${this.state.errorPrice? 'has-danger': ''}`}>
                            <label class="form-control-label" for="price">price:</label>
                            <input type='number' min="1" name='price' id='price' className={`form-control ${this.state.errorPrice? 'is-invalid': 'is-valid'}`} value={this.state.price} onChange={this.handlerChange} />
                        </div>

                        <div className={`form-group ${this.state.errorDuration? 'has-danger': ''}`}>
                            <label class="form-control-label" for="duration">duration:</label>
                            <TimePicker name='duration' id='duration' onChange={this.handleChangeTime} locale="sv-sv" value={this.state.duration} className={`form-control ${this.state.errorDuration? 'is-invalid': 'is-valid'}`}/>
                        </div>

                        <div>
                            <label class="form-control-label" for="operation">is operation:</label>
                            <Checkbox checked={this.state.operation} name='operation' value='operation' onChange={this.handleChecked} />
                        </div>
                    <div class="form-group row">
                        <div class='col-md text-left'>
                            <input type="submit" class="btn btn-success" disabled={this.state.errorName || this.state.errorPrice || this.state.errorDuration} value="submit"/>
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
 
export default NewProcedureType;