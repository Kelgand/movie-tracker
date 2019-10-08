import React from 'react';

export default class Pagination extends React.Component {
	render(){
		const { totalMovies, currentIndex, numberToShow, setIndex } = this.props;
		const totalPages = Math.ceil(totalMovies / numberToShow);
		
		return (
			<div className='paginationContainer'>
				{
					totalPages != 0 ?
						Array.from({length: totalPages}).map((x, index) => {
							return (
								<div className='paginationLink' onClick={() => setIndex(index)} key={index}>{index+1}</div>
							)
						})
					:
						<div className='paginationLink'>1</div>
				}
			</div>
		)
	}
}