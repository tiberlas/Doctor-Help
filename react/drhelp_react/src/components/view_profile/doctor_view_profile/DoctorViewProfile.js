import React, {Fragment} from 'react'
import DoctorCalendar from '../../doctor/DoctorCalendar'


class DoctorViewProfile extends React.Component {
    
    state = {
        doctor: {}
    }

    componentWillReceiveProps = (props) => {
        console.log('patient', props.patient)
        console.log('doctor', props.doctor)
        this.setState({doctor: props.doctor})
        //fetch all approved appointments
        //NEXT_SPRINT TODO: if any DONE appointments  exist => you are allowed to show health record
        //health record click => show list calendar with all the fetched data
    }

    render() {
        return (
            <Fragment> 
                <DoctorCalendar medical_staff = {this.state.doctor} regime='profile'/>
            </Fragment> 
        )
    }
}

export default DoctorViewProfile