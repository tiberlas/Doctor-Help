import React, { Component } from 'react';
import RoomItem from './RoomItem';
import { UserContext } from '../../context/UserContextProvider'

class HandlingRooms extends Component {
    
    state = {
        rooms: []
    }

    static contextType = UserContext

    componentDidMount() {
        fetch('http://localhost:8080/api/clinics/'+this.context.user.id+'/rooms', { method: "GET" })
        .then(response => response.json())
        .then(json => {
            this.setState({
                rooms: json.rooms
            })
        })


    }

    render() {

        return ( 
            <div>
                {this.state.rooms.map(c => (
                    <RoomItem key={c.Id} value={c} />
                ))}
            </div>
         );
    }
}
 
export default HandlingRooms;