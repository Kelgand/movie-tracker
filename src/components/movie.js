import React from 'react';

export default class Movie extends React.Component {
	render(){
		return (
			<div>
				{this.props.movie}
			</div>
		)
	}
}