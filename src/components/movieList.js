import React from 'react';

import Movie from './movie';

export default class MovieList extends React.Component {
	render(){
		return (
			<div className='movieList'>
				{
					this.props.movies.map(movie => {
						return <Movie movie={movie} key={movie.name}/>
					})
				}
			</div>
		)
	}
}