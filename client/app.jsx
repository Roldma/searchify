import React from 'react';
import {Component} from 'react';
import {render} from 'react-dom';
import SearchBar from './searchBar.jsx';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    this.state = {
      token: token
    }
    if (this.state.token) spotifyApi.setAccessToken(token);
  }

  getHashParams() {
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  checkSDKPlayer() {
    const {token} = this.state;
    if (window.Spotify !== null) {
      this.player = new window.Spotify.Player({
        name: "SDK Spotify Player",
        getOAuthToken: cb => { cb(token); }
      });
      this.player.connect();
    }
  }

  render() {
    return (
      <div id='parent'>
        <form action='http://localhost:8888'>
        <input id='loginButt' type='submit' value='Login to Spotify'></input>
        </form>
        <SearchBar />
      </div>

    );
  }
}





export default App;
