import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { render, cleanup } from "@testing-library/react";
import ClinicAdminAppointmentRequests from "../ClinicAdminAppointmentRequests.jsx";
import ClinicAdminContextProvider from "../../../context/ClinicAdminContextProvider";
import { ExpansionPanelActions } from "@material-ui/core";

const admin = {
	id: 1,
	firstName: "BORKO",
	lastName: "MOTORKO",
	address: "kineska cetvrt 16",
	state: "bog te pita",
	city: "上海",
	phoneNumber: "064882553",
	email: "borkomotorko16@gamil",
	birthday: "03/06/1993",
	clinicId: 1,
};

afterEach(cleanup);
test("renders without crashing", () => {
	const div = document.createElement("div");

	ReactDOM.render(
		<ClinicAdminContextProvider admin={admin}>
			<ClinicAdminAppointmentRequests />
		</ClinicAdminContextProvider>,
		div,
	);
	ReactDOM.unmountComponentAtNode(div);
});

test("matches snapshot", () => {
	const ClinicAdminAppointemntRequest = renderer
		.create(
			<ClinicAdminContextProvider admin={admin}>
				<ClinicAdminAppointmentRequests />
			</ClinicAdminContextProvider>,
		)
		.toJSON();

	expect(ClinicAdminAppointemntRequest).toMatchSnapshot();
});
