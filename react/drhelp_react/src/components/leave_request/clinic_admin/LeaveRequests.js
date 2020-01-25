import React, {Fragment} from 'react'
import axios from 'axios'
import LeaveRequestItem from './LeaveRequestItem'
import LeaveRequestStaffModal from './LeaveRequestStaffModal'

class LeaveRequests extends React.Component {

    state = {
        leaveRequests: [],
        showRequestModal: false,
        selectedRequest: {}
    }


     componentDidMount = () => {
        // this._isMounted = true

        axios.get('http://localhost:8080/api/leave-requests/get-admin',)
        .then(res =>  {
            this.setState({leaveRequests: res.data})
        })
        .catch(err => 
            console.log(err)
        )
    }



    toggle = () =>{
        this.setState({showRequestModal: !this.state.showRequestModal})
    }

    setRequestSelected = (request) => {
        this.setState({selectedRequest: request, showRequestModal: true}, () => {
        })
    }

    update = () => {
        
    }


    render() {
        let size = 1 //fali size
        return (<Fragment>
               <div> 
                <br/>
                <br/>
                    <div class="row d-flex justify-content-center">
                        <div class='col-md-3'>
                            <h3> Leave requests</h3>
                        </div>  
                    </div>

                <div class="row d-flex justify-content-center">
                <div class='col-md-11'>
                 <br/>

                 {size == 0 ? <div> <br/> <br/> <h4> No new requests at the moment. </h4> </div> : <Fragment> 
                <table class="table table-hover">
                        <thead> 
                            <tr >
                                <th class="text-success" scope="row">
                                    Full name
                                </th>
                                <th class="text-success" scope="row">
                                    Role
                                </th>
                                <th class="text-success" scope="row">
                                    Leave type
                                </th>
                                <th class="text-success" scope="row">
                                    From
                                </th>
                                <th class="text-success" scope="row">
                                    Until
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.leaveRequests.map( request => (
                               <LeaveRequestItem key={request.staffId} userRequest = {request} setRequestSelected={this.setRequestSelected}/>
                            ))}
                        </tbody>
                    </table> </Fragment>   }

                   {this.state.showRequestModal && <LeaveRequestStaffModal modal={this.state.showRequestModal}
                                 toggle={this.toggle}
                                 request={this.state.selectedRequest}
                            update = {this.update}/> }
                    
                    </div> 
                </div>
                </div>
        </Fragment>)
    }
}
export default LeaveRequests