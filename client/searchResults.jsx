import React from 'react';
import {Component} from 'react';
import {render} from 'react-dom';

// ** Create search results based on search query selector
const SearchResults = (props) => {
  if (props.searchSelect === 'Artist') {
    const artistList = props.qResults.map((itm,ind) => {
      return [<div className='results' key={ind}>
                <img src={itm.imgUrl}/>
                <ul>
                  <li><a href={itm.spotify}>Artist: {itm.name}</a></li>
                  <li key={ind+50}>Followers: {itm.followers}</li>
                  <li>Genres: {itm.genres}</li>
                </ul>
              </div>
             ];
    });
    return <div>{artistList}</div>
  }
  if (props.searchSelect === 'Track') {
    const trackList = props.qResults.map((itm,ind) => {
      return [<div key={ind}>
                <img src={itm.imgUrl}/>
                <ul>
                  <li key={ind+60}><a href={itm.artistLink}>Artist: {itm.artist}</a></li>
                  <li><a href={itm.spotify}>Song Title: {itm.name}</a></li>
                  <li key={ind+50}>Album: {itm.name}</li>
                </ul>
              </div>
             ];
    });
    return <div>{trackList}</div>
  }
}


export default SearchResults;
