import React, {Component} from 'react';

class ClinicItem extends Component {

	constructor (props) {
		super (props);

		this.state = {
			name: this.props.value.name, 
			address: this.props.value.address, 
			description: this.props.value.description
		}
	}

	render () {
		return (
			<span>
				<h4>{this.state.name}</h4>
			</span>
		);
	}

}

export default ClinicItem;