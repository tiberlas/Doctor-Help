import React, { Component } from "react";
import { ClinicAdminContext } from "../../context/ClinicAdminContextProvider";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import RequestedAppointmentItem from "../requesting_appointment/RequestedAppointmentItem.jsx";

class ClinicAdminAppointmentRequests extends Component {
	state = {
		appointments: [],
		name: "",
	};

	static contextType = ClinicAdminContext;

	componentDidMount() {
		this.handleGetRequests();
		this.handleClinicName();
	}

	handleGetRequests = () => {
		axios
			.get("http://localhost:8080/api/appointments/requests/all")
			.then((response) => {
				this.setState({ appointments: response.data });
			});
	};

	handleClinicName = () => {
		axios
			.get(
				"http://localhost:8080/api/clinics/id=" +
					this.context.admin.clinicId,
			)
			.then((response) => {
				this.setState({
					name: response.data.name,
				});
			});
	};

	handelUpdate = () => {};

	render() {
		let i = 0;
		return (
			<div class="row d-flex justify-content-center">
				<div class="col-md-7">
					<br />
					<h3>Clinic {this.state.name}</h3>
					<h4>List of requested appointments</h4>
					<br />
					<Table class="table table-hover ">
						<TableHead class="table-active">
							<TableRow class="table-active">
								<TableCell class="text-success cursor-pointer">
									date and time
								</TableCell>
								<TableCell class="text-success cursor-pointer">
									procedure
								</TableCell>
								<TableCell class="text-success cursor-pointer">
									doctor
								</TableCell>
								<TableCell class="text-success cursor-pointer">
									nurse
								</TableCell>
								<TableCell class="text-success cursor-pointer">
									patient
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{this.state.appointments.map((c) => (
								<TableRow
									className={++i % 2 ? `table-dark` : ``}
								>
									<RequestedAppointmentItem
										key={c.id}
										id={c.id}
										value={c}
										handleUpdate={this.handleUpdate}
									/>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		);
	}
}

export default ClinicAdminAppointmentRequests;
