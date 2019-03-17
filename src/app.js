const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');
const main = require('./router/index');

const app = express();


app.use(cors());
app.use(morgan('[:date[web]] ":method :url HTTP/:http-version" :status :res[content-length]'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true}));

app.use('/api/v1', main);
app.use('/ping', (req, res) => {
    res.json({success: true})
});

db.sequelize.sync(
    //{ force: true }
)
    .then(() => {
        console.log("Connect database success");
        app.listen(3303, (err) => {
            if(!err){
                console.log("server is running on 3303");
            }
        });
    })
    .catch(err => {
        console.log(err.message);
        process.exit();
    });