
class CentreAdminChangeProfile extends Component {
    
    static contextType = CentreAdminContext

    state = {
        go_profile: false,
        id: this.context.admin.id,
        email: this.context.admin.email,
        firstName: this.context.admin.firstName,
        lastName: this.context.admin.lastName,
        address: this.context.admin.address,
        city: this.context.admin.city,
        state: this.context.admin.state,
        phoneNumber: this.context.admin.phoneNumber,
        birthday: this.context.admin.birthday
    }


    handleSubmit = (event) => {
        event.preventDefault();

        axios.put('http://localhost:8080/api/centreAdmins/change', {
                    id: this.state.id,
                    email: this.state.email,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    city: this.state.city,
                    state: this.state.state,
                    phoneNumber: this.state.phoneNumber,
                    birthday: this.state.birthday
        }).then(response => {
            console.log('odgovor');
            console.log(response);
        }).then(
            this.props.handleUpdate,
            this.setState({go_profile: true})
      );
    }

    handlerChange = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
  }

    render() { 
        if(this.state.go_profile == true)
            return (<Redirect to='/centreAdministrator/profile/'></Redirect>);
        return (  
            <form onSubmit={this.handleSubmit}>
                <div>
                    <p>Enter your first name:</p>
                    <input type='text'name='firstName' value={this.state.firstName} onChange={this.handlerChange} />
                </div>
                <div>
                    <p>Enter your last name:</p>
                    <input type='text'name='lastName' value={this.state.lastName} onChange={this.handlerChange} />
                </div>
                <div>
                    <p>Enter your email:</p>
                    <input type='text'name='email' value={this.state.email} onChange={this.handlerChange} />
                </div>
                <div>
                    <p>Enter your state:</p>
                    <input type='text'name='state' value={this.state.state} onChange={this.handlerChange} />
                </div>
                <div>
                    <p>Enter your city:</p>
                    <input type='text'name='city' value={this.state.city} onChange={this.handlerChange} />
                </div>
                <div>
                    <p>Enter your address:</p>
                    <input type='text'name='address' value={this.state.address} onChange={this.handlerChange} />
                </div>
                <div>
                    <p>Enter your phoneNumber:</p>
                    <input type='text'name='phoneNumber' value={this.state.phoneNumber} onChange={this.handlerChange} />
                </div>
                <div>
                    <input type='submit' value='submit'/>
                </div>
            </form>
        );
    }
}
 
export default CentreAdminChangeProfile;