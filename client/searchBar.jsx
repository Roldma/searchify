import React from 'react';
import {Component} from 'react';
import {render} from 'react-dom';
import SearchResults from './searchResults.jsx'
import SpotifyWebApi from 'spotify-web-api-js';
import createResultObj from './spotifyQuery.js';
const spotifyApi = new SpotifyWebApi();

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: '',
      finalStr: '',
      selectedOption: 'Track',
      queryResults: [],
      // trackResults: []
    };
    this.textFill = this.textFill.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  componentDidMount() {
    this.setState({selectedOption: "Track"});
  }
  // ** radio button handler
  handleOptionChange(e) {
    this.setState({ selectedOption: e.target.value });
  }
  //** search field handler
  textFill(e) {
    this.setState({ textInput: e.target.value });
  }

  handleSubmit(e) {
    //** Set state to final string in field on submit
    this.setState({finalStr: this.state.textInput});
    switch (this.state.selectedOption) {
      case 'Artist':
        spotifyApi.searchArtists(this.state.finalStr)
         .then((res) => {
            // ** Set state to object created by spotify query file
            this.setState({
              queryResults: createResultObj(res, this.state.selectedOption)
            });
          }).catch(err => console.log(err));
        break;

      case 'Track':
        spotifyApi.searchTracks(this.state.finalStr)
         .then((res) => {
           console.log(res, 'sads')
           this.setState({
             queryResults: createResultObj(res, this.state.selectedOption)
           });
        }).catch(err => console.log(err));
        break;

      default:
        break;
    }
    e.preventDefault();
  }

  render() {
    return (
      <div className='searchBar'>
        <form onSubmit={this.handleSubmit}>
        <div>
          <label id='rb'>
            <input type="radio" value="Track"
             checked={this.state.selectedOption === "Track"}
             onChange={this.handleOptionChange}/>
            Track
          </label>
          <label id='rb'>
            <input  type="radio" value="Artist"
             checked={this.state.selectedOption === "Artist"}
             onChange={this.handleOptionChange}/>
            Artist
          </label>
          </div>
        <input className="searchBar" type="text" value={this.state.value} onChange={this.textFill}/>
        <div id="searchDiv"><input className='searchButt' type='submit' value='Search'/></div>
      </form>
      <ul>
        <SearchResults qResults={this.state.queryResults}
          searchSelect={this.state.selectedOption}/>
      </ul>
      </div>
    );
  }
}


export default SearchBar;
