import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal'

class ChangeRoomModal extends Component {
    state = {
        id: this.props.id,
        number: this.props.number,
        name: this.props.name,
        errorNumber: false,
        errorName: false,
    }
    
    handleValidation = () => {
        this.setState({errorName: false, errorNumber: false})

        if(!this.state.name.trim() || this.state.name.length < 3) {
            this.setState({errorName: true})
        }

        if(this.state.number == undefined || this.state.number == null) {
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
        axios.put('http://localhost:8080/api/rooms/change', {
                    id: this.state.id,            
                    name: this.state.name,
                    number: parseInt(this.state.number)
        }).then( (response) => {
            this.props.handleUpdate(response.data.name, response.data.number)
        }).catch((error) => {
            this.setState({ 
                errorNumber: true
            })
        });
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
                <Modal.Title id="contained-modal-title-vcenter">Change room</Modal.Title>
              </Modal.Header>
                <form onSubmit={this.handleSubmit}> 
                    <Modal.Body>
                        <div className={`form-group ${this.state.errorName? 'has-danger': ''}`}>
                            <label class="form-control-label" for="name">name:</label>
                            <input type='text' name='name' id='name' className={`form-control ${this.state.errorName? 'is-invalid': 'is-valid'}`} value={this.state.name} onChange={this.handlerChange} />
                        </div>

                        <div className={`form-group ${this.state.errorNumber? 'has-danger': ''}`}>
                            <label class="form-control-label" for="number">number:</label>
                            <input type='number' name='number' id='number' className={`form-control ${this.state.errorNumber? 'is-invalid': 'is-valid'}`} value={this.state.number} onChange={this.handlerChange} />
                            {(this.state.errorNumber) && <div class="invalid-feedback"> Room number already exists. </div>}
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <input type="submit" class="btn btn-primary" disabled={this.state.errorName || this.state.errorNumber} value="submit"/>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={this.props.onHide}>Close</button>
                    </Modal.Footer>
                </form>
            </Modal>
          );
    }
}

export default ChangeRoomModal;