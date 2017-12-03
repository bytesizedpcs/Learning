const react = require('react');

const currentLocation = react.createClass({
  toggleFavorite() {
    this.props.onFavoriteToggle(this.props.address);
  },

  render() {
    const starClassName = 'glyphicon glyphicon-star-empty';

    if (this.props.favorite) {
      starClassName = 'glyphicon glyphicon-star';
    }

    return (
      <div className="col-xs-12 col-md-6 col-md-offset-3 current-location">
        <h4 id="save-location">{ this.props.address }</h4>
        <span className={ starClassName } onClick={ this.toggleFavorite } aria-hidden="true"></span>
      </div>
    );
  }
});

module.exports = currentLocation;
