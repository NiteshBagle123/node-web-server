const path = require('path');
const express = require('express');
const app = express();

const publicDirectoryFile = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryFile));

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'cloudy',
        location: 'Mumbai'
    });
});

app.get('*', (req, res)=> {
    res.send('Page not found...');
});

app.listen(3000, () => {
    console.log('Running on port 3000');
});