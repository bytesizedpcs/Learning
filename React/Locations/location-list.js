const react = require('react');
const locationItem = require('./location-item');

const locationList = react.createClass({
  render() {
    const locations = this.props.locations.map((location) => {
      const active = this.props.activeLocationAddress === location.address;

      return <locationItem address={ location.address } timestamp={ location.timestamp }
        active={ active } onClick={ this.props.onClick } />
    });

    if (!locations.length) {
      return null;
    }
    
    return (
      <div className="list-group col-xs-12 col-md-6 col-md-offset-3">
        <span className="list-group-item active">Saved Locations</span>
        { locations }
      </div>
    );
  }
});

module.exports = locationList;
