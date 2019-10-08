import React from 'react';

export default class Filter extends React.Component {
	handleKeyPress(){
		this.props.filter(document.getElementById('filterInput').value);
	}
	
	render(){
		return (
			<div className='filterContainer'>
				<label htmlFor='filterInput'>Filter: </label>
				<input type='text' id='filterInput' onChange={() => this.handleKeyPress() } />
			</div>
		)
	}
}