import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import ModalMessage from '../ModalMessage';

class NewRoom extends Component {
    state = {
        number: 0,
        name: '',
        errorNumber: true,
        errorName: true,
        go_profile: false,
        messageShow: false,
        message: '',
        title: '' 
    }
    
    handleValidation = () => {
        this.setState({errorName: false, errorNumber: false})

        if(!this.state.name.trim() || this.state.name.length < 3) {
            this.setState({errorName: true})
        }

        if(this.state.number === 0) {
            this.setState({errorLast: true})
        }
    }

    handlerChange = (event) => {
        let nam = event.target.name
        let val = event.target.value
        this.setState({[nam]: val}, () => { this.handleValidation()})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/api/rooms/new+room', {
                    name: this.state.name,
                    number: parseInt(this.state.number)
        }).then( (response) => {

            this.setState({go_profile: true})
        }).catch((error) => {
            this.setState({
                errorName: true, 
                errorNumber: true, 
                messageShow: true,
                message: 'Could not creste room becouse number is taken. Please try again with a diferent room number!',
                title: 'Some error has occured'
            })
        });
    }

    handleCancel = () => {
        this.setState({go_profile: true})
    }

    setMessageHide= () => {
        this.setState({messageShow: false})
    }

    render() {
        if(this.state.go_profile === true)
            return(<Redirect to='/clinic-administrator/rooms'></Redirect> ); 
        return (  
            <div class='row d-flex justify-content-center'>
            <div class='col-md-3'> 
                <div>
                    <h5>Add new room</h5>
                </div>
                <form onSubmit={this.handleSubmit}> 
                    <div className={`form-group ${this.state.errorName? 'has-danger': ''}`}>
                        <label class="form-control-label" for="name">name:</label>
                        <input type='text' name='name' id='name' className={`form-control ${this.state.errorName? 'is-invalid': ''}`} value={this.state.name} onChange={this.handlerChange} />
                    </div>

                    <div className={`form-group ${this.state.errorNumber? 'has-danger': ''}`}>
                        <label class="form-control-label" for="number">number:</label>
                        <input type='number' name='number' id='number' className={`form-control ${this.state.errorNumber? 'is-invalid': ''}`} value={this.state.number} onChange={this.handlerChange} />
                    </div>
                    <div class="form-group row">
                        <div class='col-md text-left'>
                            <input type="submit" class="btn btn-success" disabled={this.state.errorName || this.state.errorNumber} value="submit"/>
                        </div>
                        <div class='col-md text-right'>
                            <button type="button" class="btn btn-danger" onClick={this.handleCancel}>Cancel</button>
                        </div>
                    </div>
                </form>

                <ModalMessage
                        title={this.state.title}
                        message={this.state.message} 
                        show={this.state.messageShow}
                        onHide={this.setMessageHide}/>
                
            </div>
            </div>
        );
    }
}

export default NewRoom;