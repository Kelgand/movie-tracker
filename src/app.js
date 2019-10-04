import React from 'react';

import MovieList from './components/movieList';
import AddNew from './components/header';

export default class App extends React.Component {
	constructor(props){
		super(props);
		
		this.state = {
			movieList: ["movie 1", "movie 2"]
		}
		
		this.addNewMovie = this.addNewMovie.bind(this);
	}
	
	addNewMovie(movieName){
		this.setState({
			movieList: [...this.state.movieList, movieName]
		});
	}
	
	render(){
		return (
			<div className='container'>
				<header>
					<h1>Movies We Own</h1>
					<h4>...and probably shouldn't buy more copies of</h4>
					<AddNew addNew={this.addNewMovie} />
				</header>
				<MovieList movies={this.state.movieList} />
			</div>
		)
	}
}