import React, { Component } from 'react';
import axios from 'axios';

class NewRoomModal extends Component {
    state = {
        number: 0,
        name: '',
        errorNumber: true,
        errorName: true,
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
            this.props.handleUpdate()
        })
    }

    render() { 
        return (  
            <div>
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add new room</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" >
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={this.handleSubmit}> 
                        <div class="modal-body">

                        <div className={`form-group ${this.state.errorName? 'has-danger': ''}`}>
                            <label class="form-control-label" for="name">name:</label>
                            <input type='text' name='name' id='name' className={`form-control ${this.state.errorName? 'is-invalid': ''}`} value={this.state.name} onChange={this.handlerChange} />
                        </div>

                        <div className={`form-group ${this.state.errorNumber? 'has-danger': ''}`}>
                            <label class="form-control-label" for="number">number:</label>
                            <input type='number' name='number' id='number' className={`form-control ${this.state.errorNumber? 'is-invalid': ''}`} value={this.state.number} onChange={this.handlerChange} />
                        </div>

                        </div>
                        <div class="modal-footer">
                            <input type="submit" class="btn btn-primary" disabled={this.state.errorName || this.state.errorNumber} value="submit"/>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" >Close</button>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
        );
    }
}

export default NewRoomModal;