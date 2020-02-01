import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { render, cleanup } from "@testing-library/react";
import RequestedAppointment from "../RequestedAppointment.jsx";
import { ExpansionPanelActions } from "@material-ui/core";

const value = {
	id: 1,
	date: "02/12/2020 14:56",
	procedure: "vadjenje kamenja iz bubrega",
	duration: "01:20",
	doctor: "Pera Peric",
	nurse: "Ana Nasta",
	patient: "Zrtveno Jagnje",
};

afterEach(cleanup);
test("render without crashing", () => {
	const div = document.createElement("div");

	ReactDOM.render(<RequestedAppointment value={value} />, div);
	ReactDOM.unmountComponentAtNode(div);
});

test("matches snapshot", () => {
	const requiredAppointment = renderer
		.create(<RequestedAppointment value={value} />)
		.toJSON();

	expect(requiredAppointment).toMatchSnapshot();
});
