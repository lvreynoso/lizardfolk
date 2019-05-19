import express from "express";
import exphbs from "express-handlebars"
import fs from "fs";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import expressValidator from "express-validator";
import assert from "assert"
import { MONGODB_URI, SESSION_SECRET } from "./util/env";

// load environment variables
if (fs.existsSync(".env")) {
    console.log("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
}

// Controllers


// Create Express server
const app = express();

// Connect to MongoDB
const uri = process.env.MONGODB_URI || 'mongodb://localhost/pollution-api'
mongoose.Promise = global.Promise;
mongoose.connect(
    uri,
    { useNewUrlParser: true },
    function(err: MongoError) {
        assert.equal(null, err);
        console.log("Connected successfully to database");

        // db.close(); turn on for testing
    }
);
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection Error:"));
mongoose.set("debug", false);

// setting up Express
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(expressValidator());
app.use(cookieParser());

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Routes

