
const pool = require('../modules/pool');
var request = require("request"); //this is the request for authorization access token
require('dotenv').config();
const axios = require('axios');

/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */
var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var client_id = '65413'; // Your client id
var client_secret = process.env.CLIENT_SECRET_WORDPRESS; // Your secret
var redirect_uri = 'http://localhost:5000/wordpress/callback_wordpress'; // Your redirect uri
// note redirect uri is only for local development not for heroku

const router = express.Router();

router.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());

router.get('/callback_wordpress', function(req, res) {

  console.log('logging req.query', req.query.code) // this pulls from the url and gives us the auth code
  // that we will trade in for the auth token.
  var authOptions = {
    url: 'https://public-api.wordpress.com/oauth2/token',
    // headers: { 'Authorization': 'Bearer' + ((client_id + ':' + client_secret).toString('base64')) },
    // it might be basic instead of bearer. or try { authorization: 'Bearer ACCESS_TOKEN',
    // 'content-type': 'application/json' }
    body: // i have changed this from body, parameter(s), and some more I forgot. 
    {
      grant_type: 'authorization_code',
      client_id: client_id,
      client_secret: client_secret,
      code: req.query.code,
      redirect_uri: 'https://localhost:5000/wordpress/callback_wordpress'
    },
    // this is the json object  (above)
    json: true
  };
  request.post(authOptions, function (error, response, body) {
    console.log('log body', body)
    access_token = body.access_token
    blogId = body.blog_id // we will make this a global varabile and update it every time they auth.
    blogurl = body.blog_url
    tokentype = 'Bearer'
    checkStorage(acces_token)// this updates the database with the token.
    res.redirect('http://localhost:3000/#/home')
    // to DB
  })
  
});
userId= 1
// main authorization steeps this is where the user inputed information is sent along.

checkStorage =(access_token)=>{ //checks if user has accounts
    const queryText=`SELECT * FROM "storage" WHERE "id"=$1;`
    pool.query(queryText, [userId]) //hardcoded
    .then((result) => {
        // add user if not in database
        if (!result.rows[0]) {
postToStorage(access_token) //if no account, create one
}
else{
updateToStorage(acces_token) // if account update db
}
})
}

updateToStorage = (access_token)=>{
    const queryText = `UPDATE "storage" SET "podbean"=$1 WHERE "id"=$2;` //update access token by user id
    pool.query(queryText, [access_token, userId]).then(() => {
      console.log('access token added to database');
    }).catch(error => {
      console.log('there was an error adding access_token to database', error);
    })
  }
  postToStorage =(access_token)=>{
    const queryText = `INSERT INTO "storage" ("user_id", "podbean") VALUES ($1,$2)` //create access token by user id
    pool.query(queryText, [userId, access_token,]).then(() => { 
      console.log('access token added to database');
    }).catch(error => {
      console.log('there was an error adding access_token to database', error);
    })
  }
module.exports = router;