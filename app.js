const fs = require("fs");

const express = require("express");

const app = express();

//Middleware

// Middleware used to sit in between the req and response cycle and middleware used to modify the request object

// Everything is middleware

// use method used to define middleware/ added to middleware stack
app.use( express.json() )

const port = 8000;

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

/*
Above format is called JSON envelope
{
    status : "success",
    data : {
        tours : tours
    }
})*/

// git remote add origin https://github.com/Shathath/tourmanagement.git
// git branch -M main
// git push -u origin main


// Handle get tour request
app.get('/api/v1/tours', (req,res) => {
    res
        .status(200)
        .json({
            status : "success",
            data : {
                tours : tours
            }
        })

});

// Handle post tour request

app.post('/api/v1/tours', (req,res) => {
    
    console.log( req.body );

    const tourId = tours[tours.length - 1].id + 1;

    const newTour = Object.assign({ id : tourId }, req.body );

    tours.push( newTour );

    console.log( tours )

    fs.writeFile(`${__dirname}/dev-data/tours-simple.json`, JSON.stringify(tours), (err) => {
        
        res
            .status(201)
            .json(
            {
                status : "success",
                data : {
                    tours : newTour
                }
            })
    } )
})

app.listen(port, ()=>{
    console.log(`app started at ${port}`)
})