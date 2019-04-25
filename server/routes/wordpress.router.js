require('dotenv').config();
const pool = require('../modules/pool');
var request = require("request"); //this is the request for authorization access token

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
var cookieParser = require('cookie-parser');
var client_id = '65413'; // Your client id
var client_secret = process.env.CLIENT_SECRET_WORDPRESS; // Your secret
var redirect_uri = 'http://localhost:5000/wordpress/callback_wordpress'; // Your redirect uri
// note redirect uri is only for local development not for heroku

const router = express.Router();

router.get('/token_check', function (req, res) {// this is the route to check to 
  // see if we have a token for the account.
  // we should delete an entry when someone loggs out.
  const queryText = `SELECT * FROM "current_user";`
  pool.query(queryText)// get current user id
    .then((result) => {
      let userId = result.rows[0].current// set user id
      const queryText = `SELECT * FROM "storage" WHERE "user_id" = $1;`
      pool.query(queryText, [userId])// query to get the token and then send a bolien.
        .then((results) => {
          if (results.rows[0].wordpress) {
            res.send(true)
          }
          else {
            res.send(false)
          }
        })
    })
})

// main authorization steeps this is where the user inputed information is sent along.
router.get('/callback_wordpress', function (req, res) {
  console.log('call back wordpress was hit')
  console.log(req.body);
  // your application requests refresh and access tokens
  // after checking the state parameter
  var code = req.query.code || null; // this is the token we got back form wordpress


  const queryText = `SELECT * FROM "current_user";`
  pool.query(queryText)
    .then((result) => {
      console.log(result.rows[0].current)
      userId = result.rows[0].current
      //attempt to grab the current user form the database

      //execute an authorization code grant flow using ga post
      var authOptions = {
        url: 'https://public-api.wordpress.com/oauth2/token',
        // headers: { 'Authorization': 'Bearer' + ((client_id + ':' + client_secret).toString('base64')) },
        // it might be basic instead of bearer. or try { authorization: 'Bearer ACCESS_TOKEN',
        // 'content-type': 'application/json' }
        form: // i have changed this from body, parameter(s), and some more I forgot. 
        {
          grant_type: 'authorization_code',
          code: code,
          client_id: client_id,
          client_secret: client_secret,
          redirect_uri: redirect_uri,
        },
        headers: {
          'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
        },
        // this is the json object  (above)
        json: true
      };
      request.post(authOptions, function (error, response, body) {
        console.log('log body', body)
        let access_token = body.access_token
        let blogId = body.blog_id // we will make this a global variable and update it every time they auth.
        let blogurl = body.blog_url
        checkStorage(access_token, userId, blogId, blogurl)// this updates the database with the token.
        res.redirect('http://localhost:3000/#/connect')
        // to DB
      })
    })
})

// main authorization steeps this is where the user inputed information is sent along.

//post rout for Wordpress
router.post('/post_episode', function (req, res) {
  // console.log('logging', req.body)-- logging this is dummy data right now
  // let title = req.body.title;
  // let status = req.body.status;
  // let type = req.body.type;
  // let content = req.body.content;
  // let featured_media =req.body.featured_media;
  const queryText = `SELECT * FROM "current_user";`
  pool.query(queryText)
    .then((data) => {
      let userId = data.rows[0].current  
      const queryText = `SELECT * FROM "storage" WHERE "user_id" = $1;`
      pool.query(queryText, [userId]) // this is to get the user ID.
        .then((results) => {
          if (results.rows[0].wordpress) {
            let access_token = results.rows[0].wordpress;
            console.log('logging the results.rows', access_token) // we are sending the correct token. //second pool query getting authorization token
            let blogurl = results.rows[0].blog_url;
            let blogid = results.rows[0].blog_id;
            var authOptions = {
              header: { 'Authorization': 'bearer ' + access_token },
                url: `https://public-api.wordpress.com/rest/v1/sites/${blogid}/posts/new`, // I might need to add method:post
                form: {
                  access_token: access_token,
                  title: 'this is a test post',
                  content: 'this is the auctual post lets hope I see it.',
                  tags: 'tests',
                  categories: 'API',
                  // access_token: access_token, // this is the wordpress response code.
                  // date: 04 / 17 / 2019,
                  // title: 'eatmyshorts',
                  // content: 'this content is short on words',
                  // excerpt: 'because when she saw the dark blue water she could only thing of his eyes at night',
                  // author: 'charmed butts',
                  // publicize_message: 'meow',
                  // sticky: 'true',
                  // password: 'mama',
                  // parent: 1,
                  // categories: ['things we sometimes say'],
                  // tags: ['tags'],
                  // featured_image: '',
                  // media: 'Users/juliasugarman/Desktop/TESTWordPressFile.docx', //this will be our acutal file path when we get it
                  // media_urls: [],
                  // comments_open: 'true',
                  // menu_order: 0,
                }, // this is the stuff require to post a podcast.
                json: true
              };
              request.post(authOptions, function (error, response, body) {
                console.log('post blog was hit? logging body', body)
                console.log('post blog was hit? logging response', response)
                res.redirect('https://localhost:3000/#/home')  //this is a local host for wordpress instead of / but for presentation we will have to use redirect
              })
            }
      else {
              res.send(500)
            }
          })
    })
})// this is untested.

// this is ot auth token.
// router.get('/test_token', function (req, res) {

//   request.get(`https://public-api.wordpress.com/oauth2/token-info?client_id=${client_id}&token=${}`, function (error, response, body){

//   })


checkStorage = (access_token, userId, blogId, blogurl) => { //checks if user has accounts
  const queryText = `SELECT * FROM "storage" WHERE "id"=$1;`
  pool.query(queryText, [userId]) //hardcoded
    .then((result) => {
      // add user if not in database
      if (!result.rows[0]) {
        postToStorage(access_token, userId, blogId, blogurl) //if no account, create one
      }
      else {
        updateToStorage(access_token, userId, blogId, blogurl) // if account update db
      }
    })
}
updateToStorage = (access_token, userId, blogId, blogurl) => {

  const queryText = `UPDATE "storage" SET "wordpress"=$1, "blog_id"=$3, "blog_url"=$4 WHERE "id"=$2;` //update access token by user id
  pool.query(queryText, [access_token, userId, blogId, blogurl]).then(() => {
    console.log('access token added to database');
  }).catch(error => {
    console.log('there was an error adding access_token to database', error);
  })
}

postToStorage = (access_token, userId, blogId, blogurl) => {

  const queryText = `INSERT INTO "storage" ("user_id", "wordpress", "blog_id", "blog_url") VALUES ($1,$2, $3, $4)` //create access token by user id
  pool.query(queryText, [userId, access_token, blogId, blogurl]).then(() => {
    console.log('access token added to database');
  }).catch(error => {
    console.log('there was an error adding access_token to database', error);
  })
}
module.exports = router;