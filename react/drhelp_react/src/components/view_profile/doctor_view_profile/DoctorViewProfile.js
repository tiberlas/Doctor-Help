import React, {Fragment} from 'react'
import DoctorCalendar from '../../doctor/DoctorCalendar'
import ViewProfile from '../../ViewProfile';
import Button from 'react-bootstrap/Button'
import {Route, Link, Redirect} from "react-router-dom";
import ShowMedicalStaffHealthRecord from '../../health_record/ShowMedicalStaffHealthRecord'
class DoctorViewProfile extends React.Component {
    
    state = {
        doctor: {},
        displayHealthRecord: false
    }

    componentWillReceiveProps = (props) => {
        this.setState({doctor: props.doctor}) //mora se refaktorisati da radi sa kontekstom...
    }

    render() {
        return (
            <Fragment>
                 <div class="row d-flex justify-content-center">
                 <div class='col-md-4'>
                <br/>
                <br/>
				<ViewProfile profile={this.props.patient}/>
                {(this.props.patient.showHealthRecord //ako smes da prikazes health record, i ako dugme vec nije kliknuto, prikazi health-record dugme
                        && !this.state.displayHealthRecord) 
                        && <Button className="btn btn-success" onClick={()=>{this.setState({displayHealthRecord: true})}}> Health record</Button>}
                </div>
                <div class="col-md-6">
                <br/>
                <br/>
                        {this.state.displayHealthRecord ? <ShowMedicalStaffHealthRecord patient = {this.props.patient}/> 
                                                        : <DoctorCalendar medical_staff = {this.state.doctor} regime='profile'/>}
                    </div>

                </div>
               

                {/* <div class="row d-flex justify-content-center">
                    <div class="col-md-4">
                    
                    </div>

                    <div class="col-md-6">
                    <DoctorCalendar medical_staff = {this.state.doctor} regime='profile'/>
                    </div>
                </div> */}
            </Fragment> 
        )
    }
}

export default DoctorViewProfile