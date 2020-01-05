import React, {Component, Fragment}  from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from 'react-bootstrap/Button'


class OverviewTable extends Component {

    state = {
        duration: "",
        dateStart: "",
        time: ""

    }

    componentDidMount() {
        let dateStart = new Date() //display when the appointment started
        let time = dateStart.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")
        time = time.substr(0, time.length - 3)

        let appStart = new Date(this.props.data.start)
        let appEnd = new Date(this.props.data.end)

        var diff = Math.abs(appEnd - appStart)
        var seconds = Math.floor((diff/1000));

        this.setState({
            dateStart: dateStart.toLocaleDateString("en-US"),
            time: time
        })
        this.secondsToHms(seconds)
        // let duration = new Date(this.props.data.end)
        // duration = duration.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")
        // duration = duration.substr(0, duration.length-3)
        console.log(this.state.duration)  
    }

    secondsToHms = (d) => { //calculate the expected duration of the appointment
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
    
        var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";

        if(h > 0 && m === 0) {
            hDisplay = h + (h==1 ? "hour " : " hours ")
        }

        let duration = hDisplay + mDisplay
        this.setState({duration: duration})

    }

    render() {
        
        return(
            <div class="row d-flex justify-content-center">
                <div class='col-md-11'>
                <table class="table table-hover">
                    <tbody>
                        <tr>
                            <th scope="row">Date: </th>
                                <td>{this.state.dateStart} at {this.state.time}</td>
                        </tr>
                        <tr>
                            <th scope="row">Type: </th>
                            <td>{this.props.data.procedure}</td>
                        </tr>
                        <tr>
                            <th scope="row">Expected duration: </th>
                                <td>{this.state.duration}</td>
                        </tr>
                        <tr>
                            <th scope="row">Price with discount: </th>
                                <td>{this.props.data.price * (1 - (this.props.data.discount / 100))}</td>
                        </tr>
                    </tbody>
                </table> 
                </div>
            </div>
        )
    }
}

export default OverviewTable