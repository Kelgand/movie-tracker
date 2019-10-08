import React from 'react';

export default class NumberToShow extends React.Component {
	render(){
		return (
			<select onChange={(e) => this.props.onChange(e)} defaultValue="25">
				<option value="25">25</option>
				<option value="50">50</option>
				<option value="100">100</option>
				<option value="500">500</option>
			</select>
		)
	}
}