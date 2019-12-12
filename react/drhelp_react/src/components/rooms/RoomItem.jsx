import React, { Component } from 'react';
import axios from 'axios';

class RoomItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.value.id,
            name: this.props.value.name,
            number: this.props.value.number
        }
    }

    
    onDelite = () => {
        axios.delete("http://localhost:8080/api/rooms/delete/id="+this.state.id)
        .then(response => {
            this.props.handleUpdate();
        })
    };

    onChange = () => {
        
    }

    render() { 
        return ( 
            <span>
                <h3>{this.state.name}</h3>&nbsp;
                number: {this.state.number}&nbsp;
                <button onClick={this.onDelite} class='btn btn-danger'>delete</button>&nbsp;
                <button onClick={this.onChange} class='btn btn-info'>change</button>
            </span>
         );
    }
}
export default RoomItem;