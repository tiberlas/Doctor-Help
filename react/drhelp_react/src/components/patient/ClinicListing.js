import React, {Component, Fragment}  from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FormControl } from 'react-bootstrap';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';


class ClinicListing extends Component {

	state = {
		clinics: [], 
		activeFilter: 'unfiltered', 
		appointmentTypes: [],
		selectedDate: 'unfiltered', 
		cantReserve : true, 
		types : [], 
		states : [], 
		cities : [], 

		stateFilter: 'unfiltered',
		cityFilter : 'unfiltered',
		addressFilter : 'unfiltered', 
		minRat : 'unfiltered', 
		maxRat : 'unfiltered', 
		minPrice : 'unfiltered', 
		maxPrice : 'unfiltered'
	}

	componentDidMount () {
		axios.get ('http://localhost:8080/api/clinics/listing/proc_type=unfiltered/date=unfiltered/stat=unfiltered/cit=unfiltered/adr=unfiltered/min_rat=unfiltered/max_rat=unfiltered/min_price=unfiltered/max_price=unfiltered')
		.then (response => {
			this.setState ({
				clinics : response.data.clinicList, 
				appointmentTypes : response.data.procedureType, 
				activeFilter  : response.data.procedureTypeString, 
				selectedDate : response.data.dateString, 
				states : response.data.stateList
			})
			let items =[];
			var size = response.data.procedureType.length;
			items.push ({
				label : "-", 
				value : "-"
			})
			for (let i = 0; i < size; ++i) {
				items.push ({
					label : response.data.procedureType[i],
					value : response.data.procedureType[i]
				})
			}

			let itemsState = [];
			let sizeState = response.data.stateList.length;
			itemsState.push ({
				label : "-", 
				value : "-"
			})
			for (let i = 0; i < sizeState; ++i) {
				itemsState.push ({
					label : response.data.stateList[i],
					value : response.data.stateList[i]
				})
			}

			let itemsCity = [];
			let sizeCity = response.data.cityList.length;
			itemsCity.push ({
				label : "-", 
				value : "-"
			})
			for (let i = 0; i < sizeCity; ++i) {
				itemsCity.push ({
					label : response.data.cityList[i],
					value : response.data.cityList[i]
				})
			}

			this.setState ({
				types : items,
				states : itemsState,
				cities : itemsCity
			})
		})
	}

	generateClinicRows(row) {
		let profileUrl = "";// = 'http://localhost:3000';
		if ((this.state.activeFilter !== '') && (this.state.activeFilter !== 'unfiltered')) {
			profileUrl += '/clinic/' + row.id + '/' + this.state.activeFilter;
		} else {
			profileUrl += '/clinic/' + row.id + '/unfiltered';
		}
		profileUrl += '/' + this.state.selectedDate;
		return (
            <Fragment>
                <TableCell width="350px"><Link exact to = {profileUrl} >{row.name}</Link></TableCell>
				<TableCell width="100px"><p class='text-white'>{row.address}</p></TableCell>
				<TableCell width="100px"><p class='text-white'>{row.city}</p></TableCell>
				<TableCell width="50px"><p class='text-white'>{row.state}</p></TableCell>
				<TableCell width="50px"><p class='text-white'>{row.rating}</p></TableCell>
				<TableCell width="75px"><p class='text-white'>{row.price}</p></TableCell>
                <TableCell width="50px">< Link exact to = {profileUrl} hidden={this.state.cantReserve} >Reserve</Link></TableCell>
				{/* <TableCell hidden={this.state.cantReserve}><Form onSubmit={newUrl}><p class='text-white'><Button type="submit" onClick={alert (profileUrl)} >Reserve</Button></p></Form></TableCell> */}
		     </Fragment>
        )
    }

	// goToDoctorListing (row) {
	// 	// alert ("Looking for some doctors?")
	// 	let profileUrl = 'http://localhost:3000' + '/clinic/' + row.id + '/' + this.state.activeFilter + '/' + this.state.selectedDate;
	// 	alert (profileUrl);
	// 	window.location.href = profileUrl;
	// 	// exact to = profileUrl;
	// }


	handleFilterType (text)  {
		text = text.value;
		text = text.replace (' ', '_');
		let element = document.getElementById ("picker");
		let value = element.value;
		if (value === "") {
			value = 'unfiltered'
		}
		if (text === "-") {
			text = 'unfiltered'
		}
		
		this.setState ({
			selectedDate : value,
			activeFilter : text
		});
		
		if ((value === 'unfiltered') || (text === 'unfiltered')) {
			// alert ("Unfiltered =D");
			this.setState ({
				cantReserve : true
			})
		}
		else {
			// alert ("Filtered")
			this.setState ({
				cantReserve : false
			})
		}

		this.fetchData(text, value, this.state.stateFilter, this.state.cityFilter);
	}

	toggleMenu = () => {
		if(!this.state.visible){
		  this.setState({ visible: true, hide: true });
		} else {
		  this.setState({ visible: false, hide: false});
		}
	}



	

	handleFilterDate () {
		
		this.toggleMenu();
		let element = document.getElementById ("picker");
		let value = element.value;
		let text = this.state.activeFilter;
		// text = text.replace (' ', '_');
		
		// alert ("Filter date: " + value + "; Filter type: " + text);
		
		if (value === "") {
			value = "unfiltered";
			// alert ("I am in if")
		}

		// alert ("Filter date: " + value + "; Filter type: " + text);
		this.setState ({
			selectedDate : value,
			activeFilter : text
		})

		if ((value === 'unfiltered') || (text === 'unfiltered')) {
			// alert ("Unfiltered =D");
			this.setState ({
				cantReserve : true
			})
		}
		else {
			// alert ("Filtered")
			this.setState ({
				cantReserve : false
			})
		}

		this.fetchData(text, value, this.state.stateFilter, this.state.cityFilter);

	}

	handleFilterState (text) {
		// alert ("Filtering by state!");
		let str = text.value;
		if (str === '-') {
			str = 'unfiltered'
		} 

		this.toggleMenu();

		this.setState ({
			stateFilter : str
		})
		this.fetchData(this.state.activeFilter, this.state.selectedDate, str, this.state.cityFilter);
	}

	handleFilterCity (text) {
		let str = text.value;
		if (str === '-') {
			str = 'unfiltered'
		}

		this.toggleMenu();

		this.setState ({
			cityFilter : str
		})
		this.fetchData (this.state.activeFilter, this.state.selectedDate, this.state.stateFilter, str);
	}

	fetchData (dil, dat, sFilter, cFilter) {
		// let text = this.state.activeFilter;
		// let date = this.state.selectedDate;
		let requestPartOne = 'http://localhost:8080/api/clinics/listing/proc_type=';
		let requestPartTwo = dil + '/date=' + dat;
		requestPartTwo += '/stat=' + sFilter;
		requestPartTwo += '/cit=' + cFilter;
		requestPartTwo += '/adr=unfiltered/min_rat=unfiltered/max_rat=unfiltered/min_price=unfiltered/max_price=unfiltered';
		let wholeRequest = requestPartOne + requestPartTwo;
		
		axios.get (wholeRequest)
		.then (response => {
			this.setState ({
				clinics: response.data.clinicList, 
				appointmentTypes: response.data.procedureType, 
				
			})
		})
	}

	
	render () {
		let size = this.state.clinics.length;
		let numberOfTypes = this.state.appointmentTypes.length;
		return (
			<div class="row d-flex justify-content-center">
                <div class='col-md-10'>

				

					<Table>
						<TableHead>
							<TableRow>
								<TableCell width="350px">
									<form>
										<Select 
											onChange = {this.handleFilterType.bind(this)}
											options={this.state.types}
										/>
									</form>
								</TableCell>
								<TableCell width="100px">
									<form>
										<FormControl id="picker" type="date" onChange={() => this.handleFilterDate ()}></FormControl>
									</form>
								</TableCell>
								<TableCell width="100px">
									<form>
										<Select 
											onChange = {this.handleFilterState.bind(this)}
											options={this.state.states}
										/>
									</form>
								</TableCell>
								<TableCell width="50px">
									<form>
										<Select 
											onChange = {this.handleFilterCity.bind(this)}
											options={this.state.cities}
										/>
									</form>
								</TableCell>
								<TableCell width="50px"></TableCell>
								<TableCell width="75px"></TableCell>
								<TableCell width="50px"></TableCell>
							</TableRow>
							<TableRow> 
								<TableCell width="350px"><p class='text-success'>Clinic Name</p></TableCell>
								<TableCell width="100px"><p class='text-success'>Address</p></TableCell>
								<TableCell width="100px"><p class='text-success'>City</p></TableCell>
								<TableCell width="50px"><p class='text-success'>State</p></TableCell>
								<TableCell width="50px"><p class='text-success'>Rating</p></TableCell>
								<TableCell width="75px"><p class='text-success'>Price</p></TableCell>
								{/* <TableCell  hidden={this.state.cantReserve}> */}
								<TableCell width="50px"><p class='text-success'>Reserve</p></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{
								size > 0 ? this.state.clinics.map (row => (
									<TableRow key={row.id}>
										{this.generateClinicRows(row)}
									</TableRow>
								)) : <h3> No results found. :( </h3> 
							}
						</TableBody>
					</Table>
				</div>
			</div>
		);
	}

}

export default ClinicListing;