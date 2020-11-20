import React from 'react';
import './Business.css';

class Business extends React.Component {
    render() {
        return (
            <div className="Business">
                <div className="image-container">
                    <img src={this.props.business.imageSrc} alt={this.props.business.name} />
                </div>
                <h2>{this.props.business.name}</h2>
                <div className="Business-information">
                    <div className="Business-address">
                        <a
                            href={`https://www.google.com/maps/@${this.props.business.lat},${this.props.business.lon},21z`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {this.props.business.address}
                        </a>
                        <p>{this.props.business.city}</p>
                        <p>
                            {this.props.business.state} {this.props.business.zipCode}
                        </p>
                    </div>
                    <div class="Business-reviews">
                        <h3>{this.props.business.category}</h3>
                        <h3 class="rating">{this.props.business.rating} stars</h3>
                        <p>{this.props.business.reviewCount} reviews</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Business;
