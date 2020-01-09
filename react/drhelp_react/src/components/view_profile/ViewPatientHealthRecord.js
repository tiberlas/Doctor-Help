import React, { Fragment } from 'react'


class ViewPatientHealthRecord extends React.Component {

    componentDidMount() {
        if(this.props.medical_staff.role === 'doctor')
            alert('doca')
    }
    render() {
        return (
            <Fragment>

            </Fragment>
        )
    }
}

export default ViewPatientHealthRecord