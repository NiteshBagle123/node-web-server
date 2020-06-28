const hbs = require('hbs');
const path = require('path');
const express = require('express');
const app = express();

// define paths for express config
const publicDirectoryFile = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlers engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryFile));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Nitesh Bagle'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About App',
        name: 'Nitesh Bagle'
    });
});

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'cloudy',
        location: 'Mumbai'
    });
});

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help App',
        name: 'Nitesh Bagle'
    });
});

app.get('/help/*', (req, res)=> {
    res.render('404', {
        title: 'Help page',
        errorMessage: 'Help page not found',
        name: 'Nitesh Bagle'
    });
});

app.all('*', (req, res)=> {
    res.render('404', {
        title: 'Generic Page',
        errorMessage: 'Page not found',
        name: 'Nitesh Bagle'
    });
});

app.listen(3000, () => {
    console.log('Running on port 3000');
});