import React, { Component } from 'react';
import axios from 'axios';
import ChangeRoomModal from './ChangeRoomModal';

class RoomItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.value.id,
            name: this.props.value.name,
            number: this.props.value.number,
            isOpen: false
        }
    }

    
    onDelite = () => {
        axios.delete("http://localhost:8080/api/rooms/delete/id="+this.state.id)
        .then(response => {
            this.props.handleUpdate();
        })
    };

    onChange = () => {
        this.setState({isOpen: true})
    }

    showModal = () => {
        this.setState({isOpen: false})
    };

    update = (rname, rnumber) => {
        this.setState({isOpen: false, name: rname, number: rnumber})
    }

    render() { 
        return ( 
            <span>
                <h3>{this.state.name}</h3>&nbsp;
                number: {this.state.number}&nbsp;
                <button onClick={this.onDelite} class='btn btn-danger'>delete</button>&nbsp;
                <button onClick={this.onChange} class='btn btn-info'>change</button>
                <ChangeRoomModal id={this.state.id} name={this.state.name} number={this.state.number} handleUpdate={(rname, rnumber) => this.update(rname, rnumber)} show={this.state.isOpen} close={this.showModal} />
            </span>
         );
    }
}
export default RoomItem;