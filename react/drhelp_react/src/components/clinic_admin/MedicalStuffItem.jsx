import React, { Component } from 'react';

class MedicalStuffItem extends Component {
    render() { 
        return ( 
            <span>
                {this.props.value.firstName}&nbsp;{this.props.value.lastName}&nbsp;{this.props.value.role}
            </span>
         );
    }
}
 
export default MedicalStuffItem;