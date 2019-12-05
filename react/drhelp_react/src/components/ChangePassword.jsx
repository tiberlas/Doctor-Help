import React, { Component } from 'react';

class ChangePassword extends Component {
    state = {
        oldPassword: '',
        newPassword: '',
        newPassword1: '',
        error: true,
        errorBack: false
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.errorBack !== this.props.errorBack) {
            this.setState({errorBack: this.props.errorBack})
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.error === true) {
            return;
        }
        this.setState({error: false})

        if( this.state.error === false ) {

            var data = {
                oldPassword: this.state.oldPassword,
                newPassword: this.state.newPassword,
            }
            this.props.handleSubmit(data)
        }

    }

    validate = () => {
        this.setState({error: false})
        if(!this.state.newPassword1 ||!this.state.newPassword || this.state.newPassword !== this.state.newPassword1) {
            this.setState({error: true})
        }
    }

    handlerChange = (event) => {

        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val}, () => { this.validate()});
    }

    render() { 
        return ( 
            <div class='row d-flex justify-content-center'>
            <div class='col-md-3'>
                <form onSubmit={this.handleSubmit}>

                <div className={`form-group ${this.state.errorBack? 'has-danger': ''}`}>
                    <label class="form-control-label" for="oldPassword">Enter your old password:</label>
                    <input type='password'name='oldPassword' id='oldPassword' className={`form-control ${this.state.errorBack? 'is-invalid': ''}`} onChange={this.handlerChange} />
                    <div class="invalid-feedback">Sorry, current passowrd did not match. Try another?</div>
                </div>

                <div className={`form-group ${this.state.error? 'has-danger': ''}`}>
                    <label class="form-control-label" for="newPassword">Enter your new password:</label>
                    <input type='password'name='newPassword' id='newPassword' className={`form-control ${this.state.error? 'is-invalid': ''}`} onChange={this.handlerChange} />
                </div>
                <div className={`form-group ${this.state.error? 'has-danger': ''}`}>
                    <label class="form-control-label" for="newPassword1">Enter your old password:</label>
                    <input type='password'name='newPassword1' id='newPassword1' className={`form-control ${this.state.error? 'is-invalid': ''}`} onChange={this.handlerChange} />
                    <div class="invalid-feedback">Passwords did not match</div>
                </div>
                <div>
                    <input type='submit' value='submit' className={`btn btn-success ${this.state.error? 'disabled': ''}`}/>
                </div>
                </form>
            </div>
            </div>
         );
    }
}
 
export default ChangePassword;