import React, {Component} from 'react'
import CentreAdminChangePassword from './centre_admin/CentreAdminChangePassword';


class FirstTimePasswordChange extends Component {

    render() {
        if(this.props.role === 'CENTRE_ADMINISTRATOR' || this.props.role === 'centreAdmin') {
            alert('bigboy')
            return(
                <div>
                    <h1>>Password change </h1>
                    <CentreAdminChangePassword />
                </div>
            )
        } else 
            return(
                <div>
                    <h1>>Work in progress </h1>
                    {/* <CentreAdminChangePassword /> */}
                </div>
            )
        
    }
}

export default FirstTimePasswordChange