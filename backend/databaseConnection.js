require('dotenv').config();
const mongodb_database = process.env.MONGODB_DATABASE;
const mongodb_host = process.env.MONGODB_HOST;
const mongodb_user = process.env.MONGODB_USER;
const mongodb_password = process.env.MONGODB_PASSWORD;

const MongoClient = require("mongodb").MongoClient;
const atlasURI = `mongodb+srv://${mongodb_user}:${mongodb_password}@${mongodb_host}/?retryWrites=true`;
var database = new MongoClient(atlasURI, { useNewUrlParser: true, useUnifiedTopology: true });

const getUserCollection = function() {
    return database.db(mongodb_database).collection('users');
};

module.exports = { getUserCollection, database };