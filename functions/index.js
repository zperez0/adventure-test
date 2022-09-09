const functions = require('firebase-functions');
const app = require('express')();

const {
    getAllLists
} = require('./APIs/lists')

app.get('/lists', getAllLists);
exports.api = functions.https.onRequest(app);
