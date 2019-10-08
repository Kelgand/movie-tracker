import React from 'react';

import MovieList from './components/movieList';
import AddNew from './components/addNew';
import Pagination from './components/pagination';
import NumberToShow from './components/numberToShow';
import Filter from './components/filter';
import LoginModal from './components/loginModal';

export default class App extends React.Component {
	constructor(props){
		super(props);
		
		this.state = {
			movieList: [],
			filteredList: [],
			filterString: '',
			currentPaginationIndex: 0,
			numberOfMoviesToShow: 25,
			showModal: false,
			password: '',
			lastAction: {}
		}
		
		this.addNewMovie = this.addNewMovie.bind(this);
		this.deleteMovie = this.deleteMovie.bind(this);
		this.setPaginationIndex = this.setPaginationIndex.bind(this);
		this.changeNumberOfMoviesToShow = this.changeNumberOfMoviesToShow.bind(this);
		this.filterMovies = this.filterMovies.bind(this);
		this.savePassword = this.savePassword.bind(this);
		this.closeModal = this.closeModal.bind(this);
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
		fetch('/movies/add', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				password: this.state.password,
				movie: movieName
			})
		})
		.then(res => res.text())
		.then(res => {
			if(res === "Success"){
				this.setState({
					movieList: [...this.state.movieList, {name: movieName}].sort(this.sortMovies),
					showModal: false
				});
			} else {
				this.setState({
					showModal: true,
					lastAction: {type: 'add', movie: movieName}
				});
			}
		})
	}

	deleteMovie(movieName){
		fetch('/movies/delete', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				password: this.state.password,
				movie: movieName
			})
		})
		.then(res => res.text())
		.then(res => {
			if(res === "Success"){
				this.setState({
					movieList: this.state.movieList.filter(movie => {
						return movie.name !== movieName;
					}),
					showModal: false
				});
			} else {
				this.setState({
					showModal: true,
					lastAction: {type: 'delete', movie: movieName}
				});
			}
		})
	}

	changeNumberOfMoviesToShow(event){
		this.setState({
			currentPaginationIndex: 0,
			numberOfMoviesToShow: parseInt(event.target.value)
		})
	}

	setPaginationIndex(index){
		this.setState({
			currentPaginationIndex: index
		})
	}

	filterMovies(filterString){
		if(filterString === ''){
			this.setState({
				filteredList: [],
				filterString: '',
				currentPaginationIndex: 0
			});
			return;
		}
		let filteredMovies = this.state.movieList.filter(movie => {
			return movie.name.indexOf(filterString) !== -1;
		})

		this.setState({
			filteredList: filteredMovies,
			filterString,
			currentPaginationIndex: 0
		})
	}

	savePassword(password){
		this.setState({
			password: password
		})

		setTimeout(() => {
			if(this.state.lastAction.type === 'delete'){
				this.deleteMovie(this.state.lastAction.movie);
			} else if(this.state.lastAction.type === 'add') {
				this.addNewMovie(this.state.lastAction.movie);
			}
		}, 5)
	}

	closeModal(){
		this.setState({
			showModal: false
		})
	}

	retry(){
		let lastAction = this.state.lastAction;
		if(lastAction.type === "add"){
			this.addNewMovie(lastAction.name);
		} else if (lastAction.type === "delete"){
			this.deleteMovie(lastAction.name);
		}
	}
	
	render(){
		const { currentPaginationIndex, numberOfMoviesToShow } = this.state;
		const indexToStartFrom = currentPaginationIndex * numberOfMoviesToShow;

		let movies = this.state.filteredList.length || this.state.filterString ? this.state.filteredList : this.state.movieList;
		return (
			<div className='container'>
				{this.state.showModal ? <LoginModal savePassword={this.savePassword} closeModal={this.closeModal} /> : null}
				<header>
					<h1>Movies We Own</h1>
					<h4>...and probably shouldn't buy more copies of</h4>
					<div className='utilities'>
						<AddNew addNew={this.addNewMovie} />
						<Filter filter={this.filterMovies} />
						<NumberToShow onChange={this.changeNumberOfMoviesToShow} />
					</div>
				</header>
				<Pagination
					totalMovies={movies.length}
					currentIndex={this.state.currentPaginationIndex}
					numberToShow={this.state.numberOfMoviesToShow}
					setIndex={this.setPaginationIndex}
				/>
				<MovieList 
					movies={movies.slice(indexToStartFrom, indexToStartFrom + numberOfMoviesToShow)} 
					delete={this.deleteMovie}
				/>
				<Pagination
					totalMovies={movies.length}
					currentIndex={this.state.currentPaginationIndex}
					numberToShow={this.state.numberOfMoviesToShow}
					setIndex={this.setPaginationIndex}
				/>
			</div>
		)
	}
}