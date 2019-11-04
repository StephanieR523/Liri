

require("dotenv").config();
// var axios = require('axios');
var keys = require('./keys.js');
var request = require('request');
var Spotify = require('node-spotify-api');
var fs = require('fs');
console.log(keys.spotify)
var spotify = new Spotify(keys.spotify);

//Stored argument's array
var nodeArgv = process.argv;
var command = process.argv[2];
//movie or song
var x = "";
//attaches multiple word arguments
for (var i=3; i<nodeArgv.length; i++){
  if(i>3 && i<nodeArgv.length){
    x = x + "+" + nodeArgv[i];
  } else{
    x = x + nodeArgv[i];
  }
}

pick(command, x)

function pick(command, x) {
//switch case
switch(command){


  case "spotify-this-song":
    if(x){
      spotifySong(x);
    } else{
      spotifySong("Oops I Did It Again");
    }
  break;

  case "movie-this":
    if(x){
      omdbData(x)
    } else{
      omdbData("Titanic")
    }
  break;

  case "do-what-it-says":
    doThing();
  break;

  default:
    console.log("{Please enter a command: spotify-this-song, movie-this, do-what-it-says}");
;
}
};
function spotifySong(song){
  spotify.search({ type: 'track', query: song}, function(error, data){
    if(!error){
      // console.log(data.tracks)
      // console.log(data)
      for(var i = 0; i < data.tracks.items.length; i++){
        var songData = data.tracks.items[i];
        //artist
        console.log("Artist: " + songData.artists[0].name);
        //song name
        console.log("Song: " + songData.name);
        //spotify preview link
        console.log("Preview URL: " + songData.preview_url);
        //album name
        console.log("Album: " + songData.album.name);
        console.log("-----------------------");
        
        //adds text to log.txt
        fs.appendFile('log.txt', songData.artists[0].name);
        fs.appendFile('log.txt', songData.name);
        fs.appendFile('log.txt', songData.preview_url);
        fs.appendFile('log.txt', songData.album.name);
        fs.appendFile('log.txt', "-----------------------");
      }
    } else{
      console.log('Error occurred.');
    }
  });
}

function omdbData(movie){
  var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&plot=short&tomatoes=true' + '&apikey=trilogy';

  request(omdbURL, function (error, response, body){
    console.log(response.statusCode)
    if(!error && response.statusCode == 200){
      var body = JSON.parse(body);

      console.log("Title: " + body.Title);
      console.log("Release Year: " + body.Year);
      console.log("IMdB Rating: " + body.imdbRating);
      console.log("Country: " + body.Country);
      console.log("Language: " + body.Language);
      console.log("Plot: " + body.Plot);
      console.log("Actors: " + body.Actors);
      console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
      console.log("Rotten Tomatoes URL: " + body.tomatoURL);

      //adds text to log.txt
      appendText('log.txt', "Title: " + body.Title);
      appendText('log.txt', "Release Year: " + body.Year);
      appendText('log.txt', "IMdB Rating: " + body.imdbRating);
      appendText('log.txt', "Country: " + body.Country);
      appendText('log.txt', "Language: " + body.Language);
      appendText('log.txt', "Plot: " + body.Plot);
      appendText('log.txt', "Actors: " + body.Actors);
      appendText('log.txt', "Rotten Tomatoes Rating: " + body.tomatoRating);
      appendText('log.txt', "Rotten Tomatoes URL: " + body.tomatoURL);

    } else{
      console.log('Error occurred.' + error)
    }

      //adds text to log.txt
      appendText('log.txt', "-----------------------");
    }
 
  );
  };
  function appendText(file, data){
  fs.appendFile(file, data, 'utf8',
  // callback function
  function(err) {
      if (err) throw err;
      // if no error
      console.log("Data is appended to file successfully.")
});
  }


function doThing(){
  fs.readFile('random.txt', "utf8", function(error, data){
    var txt = data.split(',');
    pick(txt[0],txt[1]);
  
  });
};
