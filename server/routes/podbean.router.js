require('dotenv').config()
let express = require('express');
const pool = require('../modules/pool');

var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library

var client_id = '7ae314124aac5c7de467d'; // Your client id
var client_secret = process.env.CLIENT_SECRET_PODBEAN; // Your secret
var redirect_uri = 'https://hermes-host.herokuapp.com/podbean/callback_podbean'; // Your redirect uri
const router = express.Router();

// main authorization steeps this is where the user inputed information is sent along.
router.post('/callback_podbean', function (req, res, next) {
    console.log('call back was hit', req.body)
    // your application requests refresh and access tokens
    // after checking the state parameter
    const queryText = `SELECT * FROM "current_user";`
  pool.query(queryText)
    .then((result) => {
      console.log(result.rows[0].current)
      userId = result.rows[0].current
    var code = req.query.code || null;
    var authOptions = {
        url: 'https://api.podbean.com/v1/oauth/token',// I might need ot add post
        form: {// I might have to do parameter instead of form.
            code: code, // this is the podbean response code.
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
        },// up to here I think this will work
        headers: {
            'Authorization': 'Basic ' + (client_id + '=' + client_secret).toString('base64')
        },// I think this will work however it might need to be called something else/put in url diffrently.
        json: true
    };
    request.post(authOptions, function (error, response, body) {
        console.log('log body', body)
        access_token = body.access_token
        blogId = body.blog_id // we will make this a global varabile and update it every time they auth.
        blogurl = body.blog_url
        checkStorage(acces_token, userId)// this updates the database with the token.
        res.redirect('https://hermes-host.herokuapp.com/callback_podbean')
        // to DB
      })
    })   
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