const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date();
    var log = `${now.toISOString().replace('T', ' ')}: ${req.method} ${req.path}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (error) => {
        if (error) {
            console.log('Unsable to log in file.');
        }
    })
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    /*res.send('<h1>Hello World.</h1>');
    res.send({
        name: 'Ygor',
        likes: [
            'Music',
            'Games',
            'Programming'
        ]
    });
    */
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Hi there, it works'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Error handling request'
    });
});

app.get('*', (req, res) => {
    res.send('No routes for ' + req);
});

app.listen(port, () => {
    console.log(`Serve is up on port ${port}`);
});