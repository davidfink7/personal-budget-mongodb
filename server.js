const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const fs = require('fs');

const mongoose = require("mongoose");
const myBudgetModel = require("./models/myBudget_schema");

let url = 'mongodb://localhost:27017/myBudgetData';

app.use(cors());

/*
'#ffcd56',
'#ff6384',
'#36a2eb',
'#fd6b19',
'#a05d56',
'#d0743c',
'#ff8c00'*/

app.get('/budget', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                console.log("Connected to the database")
                myBudgetModel.find({})
                            .then((data) => {
                                res.send(data)
                                mongoose.connection.close()
                            })
                            .catch((connectionError) => {
                                console.log(connectionError)
                            })
            })  
            .catch((connectionError) => {
                console.log(connectionError)
            });
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});