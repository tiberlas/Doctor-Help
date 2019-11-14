import React, { Component } from 'react';

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
        alert("BRISI" + this.state.id)
    };

    render() { 
        return ( 
            <span>
                <h3>{this.state.name}</h3>&nbsp;
                {this.state.number}&nbsp;
                <button onClick={this.onDelite}>delete</button>
            </span>
         );
    }
}
export default RoomItem;