import React, { Fragment } from 'react'
import DiagnosesOverview from '../diagnoses/DiagnosesOverview'
import MedicationOverview from '../medication/MedicationOverview'

class CentreAdminDashboard extends React.Component {

    render() {
        return(
            <Fragment>
                   <div class="row d-flex justify-content-center">
                        <div class='col-md-5'>
                            <DiagnosesOverview/>
                        </div>
                        <div class='col-md-5'>
                             <MedicationOverview/>
                        </div>
                    </div>
            </Fragment>
        )
    }
}

export default CentreAdminDashboard