import express from 'express';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public/__build__/'));
app.listen(port, () => {
    console.log('Your server is running on http://localhost:' + port);
})
