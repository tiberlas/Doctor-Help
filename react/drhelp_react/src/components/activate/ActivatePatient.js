import React, { Fragment } from 'react'
import axios from 'axios'
import BasicHeader from './BasicHeader'

class ActivatePatient extends React.Component {


    state = {
        showSuccess: false,
        loading: true
    }

    componentDidMount() {
        fetch('http://localhost:8080/api/patients/confirmAccount', { //mora fetch jer user nema jwt
            method: 'put',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: window.location.href.split('=')[1]
            })}).then(response => {
            console.log('odradio axios')
            this.setState({showSuccess: true, loading: false})
        }).catch(error => {
            console.log('nisam odradio axios')
            this.setState({showSuccess: false, loading: false})
        })
    }

    render() {
        if(this.state.loading) {
            return(<Fragment> 
                 <BasicHeader/>
                 <div class="row d-flex justify-content-center">
                        <div class='col-md-7'>
                        <h2> Loading... </h2>
                        </div>
                 </div>
            </Fragment>)
        }
        return( <Fragment>
            <BasicHeader/>
            <div class="row d-flex justify-content-center">
                <div class='col-md-7'>
                {this.state.showSuccess ?  <Fragment>
                                           <h2>Success.</h2>
                                           <br/>
                                           <span> Your account has been confirmed. <br/>Click the <a href="http://localhost:3000/login"> link </a> 
                                        to log in with your credentials. </span>  
                                        </Fragment> : <Fragment> 
                                                <h2> Error. </h2>
                                                <br/>
                                                <span> Request with email <strong> {this.props.email} </strong>  not found. <br/><a href="http://localhost:3000/login">Back</a> to login page.</span>
                                            </Fragment>}
                  </div>
              </div>
           
        </Fragment>)
    }
}

export default ActivatePatient