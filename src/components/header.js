import React from 'react';

export default class AddNew extends React.Component {
	
	addNew(){
		let inputField = document.getElementById('newMovie');
		if(inputField.value){
			this.props.addNew(inputField.value);
			inputField.value = '';
		}
	}
	
	handleEnterPress(e){
		if(e.key === 'Enter'){
			this.addNew();
		}
	}
	
	render(){
		return (
			<div className='addNew'>
				<input type='text' id='newMovie' onKeyDown={(e) => this.handleEnterPress(e) } />
				<button id='addNewMovie' onClick={() => this.addNew()}>Add New</button>
			</div>
		)
	}
}