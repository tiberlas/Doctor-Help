import React, { Component } from 'react';

class ClinicAdministrator extends Component {
    state = { name: "to be added" }

    componentDidMount() {
        fetch('http://localhost:8080/api/clinicAdmins/25/name', { method: "GET" })
        .then(responce => responce.json())
        .then(responce => {
            this.setState({name: responce.firstName + ' ' + responce.lastName})
        });
    }

    render() { 
        return ( <div>
                    Clinic admin&nbsp;{this.state.name}

                </div> );
    }
}
 
export default ClinicAdministrator
;