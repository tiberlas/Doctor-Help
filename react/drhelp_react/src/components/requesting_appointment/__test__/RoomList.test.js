import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { render, fireEvent, cleanup } from "@testing-library/react";
import RoomList from "../RoomList.jsx";

afterEach(cleanup);

test("render without crashing", () => {
	const div = document.createElement("div");

	ReactDOM.render(
		<RoomList
			type="1"
			date="01/23/2020"
			appointmentId="1"
			operationId="4"
			nurse="3"
		/>,
		div,
	);
	ReactDOM.unmountComponentAtNode(div);
});

test("matches snapshot", () => {
	const RoomList = renderer
		.create(
			<RoomList
				type="1"
				date="01/23/2020"
				appointmentId="1"
				operationId="4"
				nurse="3"
			/>,
		)
		.toJSON();

	expect(RoomList).toMatchSnapshot();
});

test("show modal search dialog", () => {
	const { getById, modalDialog } = render(
		<RoomList
			type="1"
			date="01/23/2020"
			appointmentId="1"
			operationId="4"
			nurse="3"
		/>,
	);

	fireEvent.click(getById("searchButton"));

	expect(modalDialog("modalSearch").show).toBeTruthy();
});
