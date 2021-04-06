const express = require('express')
const logger = require('morgan')
const path = require('path')
const server = express()

//ssl credentials and creation
const fs = require( 'fs' )
const https = require( 'https' )
const options = {
  key: fs.readFileSync( 'public/sslcert/privkey.pem' ),
  cert: fs.readFileSync( 'public/sslcert/fullchain.pem' )
};


server.use(express.urlencoded({'extended': true}))
server.use(logger('dev'))

// Setup static page serving for all the pages in "public"
const publicServedFilesPath = path.join(__dirname, 'public')
server.use(express.static(publicServedFilesPath))


// The server uses port 80 by default unless you start it with the extra
// command line argument 'local' like this:
//       node server.js local
server.listen( 8080 )
https.createServer( options, server ).listen( 443 )

// Routes
server.get('/homework/6', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`)
})

server.post('/homework/7/', function(req,res){
  console.log(req.body);
  const info = req.body
  res.send( createMadLib(info) )
});
//use input name for function
function createMadLib( info ){
  console.log( info );
  return  info.name1 + ' had a problem. She had a wonderful ' + info.occupation + ' named ' + info.name2 + '.'
          + ' But ' + info.name2 + ' had a distaste for babies. Everytime they saw ' + info.name1 + '\'s child '
          + ' they yelled, "Heck You" ' + info.name1 + ' decided to have a ' + info.infinitive_verb
          + ' with ' + info.name2 + ' in order to facilitate good communication. '
          + ' After a long ' + info.infinitive_verb + ', they both worked out their differences and can '
          + ' resume their lives ' + info.adverb + '.';
};
