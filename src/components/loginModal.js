import React from 'react';

export default class Filter extends React.Component {
	savePassword(){
		this.props.savePassword(document.getElementById('password').value);
	}
	
	render(){
		return (
			<div className='loginModalFullscreen'>
				<div className='loginModalWindow'>
					<div htmlFor='password'>Password:</div>
					<input type='text' id='password' />
					<div>
						<button type='submit' onClick={() => this.savePassword()}>Submit</button>
						<button type='button' onClick={() => this.props.closeModal()}>Cancel</button>
					</div>
				</div>
			</div>
		)
	}
}