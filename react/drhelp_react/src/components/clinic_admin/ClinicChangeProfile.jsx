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
            <div>
            <form onSubmit={this.handleSubmit}>
                <div>
                    <p>Enter clinic's name:</p>
                    <input type='text'name='name' value={this.state.name} onChange={this.handlerChange} />
                    {this.state.errorName && <div>input must not be blank</div>}
                </div>
                <div>
                    <p>Enter clinic's address:</p>
                    <input type='text'name='address' value={this.state.address} onChange={this.handlerChange} />
                    {this.state.errorAddress && <div>input must not be blank</div>}
                </div>
                <div>
                    <p>Enter clinic's description:</p>
                    <textarea name='description' value={this.state.description} onChange={this.handlerChange} />
                    {this.state.errorDescription && <div>input must not be blank</div>}
                </div>
                <div>
                    <input type='submit' value='submit' disabled={this.state.errorName || this.state.errorAddress || this.state.errorDescription}/>
                </div>
            </form>
            </div>
         );
    }
}
 
export default ClinicChangeProfile;