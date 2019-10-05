import React from 'react';

export default class Movie extends React.Component {
	render(){
		return (
			<div className='movie'>
				{this.props.movie.name}
			</div>
		)
	}
}