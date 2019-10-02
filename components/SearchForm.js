import React, { useState, useContext } from 'react';

const SearchContext = React.createContext()

const SearchForm = (props) => {
	const [searchText, setSearchText] = useState('')

	const handleSubmit = e => {
		e.preventDefault();
		props.onSearch(searchText);
		e.currentTarget.reset();
	};

	const handleClick = (e) => {
		e.preventDefault()
		setSearchText('')
		props.onClick1();
	};
	
	return (
		<SearchContext.Provider value={[searchText, setSearchText]}>
		<form className="search-form" onSubmit={handleSubmit}>
			<label className="is-hidden" htmlFor="search">Search</label>
			<input
				type="search"
				onChange={e => setSearchText(e.target.value)}
				name="search"
				placeholder={searchText}
			/>
			<button type="submit" id="submit" className="search-button">
				<i className="material-icons icn-search">search</i>
			</button>
			<button id="clr"  onClick={e =>  handleClick(e) } >
				<i className="material-icons icn-search">begin</i>
			</button>
		</form>
		</SearchContext.Provider>
	);
	
}

export default SearchForm