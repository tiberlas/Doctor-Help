import React, { Component } from 'react';

class ChangePassword extends Component {
    state = {
        oldPassword: '',
        newPassword: '',
        newPassword1: '',
        error: false,
        errorBack: false
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.errorBack !== this.props.errorBack) {
            this.setState({errorBack: this.props.errorBack})
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({error: false})

        if( this.validate() === true ) {

            var data = {
                oldPassword: this.state.oldPassword,
                newPassword: this.state.newPassword,
            }
            this.props.handleSubmit(data)
        }

    }

    validate = () => {
        if(this.state.newPassword !== this.state.newPassword1) {
            this.setState({error: true})
            return false;
        }

        return true;
    }

    handlerChange = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    render() { 
        return ( 
            <div>
                <form onSubmit={this.handleSubmit}>
                <div>
                    <p>Enter your old password: </p>
                    <input type='password'name='oldPassword' onChange={this.handlerChange} />
                </div>
                {this.state.errorBack && <div>
                    <h3>PASSWORD DID NOT MATCH</h3>
                </div>}
                <div>
                    <p>Enter your new password: </p>
                    <input type='password'name='newPassword' onChange={this.handlerChange} />
                </div>
                <div>
                    <p>Re-enter your new password: </p>
                    <input type='password'name='newPassword1' onChange={this.handlerChange} />
                </div>
                {this.state.error && <div>
                    <h3>PASSWORDS MUST MATCH</h3>
                </div>}
                <div>
                    <input type='submit' value='submit'/>
                </div>
                </form>
            </div>
         );
    }
}
 
export default ChangePassword;