const hbs = require('hbs');
const path = require('path');
const express = require('express');
const app = express();

// operate at heroku
const port = process.env.PORT || 3000;

// define paths for express config
const publicDirectoryFile = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

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
    let { address } = req.query;
    if(!address){
        return res.send([
            {
                code: 400,
                message: 'Address is required'
            }
        ])
    }

    geocode(address, (error, { latitude, longitide, location } = {}) => {
        if(error){
            return res.send({ error });
        }
        forecast(latitude, longitide, (error, { temperature, precip, description } = {}) => {
            if(error){
                return res.send({ error });
            } else {
                return res.send({
                    forecast: `current temperature is ${temperature} degrees out and ${precip}% chance of rain, weather description:${description}`,
                    location
                });
            }
        })
    });
});

app.get('/products', (req, res) => {
    console.log(req.query);
    const { searchType } = req.query;
    if(!searchType) {
        return res.send([{
            code: 400,
            message: 'Query paramter is missing'
        }])
    }
    res.send({
        products: []
    })
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

app.listen(port, () => {
    console.log(`Running on port:${port}`);
});