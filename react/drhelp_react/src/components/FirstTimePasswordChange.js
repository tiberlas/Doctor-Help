import React, {Component} from 'react'
import CentreAdminChangePassword from './centre_admin/CentreAdminChangePassword';
class FirstTimePasswordChange extends Component {

    render() {
        if(this.props.role === 'CENTRE_ADMINISTRATOR')
            return(
                <CentreAdminChangePassword />
            )
    }
}

export default FirstTimePasswordChange