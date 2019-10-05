//Include axios npm package
const axios = require('axios');
const moment = require('moment');
const fs = require('fs');
const Spotify = require('node-spotify-api');

//Read and Set Environment variables
require("dotenv").config();

//Import keys
const keys = require("./keys.js");

//Access Spotify keys
var spotify = new Spotify(keys.spotify);

const divider = "\n------------------------------------------------------------------------------------\n";

//Get parameters and store it in a variable
let command = process.argv[2];
let search = process.argv[3];

console.log(`Action: ${command}`);
console.log(`Search: ${search}`);

processCommand();

function processCommand() {
    switch(command) {
        case 'concert-this':
            let artist = search;
            if(artist === undefined) {
                artist = "Ace of Base"
            }
            searchConcert(artist);
            break;

        case 'spotify-this-song':
            let song = search;
            if(song === undefined) {
                song = "The Sign"
            }
            searchSong(song);
            break;

        case 'movie-this':
            let movie = search;
            if(movie === undefined) {
                movie = "Mr. Nobody"
            }
            searchMovie(movie);
            break;

        case 'do-what-it-says':
            executeFile();
            break;
    }
}

function searchConcert(artist) {
    let combineArtist = artist.replace(/['"]+/g, '').split(' ').join('+');

    var queryUrl = "https://rest.bandsintown.com/artists/" + combineArtist + "/events?app_id=codingbootcamp";

    axios
        .get(queryUrl)
        .then(function(response) {
            let showData = "Concerts for: " + artist + "\n\n";

            for (const concert of response.data) {
                showData += [
                    "Name of the Venue: " + concert.venue.name,
                    "Venue Location: " + concert.venue.city + ", " + concert.venue.country,
                    "Date of the Event: " + moment(concert.datetime).format("MM/DD/YYYY"),
                    divider
                ].join("\n\n");
            }
            
            console.log(showData);
        })
        .catch(function(error) {
            console.log(error);
        })
}

function searchSong(song) {
    let combinedSong = song.replace(/['"]+/g, '').split(' ').join('+');

    spotify
        .search({ type: 'track', query: combinedSong })
        .then(function(response) {
            let showData = "";
            for (const song of response.tracks.items) {
                let artists = "";

                //Artists is an array of objects
                if (song.artists && song.artists.length > 0) {
                    song.artists.find(function(artist) {
                        artists += artist.name + ", "
                    });
                }

                showData += [
                    "Artist(s): " + artists.replace(/,\s*$/, ''),
                    "Name of Song: " + song.name,
                    "Spotify Song Preview: " + (song.preview_url === null ? "" : song.preview_url),
                    "Album Name: " +  (song.album === null ? "" : song.album.name),
                    divider
                ].join("\n\n");
            }
            
            console.log(showData);
        })
        .catch(function(err) {
            console.log(err);
        });
}

function searchMovie(movie) {
    let combinedMovie = movie.replace(/['"]+/g, '').split(' ').join('+');

    var queryUrl = "http://www.omdbapi.com/?t=" + combinedMovie + "&y=&plot=short&apikey=trilogy";

    axios
        .get(queryUrl)
        .then(function(response) {
            let imdbRating = "";
            let rottenRating = "";

            //Ratings is an array of objects
            if (response.data.Ratings && response.data.Ratings.length > 0) {
                response.data.Ratings.find(function(rating) {
                    if (rating.Source === "Internet Movie Database") {
                        imdbRating = rating.Value;
                    }
                    else if (rating.Source === "Rotten Tomatoes") {
                        rottenRating = rating.Value;
                    }
                });
            }

            let showData = [
                "Movie Title: " + response.data.Title,
                "Year Released: " + response.data.Year,
                "IMDB Rating: " + imdbRating,
                "Rotten Tomatoes Rating: " + rottenRating,
                "Country Where Produced: " + response.data.Country,
                "Language: " + response.data.Language,
                "Plot: " + response.data.Plot,
                "Actors: " + response.data.Actors,
                divider
            ].join("\n\n");
            
            console.log(showData);
        })
        .catch(function(error) {
            console.log(error);
        })
}

function executeFile() {

    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) return console.log(err);

        const lines = data.trim().split('\n');
        
        for(const line of lines) {
            let result = line.split(',')
            command = result[0];
            search = result[1];
            processCommand();
        }
    });
}