import React, { Fragment } from 'react'
import DiagnosesOverview from './dashboard/diagnoses/DiagnosesOverview'
import MedicationOverview from './dashboard/medication/MedicationOverview'

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