const request = require('request');
const fs = require('fs');

const url = process.argv[2];
const fileRead = process.argv[3];

request(url, (error, response, data) => {
  if (error) { //if there's an error, print the error
    console.log('error:', error);
  } else if (response.statusCode === 404) {
    throw new Error('The URL is invalid. Resource could not be found.');
  } else if (response.statusCode === 500) {
    throw new Error("Something has gone wrong on the web site's server.")
  }
  fs.writeFile(fileRead, data, (error) => {
    if (!error) { //if no error then print the data total to the console
      console.log(`Downloaded and saved ${data.length} bytes to ${fileRead}`);
    } else { //otherwise print the error
      console.log('error:', error);
    }
  });
});