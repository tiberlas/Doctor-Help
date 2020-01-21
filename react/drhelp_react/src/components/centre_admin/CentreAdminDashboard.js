import React, { Fragment } from 'react'
import DiagnosesOverview from '../diagnoses/DiagnosesOverview'

class CentreAdminDashboard extends React.Component {

    render() {
        return(
            <Fragment>
                   <div class="row d-flex justify-content-center">
                        <div class='col-md-7'>
                            <DiagnosesOverview/>
                        </div>
                    </div>
            </Fragment>
        )
    }
}

export default CentreAdminDashboard