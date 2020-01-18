import React, {Fragment} from 'react'
import NurseRequestCalendar from './NurseRequestCalendar'


class NurseLeaveRequest extends React.Component {

  

    render() {
        return(
            <Fragment> 
                  <div class="row d-flex justify-content-center">
                    <div class='col-md-4'>

                    </div>

                    <div class='col-md-6'> 
                        <NurseRequestCalendar />
                    </div>
                  </div>
            </Fragment>
        )
    }
}


export default NurseLeaveRequest