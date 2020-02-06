const express = require('express');
const app = express();

require('./routes')(app); //these are your api routes

//Non api requests in production
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    // Add production middleware such as redirecting to https

    // Express will serve up production assets i.e. main.js
    app.use(express.static(__dirname + '/client/build'));
    // If Express doesn't recognize route serve index.html
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(__dirname, 'client', 'build', 'index.html')
        );
    });
}

//start server
const PORT = process.env.PORT || 5000; //Heroku sets port dynamically
app.listen(PORT, () => {
    console.log('listening...');
}).on('error', err => {
    console.log(`Error Code: ${err.code}`);
});