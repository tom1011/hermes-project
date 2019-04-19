
const pool = require('../modules/pool');
var request = require("request"); //this is the request for authorization access token
let user = require('./user.router')

require('dotenv').config();

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
/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};// end random number gen.
// var stateKey = 'wordpress_auth_state';// cookie name

router.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());
// this is to get authorization for our selves ie user dose not need to use this function
router.get('/login_wordpress', function(req, res) {
//   var state = generateRandomString(16);
//   res.cookie(stateKey, state);
  // your application requests authorization
//   var scope = 'episode_publish'; // this is what we are requesting to use from the API
  res.redirect('https://public-api.wordpress.com/oauth2/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
    //   scope: scope, the default for wordpress is one blog not all for the user this is what I think we need
   // blog, for wordpress this is a unique id for the blog we will not be using this as default.
      redirect_uri: redirect_uri,
    //   state: state wordpress dose not use this??
    }));
});
// main authorization steeps this is where the user inputed information is sent along.
router.get('/callback_wordpress', function(req, res) {
  console.log('call back wordpress was hit')
  console.log(req.body);
  
  // your application requests refresh and access tokens
  // after checking the state parameter
  var code = req.query.code || null; // this is the token we got back form wordpress
//   var blogId = req.query.blog_id || null;
//   var blogUrl = req.query.blog_url || null;

const queryText=`SELECT 'current' FROM "current_user";`
pool.query(queryText) //attempt to grab the current user form the database
console.log(result)
let userId=result
//execute an authorization code grant flow using ga post
  var options = {
    method: 'POST',
    url: 'https://public-api.wordpress.com/oauth2/token',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body:
    {
      grant_type: 'authorization_code',
      client_id: 'client_id',
      client_secret: 'client_secret',
      code: req.body.code,
      redirect_uri: 'https://localhost:5000/wordpress/callback_wordpress'
    },
    json: true
  };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });//end wordpress post


    var authOptions = {
      url: 'https://public-api.wordpress.com/oauth2/token',// I might need to add post
      form: {// I might have to do parameter instead of form.
        code: code, // this is the wordpress response code.
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },// up to here I think this will work
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },// I think this will work however it might need to be called something else/put in url diffrently.
      json: true
    }
    checkStorage(acces_token, userId)
});

checkStorage =(access_token,userId)=>{ //checks if user has accounts
    const queryText=`SELECT * FROM "storage" WHERE "id"=$1;`
    pool.query(queryText, [userId]) //hardcoded
    .then((result) => {
        // add user if not in database
        if (!result.rows[0]) {
postToStorage(access_token, userId) //if no account, create one
}
else{
updateToStorage(acces_token, userId) // if account update db
}
})
}
updateToStorage =(access_token, userId)=>{
    const queryText = `UPDATE "storage" SET "podbean"=$1 WHERE "id"=$2;` //update access token by user id
    pool.query(queryText, [access_token, userId]).then(() => {
      console.log('access token added to database');
    }).catch(error => {
      console.log('there was an error adding access_token to database', error);
    })
  }
  postToStorage =(access_token, userId)=>{
    const queryText = `INSERT INTO "storage" ("user_id", "podbean") VALUES ($1,$2)` //create access token by user id
    pool.query(queryText, [userId, access_token,]).then(() => { 
      console.log('access token added to database');
    }).catch(error => {
      console.log('there was an error adding access_token to database', error);
    })
  }
module.exports = router;