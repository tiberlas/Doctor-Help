import React, { Component } from 'react';
import axios from 'axios';
import ChangeRoomModal from './ChangeRoomModal';
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import ModalMessage from '../ModalMessage';

class RoomItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.value.id,
            name: this.props.value.name,
            number: this.props.value.number,
            modalShow: false,
            messageShow: false,
            message: '',
            title: ''
        }
    }
    
    onDelite = () => {
        axios.delete("http://localhost:8080/api/rooms/delete/id="+this.state.id)
        .then(response => {
            this.props.handleUpdate(this.state.id);
        }).catch(error => {
            this.setState({
                messageShow: true,
                message: 'Could not delete room. Please reload page and try again!',
                title: 'Some error has occured'
            })
        })
    };

    update = (rname, rnumber) => {
        this.setState({name: rname, number: rnumber, modalShow: false})
    }

    setModalShow = () => {
        this.setState({modalShow: true})
    }

    setModalHide = () => {
        this.setState({modalShow: false})
    }

    setMessageHide= () => {
        this.setState({messageShow: false})
    }

    render() { 

        return ( 
            <tr>
                <td>{this.state.name}</td>
                <td>{this.state.number}</td>
                <td><button onClick={this.onDelite} class='btn btn-danger'>delete</button></td>
                <td>
                    <ButtonToolbar>
                        <Button variant="primary" onClick={this.setModalShow}>
                            change
                        </Button>

                        <ChangeRoomModal
                            id={this.state.id} 
                            name={this.state.name} 
                            number={this.state.number} 
                            handleUpdate={(rname, rnumber) => this.update(rname, rnumber)}
                            show={this.state.modalShow}
                            onHide={this.setModalHide}
                        />
                    </ButtonToolbar>

                    <ModalMessage
                        title={this.state.title}
                        message={this.state.message} 
                        show={this.state.messageShow}
                        onHide={this.setMessageHide}/>
                </td>

            </tr>
         );
    }
}
export default RoomItem;