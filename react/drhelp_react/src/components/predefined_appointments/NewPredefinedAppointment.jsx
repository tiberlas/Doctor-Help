import React, { Component } from 'react';
import {ClinicAdminContext} from '../../context/ClinicAdminContextProvider';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class NewPredefinedAppointment extends Component {
    state = {
        dateAndTime: '',
        procedureTypeId: 0,
        roomId: 0, 
        doctorId: 0,
        price: 0,
        disscount: 0,

        roomList: [],
        doctorList: [],
        procedureList: [],

        errorDisscount: true,
        errorPrice: true,
        go_profile: false 
    }

    static contextType = ClinicAdminContext

    componentDidMount() {
        axios.get('http://localhost:8080/api/doctors/clinic='+this.context.admin.clinicId+'/all')
            .then(response => {
                this.setState({doctorList: response.data})
            })

        axios.get('http://localhost:8080/api/rooms/clinic='+this.context.admin.clinicId+'/all')
            .then(response => {
                this.setState({roomList: response.data})
            })

        axios.get('http://localhost:8080/api/procedure+types/all')
            .then(response => {
                this.setState({procedureList: response.data})
            })
    }
    
    handleValidation = () => {
        this.setState({errorDisscount: false, errorPrice: false}, () => {

            if(this.state.price === null || this.state.price === '' || this.state.price < 1) {
                this.setState({errorPrice: true});
            }
            
            if(this.state.disscount === null || this.state.disscount === '' || this.state.disscount < 0 || this.state.disscount > 100) {
                this.setState({errorDisscount: true});
            }
        })
    }

    handlerChange = (event) => {
        let nam = event.target.name
        let val = event.target.value
        console.log(event.target)
        this.setState({[nam]: val}, () => { this.handleValidation()})
    }

    createDoctorItems() {
        let items = []; 
        var size = Object.keys(this.state.doctorList).length;
        for (let i = 0; i < size; i++) {             
             items.push(<option key={i} name='doctorId' value={this.state.doctorList[i].id}> dr. {this.state.doctorList[i].lasttName} {this.state.doctorList[i].firstName} </option>);   
             //here I will be creating my options dynamically based on
             //what props are currently passed to the parent component
        }
        return items;
    }  

    createRoomItems() {
        let items = []; 
        var size = Object.keys(this.state.roomList).length;
        for (let i = 0; i < size; i++) {             
             items.push(<option key={i} name='procedureTypeId' value={this.state.roomList[i].id}>{this.state.roomList[i].name} {this.state.roomList[i].number} </option>);   
             //here I will be creating my options dynamically based on
             //what props are currently passed to the parent component
        }
        return items;
    } 

    createProcedureItems() {
        let items = []; 
        var size = Object.keys(this.state.procedureList).length;
        for (let i = 0; i < size; i++) {             
             items.push(<option key={i} name = "room" value={this.state.procedureList[i].id}>{this.state.procedureList[i].name}</option>);   
             //here I will be creating my options dynamically based on
             //what props are currently passed to the parent component
        }
        return items;
    } 

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/api/procedure+types/new+procedure+type', {
            
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
                    <h5>Create a predefined appointment</h5>
                </div>
                <form onSubmit={this.handleSubmit}> 

                        <div>
                            <label>appointment type</label>
                            <select name='procedureTypeId' onChange={this.handleChange}>
                                {this.createProcedureItems()}
                            </select>
                        </div>

                        <div>
                        <label>doctor</label>
                            <select name='doctorId' onChange={this.handleChange}>
                                {this.createDoctorItems()}
                            </select>
                        </div>

                        <div>
                        <label>room</label>
                            <select name="roomId" onChange={this.handleChange}>
                                {this.createRoomItems()}
                            </select>
                        </div>

                        <div className={`form-group ${this.state.errorPrice? 'has-danger': ''}`}>
                            <label class="form-control-label" for="price">price:</label>
                            <input type='number' min="1" name='price' id='price' className={`form-control ${this.state.errorPrice? 'is-invalid': 'is-valid'}`} value={this.state.price} onChange={this.handlerChange} />
                        </div>

                        <div className={`form-group ${this.state.errorDisscount? 'has-danger': ''}`}>
                            <label class="form-control-label" for="price">disscount:</label>
                            <input type='number' min="0" max="100" name='disscount' id='disscount' className={`form-control ${this.state.errorDisscount? 'is-invalid': 'is-valid'}`} value={this.state.disscount} onChange={this.handlerChange} />
                        </div>
                    <div class="form-group row">
                        <div class='col-md text-left'>
                            <input type="submit" class="btn btn-success" disabled={this.state.errorPrice || this.state.errorDisscount} value="submit"/>
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