const react = require('react');
const search = require('./search');
const map = require('./map');
const currentLocation = require('./current-location');
const locationList = require('./location-list');

const app = react.createClass({
  /**
   * Initializes the app
   * Returns:
   * Object of favorites, and an initialized location
   */
  getInitialState(){
    const favorites = [];

    // Add any favorites the user has saved
    if (localStorage.favorites) {
      favorites = JSON.parse(locationStorage.favorites);
    }

    // Return object with user's favorites and
    // And initialized location
    return {
      favorites: favorites,
      currentAddress: 'Paris, France',
      mapCoordinates: {
        lat: 48.856614,
        lng: 2.3522219,
      },
    };
  },

  toggleFavorite(address) {
    // gets favorites from app
    const favorites = this.state.favorites;

    // pushes a new address to favorite array
    favorites.push({
      address: address,
      timestamp: Date.now(),
    });

    // Overrides the favorite array
    // With new favorite array
    this.setState({
      favorites: favorites,
    });

    // converts the favorites to JSON
    localStorage.favorites = JSON.stringify(favorites);
  },

  removeFromFavorites(address) {
    const favorites = this.state.favorites;
    let index = -1;

    for (let i = 0; i < favorites.length; i++){
      if (favorites[i].address === address) {
        index = i;
        break;
      }
    }

    if (index !== -1) {
      favorites.splice(index, 1);

      this.setState({
        favorites: favorites,
      });

      localStorage.favorites = JSON.stringify(favorites);
    }
  },

  isAddressInFavorites(address) {
    const favorites = this.state.favorites;

    for (let i = 0; i < favorites.length; i++) {
      if (favorites[i].address === address) {
        return true;
      }
    }

    return false;
  },

  searchForAddress(address) {
    GMaps.geocode({
      address: address,
      callback: (results, status) => {
        if (status !== 'OK') return;

        const latlng = results[0].geometry.location;

        this.setState({
          currentAddress: results[0].formatted_address;
          mapCoordinates: {
            lat: latlng.lat(),
            lng: latlng.lng(),
          }
        });

      }
    });
  },

  render() {
    return (
      <div>
        <h1>Your Google Maps Locations</h1>
        <search onSearch={ this.searchForAddress } />
        <map lat={ this.state.mapCoordinates.lat } lng={ this.state.mapCoordinates.lng } />
        <currentLocation address={ this.state.currentAddress }
          favorite={ this.isAddressInFavorites(this.state.currentAddress )}
          onFavoriteToggle={ this.toggleFavorite } />
        <locationList locations={ this.state.favorites } activeLocationAddress={ this.state.currentAddress }
          onClick={ this.searchForAddress } />
      </div>
    );
  }
});

module.exports = app;
