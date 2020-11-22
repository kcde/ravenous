import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { term: '', location: '', sortBy: 'best_match' };
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.sortByOptions = {
            'Best Match': 'best_match',
            'Highest Rated': 'rating',
            'Most Reviewed': 'review_count',
            Distance: 'distance',
        };
    }

    getSortByClass(sortByOption) {
        return sortByOption === this.state.sortBy ? 'active' : '';
    }
    handleSortByChange(sortByOption) {
        this.setState({ sortBy: sortByOption });
        this.handleSearch();
    }

    handleTermChange(e) {
        this.setState({ term: e.target.value });
    }

    handleLocationChange(e) {
        this.setState({ location: e.target.value });
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
                        <input placeholder="Where?" onChange={this.handleLocationChange} />
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
