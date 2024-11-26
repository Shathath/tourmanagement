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

const getAllTours = (req,res) => {
    
    res
        .status(200)
        .json({
            status : "success",
            data : {
                tours : tours
            }
        })
}

const createTour = (req,res) => {
    
    const tourId = tours[tours.length - 1].id + 1;

    const newTour = Object.assign({ id : tourId }, req.body );

    tours.push( newTour );

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
}


// Handle get tour request
app.get('/api/v1/tours', getAllTours );

// Handle post tour request

app.post('/api/v1/tours', createTour)

app.listen(port, ()=>{
    console.log(`app started at ${port}`)
})