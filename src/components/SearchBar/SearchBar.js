import React from 'react';
import './SearchBar.css';
import { Autocomplete } from '../autocomplete/autocomplete';

import { Yelp } from '../../util/yelp';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            location: '',
            sortBy: 'best_match',
            'autocomplete suggestions': [],
        };
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleAutocompleteClick = this.handleAutocompleteClick.bind(this);
        this.sortByOptions = {
            'Best Match': 'best_match',
            'Highest Rated': 'rating',
            'Most Reviewed': 'review_count',
            Distance: 'distance&radius=3000',
        };
    }

    getSortByClass(sortByOption) {
        return sortByOption === this.state.sortBy ? 'active' : '';
    }
    handleSortByChange(sortByOption) {
        this.setState({ sortBy: sortByOption });
        this.handleSearch();
    }

    // handleLocationClick(){
    //     Yelp.autocomplete()
    // }

    handleTermChange(e) {
        this.setState({ term: e.target.value });
    }

    handleAutocompleteClick(e) {
        this.setState({ location: e.target.textContent });
        this.setState({ 'autocomplete suggestions': [] });
    }

    async handleLocationChange(e) {
        this.setState({ location: e.target.value });
        let suggestions = await Yelp.autocomplete(e.target.value);
        const matches = await suggestions.suggestions.filter((suggestion) => {
            const regex = new RegExp(`^${e.target.value}`, 'gi');
            return suggestion.title.match(regex);
        });
        this.setState({ 'autocomplete suggestions': matches });
    }

    handleSearch(e) {
        if (e !== undefined) {
            this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
            e.preventDefault();
        } else {
            this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
        }
    }

    renderSortByOptions() {
        return Object.keys(this.sortByOptions).map((sortByOption) => {
            const sortByOptionValue = this.sortByOptions[sortByOption];
            return (
                <li
                    className={this.getSortByClass(sortByOptionValue)}
                    key={sortByOptionValue}
                    onClick={this.handleSortByChange.bind(this, sortByOptionValue)}
                >
                    {sortByOption}
                </li>
            );
        });
    }

    render() {
        return (
            <div className="SearchBar">
                <div className="SearchBar-sort-options">
                    <ul>{this.renderSortByOptions()}</ul>
                </div>
                <form>
                    <div className="SearchBar-fields">
                        <input placeholder="Search Businesses" onChange={this.handleTermChange} />
                        <div style={{ position: 'relative' }}>
                            <input
                                placeholder="Where?"
                                onChange={this.handleLocationChange}
                                onClick={this.handleLocationClick}
                                value={this.state.location}
                            />

                            <Autocomplete
                                suggestions={this.state['autocomplete suggestions']}
                                handleClick={this.handleAutocompleteClick}
                            />
                        </div>
                    </div>
                    <div className="SearchBar-submit">
                        <button type="submit" key="submit" onClick={this.handleSearch}>
                            Let's Go
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default SearchBar;
