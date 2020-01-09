import React, {Fragment} from 'react'
import ViewProfile from '../ViewProfile';
import Button from 'react-bootstrap/Button'
import ShowMedicalStaffHealthRecord from '../health_record/ShowMedicalStaffHealthRecord'


class NurseViewProfile extends React.Component {

    state = {
        nurse: {},
        displayHealthRecord: false
    }

    componentWillReceiveProps = (props) => {
        this.setState({nurse: props.nurse})
        //context mi ne radi :(
    }


    render() {
        return(
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

                    {/* <div class="col-md-6">
                        {this.state.displayHealthRecord ? <ShowMedicalStaffHealthRecord patient = {this.props.patient}/> 
                                                        : <DoctorCalendar medical_staff = {this.state.doctor} regime='profile'/>}
                    </div> */}
                    
                </div>
                

                <div class="row d-flex justify-content-center">
                    <div class="col-md-4">
                            {this.state.displayHealthRecord &&  <h1> hi </h1> }
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default NurseViewProfile