import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { render, fireEvent, cleanup } from "@testing-library/react";
import RoomList from "../RoomList.jsx";
import "@testing-library/jest-dom";
import { shallow } from "enzyme";

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
	const roomList = renderer
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

	expect(roomList).toMatchSnapshot();
});

test("show modal search dialog", () => {
	const { getByTestId, getByText } = render(
		<RoomList
			type="1"
			date="01/23/2020"
			appointmentId="1"
			operationId="4"
			nurse="3"
		/>,
	);

	getByText("search").simulate("click");

	const mockCallBack = jest.fn();

	const button = shallow(
		<RoomList
			type="1"
			date="01/23/2020"
			appointmentId="1"
			operationId="4"
			nurse="3"
		/>,
	);
	button.find("search").simulate("click");

	expect(getByTestId("modalSearch").show).toBeTruthy();
});
