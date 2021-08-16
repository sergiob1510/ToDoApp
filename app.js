//Setup
const express  = require('express');
const app      = express();
const path     = require('path');
const dotenv   = require('dotenv');
const mongoose = require('mongoose');

//Models
const TodoTask = require('./models/TodoTask');
dotenv.config();

app.use(express.static(__dirname+'/public/'));

app.use(express.urlencoded({ extended: true }));


//DB settings
mongoose.set("useFindAndModify", false);

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true },
    () => {
        console.log("DB connection established");
        app.listen (3000, () => console.log("Server running"));
        
    })

//Methods

//Endpoint to serve tasks and render them client-side on main HTML file
app.get('/data', (request, response) => {
    TodoTask.find({}, (err, tasks) => {
        response.json(tasks) 
    });
});

//Main page
app.get('/',(request, response) => {
    response.sendFile(path.join(__dirname+'/public/index.html'));
});

//Post method - Save task on Atlas - MongoDB cloud database
app.post('/',async (request, response) => {
    const todoTask = new TodoTask({
        content: request.body.content
    });
    console.log(todoTask);
    try {
        await todoTask.save();
        console.log("Success! Task saved");
        response.redirect('/');
    } catch (err) {
        console.log("Could not save task");
        response.redirect('/');
    }
});

//Delete method
app.route('/remove/:id').get((request, response) => {
    const id = request.params.id;
    TodoTask.findByIdAndRemove(id, err => {
        if (err) return response.send(500, err);
        console.log(id+' Task removed succesfully.')
        response.redirect('/');
});
});

//Edit status method
app.route('/edit/:id/:status').get((request, response) => {
    const id = request.params.id;
    const stat = request.params.status;
    if (stat === 'false') {
        TodoTask.findByIdAndUpdate(id, { status : true }, { new : true }, err =>
            {
                if (err) return response.send(500, err);
                console.log('Status set to DONE');
                response.redirect('/');
            }
        )}
    else { 
        TodoTask.findByIdAndUpdate(id, { status : false }, { new : true }, err =>
        {
            if (err) return response.send(500, err);
            console.log('Status set to NOT DONE');
            response.redirect('/');
        });
    };
});
