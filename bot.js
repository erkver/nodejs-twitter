require("dotenv").config();
const twit = require('twit');
const config = require('./config');

const Twitter = new twit(config);

const retweet = () => {
  const params = {
    q: '#nodejs, #Nodejs, #javascript, #JavaScript, #Javascript, #React, #reactjs, #coding',
    result_type: "recent",
    lang: 'en'
  };

  Twitter.get('search/tweets', params, (err, data) => {
    if(!err) {
      let retweetId = data.statuses[0].id_str;
      Twitter.post('/statuses/retweet/:id', {
        id: retweetId
      }, (err, res) => {
        if(res) {
          console.log("RT");
        }
        if(err) {
          console.log('Something went wrond during RT - ', err)
        }
      });
    }
    else {
      console.log('Something went wrong during search');
    }
  });
} 

const favTweet = () => {
  const params = {
    q: '#nodejs, #Nodejs, #javascript, #JavaScript, #Javascript, #React, #reactjs, #coding',
    result_type: "recent, popular",
    lang: 'en'
  };

  Twitter.get('search/tweets', params, (err, data) => {
    let tweet = data.statuses;
    let randomTweet = random(tweet);

    if(typeof randomTweet != 'undefined') {
      Twitter.post('favorites/create', {id: randomTweet.id_str}, (err, res) => {
        if(err) {
          console.log('Connot be favorited - ', err)
        } else {
          console.log("Great success!");
        }
      });
    }
  });
}

const random = arr => {
  let index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

setInterval(favTweet, 1800000);
setInterval(retweet, 7200000);