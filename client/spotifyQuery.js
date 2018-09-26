import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

function createResultObj(response, reqType) {
  if (reqType === 'Artist') {
    const { items } = response.artists;
    const artistArr = items.map(item => ({
      name: item.name,
      spotify: item.external_urls.spotify,
      imgUrl: item.images.length > 0 ? item.images[1].url : null,
      genres: item.genres[0],
      followers: item.followers.total,
    }));

    return artistArr;
  }

  if (reqType === 'Track') {
    const { items } = response.tracks;
    const tracksArr = items.map(item => ({
      artist: item.artists[0].name,
      artistLink: item.artists[0].external_urls.spotify,
      name: item.name,
      album: item.album.name,
      spotify: item.external_urls.spotify,
      imgUrl: item.album.images.length > 0 ? item.album.images[1].url : null,
    }));
    return tracksArr;
  }

  return [];
}


export default createResultObj;
