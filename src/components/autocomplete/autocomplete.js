import React from 'react';
import './autocomplete.css';

export class Autocomplete extends React.Component {
    render() {
        return (
            <div className="autocomplete">
                {this.props.suggestions.map((suggestion, index) => {
                    return (
                        <p onClick={this.props.handleClick} key={index}>
                            {suggestion.title}
                        </p>
                    );
                })}
            </div>
        );
    }
}
