import React, { Component } from 'react';
import axios from 'axios';
import ChangeProcedureTypeModal from './ChangeProcedureTypeModal';
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import ModalMessage from '../ModalMessage';
import Checkbox from '@material-ui/core/Checkbox';

class ProcedureTypeItem extends Component {
    state = {
        id: this.props.value.id,
        name: this.props.value.name,
        price: this.props.value.price,
        operation: this.props.value.operation,
        duration: this.props.value.duration,
        modalShow: false,
        messageShow: false,
        message: '',
        title: ''
    }
    
    onDelite = () => {
        axios.delete("http://localhost:8080/api/procedure+types/delete/id="+this.state.id)
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

    update = (rname, rprice, roperation, rduration) => {
        this.setState({name: rname, price: rprice, operation: roperation, duration: rduration, modalShow: false})
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
                <td>{this.state.duration}</td>
                <td><Checkbox checked={this.state.operation} name='operation' value='operation' disabled/></td>
                <td>{this.state.price}</td>
                <td><button onClick={this.onDelite} class='btn btn-danger'>delete</button></td>
                <td>
                    <ButtonToolbar>
                        <Button variant="primary" onClick={this.setModalShow}>
                            change
                        </Button>

                        <ChangeProcedureTypeModal
                            id={this.state.id} 
                            name={this.state.name} 
                            price={this.state.price}
                            duration={this.state.duration}
                            operation={this.state.operation} 
                            handleUpdate={(rname, rprice, roperation, rduration) => this.update(rname, rprice, roperation, rduration)}
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
 
export default ProcedureTypeItem;