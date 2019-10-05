import React from 'react';

export default class Pagination extends React.Component {
	render(){
		const { totalMovies, currentIndex, numberToShow, setIndex } = this.props;
		const totalPages = Math.ceil(totalMovies / numberToShow);

		return (
			<div className='paginationContainer'>
				{
					Array.from({length: totalPages}).map((x, index) => {
						return (
							<div className='paginationLink' onClick={() => setIndex(index)}>{index+1}</div>
						)
					})
				}
			</div>
		)
	}
}