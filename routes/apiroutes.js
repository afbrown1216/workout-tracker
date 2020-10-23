const db  = require("../models/");


const router = require("express").Router();


router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
    .then((workouts)=> {
        res.json(workouts);
    })
    .catch((err) => {
        console.log(err);
        res.json({
            error: true, 
            data: null, 
            message: "Failed to retrieve workouts."
        });
    });  
 });

router.put("/api/workouts/:id", (req, res) => {
    db.Workout.findByIdAndUpdate (
        req.params.id, 
        {$push: { exercises: req.body }}, 
        { new: true }
    )
    .then((workout) => {
        res.json(workout);
    })
    .catch((err) => {
        console.log(err);
        res.json({
            error: true, 
            data: null, 
            message: "Failed to update workouts."
        });
    });  
});

router.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body)
      .then((newWorkout) => {
        res.json(newWorkout);
      })
      .catch((err) => {
        res.json(err);
      }); 
});

router.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
      .limit(7)
      .then((foundWorkout) => {
        res.json(foundWorkout);
      })
      .catch((err) => {
        res.json(err);
      }); 
});








module.exports = router;