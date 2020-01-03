import React, { Component, Fragment } from 'react';
import axios from 'axios';
import ChangeRoomModal from './ChangeRoomModal';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ModalMessage from '../ModalMessage';
import TableCell from '@material-ui/core/TableCell';
import {Link} from 'react-router-dom';

class RoomItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.value.id,
            name: this.props.value.name,
            number: this.props.value.number,
            type: this.props.value.procedureTypeName,
            typeId: this.props.value.procedureTypeId,
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

    update = (rname, rnumber, rtype, rid) => {
        this.setState({name: rname, number: rnumber, type: rtype, typeId: rid, modalShow: false})
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
            <Fragment>
                <TableCell class='text text-white'>
                    <Link exact to={`/schedule/${this.state.id}`}>
                        {this.state.name}
                     </Link>
                </TableCell>
                <TableCell class='text text-white'>{this.state.number}</TableCell>
                <TableCell class='text text-white'>{this.state.type}</TableCell>
                <TableCell><button onClick={this.onDelite} class='btn btn-danger'>delete</button></TableCell>
                <TableCell>
                    <ButtonToolbar>
                        <Button variant="primary" onClick={this.setModalShow}>
                            change
                        </Button>

                        <ChangeRoomModal
                            id={this.state.id} 
                            name={this.state.name} 
                            number={this.state.number}
                            type={this.state.type}
                            typeId={this.state.typeId} 
                            handleUpdate={(rname, rnumber, rtype, rid) => this.update(rname, rnumber, rtype, rid)}
                            show={this.state.modalShow}
                            onHide={this.setModalHide}
                        />
                    </ButtonToolbar>

                    <ModalMessage
                        title={this.state.title}
                        message={this.state.message} 
                        show={this.state.messageShow}
                        onHide={this.setMessageHide}/>
                </TableCell>

                </Fragment>
         );
    }
}
export default RoomItem;