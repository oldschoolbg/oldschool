//Install express server
const express = require('express');
const path = require('path');
const forceSsl = require('force-ssl-heroku');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const apiRoute = require('./api/webserver');
const generalConfig = require('./config/general');

const app = express();
const port = process.env.PORT || 80;

if (generalConfig.forceSSL) {
  app.use(forceSsl);
}

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json({limit: "50mb"}));
app.use(cookieParser());

global.navigator = () => null;

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/oldschool'));

app.use('/api', apiRoute);

app.get('*', function(req,res) {
  res.sendFile(path.join(__dirname+generalConfig.webapp_folder));
});

// Start the app by listening on the default Heroku port
app.listen(port, () => {
  console.log("app started on port " + port);
  /*database.migrate()
  .then(() => {
    console.log("database updated")
  })
  .catch((err) => {
    console.log(err);
  });*/
})
.on('error', (err) => {
  console.log(err);
});