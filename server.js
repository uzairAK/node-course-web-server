const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req,res,next) => {
  var now = new Date().toString();
  log =`${now}: ${req.method} ${req.url}`;
  console.log(`App is accessed at ${log}`);
  fs.appendFile('server.log', log + '\n', (error) => {
    if (error) {
      console.log('Unable to log to server.log file');
    }
  });
  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs')
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/html', (req, res) => {
  res.send('Hello express!');
});

app.get('/json', (req,res) => {
  res.send ({
    name:'Uzair',
    hobbies: [
      'Web development',
      'Biking'
    ]
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About',
    welcomeMessage: 'Welcome to ${pageTitle} page - Pagename',
  });
});

app.get('/help', (req, res) => {
  res.render('help.hbs', {
    pageTitle: 'Help',
    welcomeMessage: 'Welcome to ${pageTitle} page - Pagename',
  });
});

app.get('*', (req,res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});
const serverPort = 3000;
app.listen(serverPort, function(){
  console.log(`Server started on ${serverPort}`)
});
