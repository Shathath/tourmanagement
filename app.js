const fs = require("fs");

const express = require("express");

const app = express();

app.use( express.json() )

const port = 8000;

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

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

const deleteTour = (req, res) => {
    res.status(201).json({
        status : "success",
        message : "Deletion successful"
    })
}

const getAllUsers = (req,res) => {
    res.status(500).json({
        status : 'error',
        message : "This route is not handled yet!!"
    })
}

const createUser = (req,res) => {
    res.status(500).json({
        status : 'error',
        message : "This route is not handled yet!!"
    })
}

const getUser = (req,res) => {
    res.status(500).json({
        status : 'error',
        message : "This route is not handled yet!!"
    })
}



const updateUser = (req,res) => {
    res.status(500).json({
        status : 'error',
        message : "This route is not handled yet!!"
    })
}

const deleteUser = (req,res) => {
    res.status(500).json({
        status : 'error',
        message : "This route is not handled yet!!"
    })
}

app.route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour);

app.route('/api/v1/tours/:id')
    .delete(deleteTour);


// User api route
app.route("/api/v1/users")
    .get(getAllUsers)
    .post(createUser);

app.route("/api/v1/users/:id")
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);



app.listen(port, ()=>{
    console.log(`app started at ${port}`)
})