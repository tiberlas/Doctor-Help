import React, { Component } from 'react';

class MedicalStuffItem extends Component {
    render() { 
        return ( 
            <tr>
                <td>{this.props.value.firstName}</td>
                <td>{this.props.value.lastName}</td>
                <td>{this.props.value.role}</td>
            </tr>
         );
    }
}
 
export default MedicalStuffItem;