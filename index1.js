var express = require("express");
var mongoose = require("mongoose");
var db = require("./database/db1.js");

db();

const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name: String,
    price: Number,
    discount: Number,
});

const userModel = mongoose.model("users", usersSchema);

var app = express();

app.use(express.json());

app.get("/usersinfo", async function (req, res) {
    try {
        var result = await userModel.find();
        res.send(result);
        console.log(result);
        
    } catch (err) {
        res.send(err.message);
    }
});

app.post('/usersinfo', async function (req, res) {
    console.log(req.body);
    try {
        var record = new userModel(req.body);
        var ans = await record.save();
        res.send("Record inserted");
    } catch (err) {
        res.send(err.message);
    }
});

app.listen(9500);
