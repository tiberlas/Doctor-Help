import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class ClinicChangeProfile extends Component {
    state = { 
        name: "",
        address: "",
        description: "",
        errorName: false,
        errorDescription: false,
        errorAddress: false,
        gotoProfile: false,
        errorBack: false,
    }

    componentDidMount() {
        this.handelUpdate()
    }

    handelUpdate = () => {
       axios.get('http://localhost:8080/api/clinics/id='+this.props.clinicId)
       .then(response => {
           this.setState({
               name: response.data.name,
               address: response.data.address,
               description: response.data.description
           })
       })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({gotoProfile: false, errorBack: false})

        axios.put('http://localhost:8080/api/clinics/change', {
                    id: this.props.clinicId,
                    name: this.state.name,
                    description: this.state.description,
                    address: this.state.address,
        }).then( (response) => {
            this.setState({gotoProfile: true})
        }).catch((error) => {
            alert('SOMETHING WENT WRONG./nPLEASE TRY AGAIN')
            this.setState({errorBack: true})
        });
    }

    handlerChange = (event) => {
        this.setState({errorName: false, errorAddress: false, errorDescription: false})

        let nam = event.target.name;
        let val = event.target.value;
        let isValid = this.validateInput(val)

        this.setState({[nam]: val});
        if(isValid === false) {
            if(nam === 'name') {
                this.setState({errorName: true})
            } else if(nam === 'address') {
                this.setState({errorAddress: true})
            } else {
                this.setState({errorDescription: true})
            }
        }
    }

    validateInput(input) {
        if(isNaN(input) == true && input !== '') {
            return true;
        } 

        return false;
    }

    render() {
        if(this.state.gotoProfile === true) {
            return (<Redirect to='/clinic+administrator/clinic'></Redirect>);
        } 
        return ( 
            <div class='row d-flex justify-content-center'>
            <div class='col-md-3'> 
            <form onSubmit={this.handleSubmit}>
                <div className={`form-group ${this.state.errorName? 'has-danger': ''}`}>
                    <label class="form-control-label" for="name">Enter clinic's name:</label>
                    <input type='text'name='name' id='name' className={`form-control ${this.state.errorName? 'is-invalid': ''}`} value={this.state.name} onChange={this.handlerChange} />
                    <div class="invalid-feedback">input must not be blank</div>
                </div>
                <div className={`form-group ${this.state.errorAddress? 'has-danger': ''}`}>
                    <label class="form-control-label" for="address">Enter clinic's address:</label>
                    <input type='text'name='address' id='address' className={`form-control ${this.state.errorAddress? 'is-invalid': ''}`} value={this.state.address} onChange={this.handlerChange} />
                    <div class="invalid-feedback">input must not be blank</div>
                </div>
                <div className={`form-group ${this.state.errorDescription? 'has-danger': ''}`}>
                    <label class="form-control-label" for="description">Enter clinic's description:</label>
                    <input type='text'name='description' id='description' className={`form-control ${this.state.errorDescription? 'is-invalid': ''}`} value={this.state.description} onChange={this.handlerChange} />
                    <div class="invalid-feedback">input must not be blank</div>
                </div>
                <div>
                    <input type='submit' value='submit' class='btn btn-success' disabled={this.state.errorName || this.state.errorAddress || this.state.errorDescription}/>
                </div>
            </form>
            </div>
            </div>
         );
    }
}
 
export default ClinicChangeProfile;