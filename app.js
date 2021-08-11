const express = require("express");
const app = express();
const path = require('path');

app.use(express.static(__dirname+'/public/'));

app.get('/',(request, response) => {
    response.sendFile(path.join(__dirname+'/public/index.html'));
});

app.listen (3000, () => console.log('El servidor ta funcando bene'));
