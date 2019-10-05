import React from 'react';

import MovieList from './components/movieList';
import AddNew from './components/header';
import Pagination from './components/pagination';

export default class App extends React.Component {
	constructor(props){
		super(props);
		
		this.state = {
			movieList: [],
			currentPaginationIndex: 0,
			numberOfMoviesToShow: 25
		}
		
		this.addNewMovie = this.addNewMovie.bind(this);
		this.setPaginationIndex = this.setPaginationIndex.bind(this);
	}

	componentDidMount(){
		fetch('/movies/get')
		.then((data) => {
			return data.json()
		})
		.then(data =>{
			this.setState({
				movieList: data.sort(this.sortMovies)
			});
		})
	}

	sortMovies(a, b){
		let movieAName = parseName(a.name);
		let movieBName = parseName(b.name);
		
		return movieAName.localeCompare(movieBName);

		function parseName(name){
			if(name.slice(0, 4) === "The "){
				name = name.slice(4);
			}
			return name;
		}
	}
	
	addNewMovie(movieName){
		this.setState({
			movieList: [...this.state.movieList, {name: movieName}].sort(this.sortMovies)
		});
	}

	setPaginationIndex(index){
		this.setState({
			currentPaginationIndex: index
		})
	}
	
	render(){
		const { currentPaginationIndex, numberOfMoviesToShow } = this.state;
		const indexToStartFrom = currentPaginationIndex * numberOfMoviesToShow;
		return (
			<div className='container'>
				<header>
					<h1>Movies We Own</h1>
					<h4>...and probably shouldn't buy more copies of</h4>
					<AddNew addNew={this.addNewMovie} />
				</header>
				<Pagination
					totalMovies={this.state.movieList.length}
					currentIndex={this.state.currentPaginationIndex}
					numberToShow={this.state.numberOfMoviesToShow}
					setIndex={this.setPaginationIndex}
				/>
				<MovieList movies={this.state.movieList.slice(indexToStartFrom, indexToStartFrom + numberOfMoviesToShow)} />
				<Pagination
					totalMovies={this.state.movieList.length}
					currentIndex={this.state.currentPaginationIndex}
					numberToShow={this.state.numberOfMoviesToShow}
					setIndex={this.setPaginationIndex}
				/>
			</div>
		)
	}
}