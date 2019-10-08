import React from 'react';

import Movie from './movie';

export default class MovieList extends React.Component {
	render(){
		return (
			<div className='movieList'>
				{
					this.props.movies.map(movie => {
						return <Movie movie={movie} delete={this.props.delete} key={movie.name}/>
					})
				}
			</div>
		)
	}
}