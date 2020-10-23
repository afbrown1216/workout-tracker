const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  date: Date,

  exercises: [{
    type: {
      type: String,
      require: true,
      enum: ['carido', 'resistance']
    },
    name: {
      type: String,
      require: true
    },
    weight: Number,
    sets: Number,
    reps: Number,
    distance: Number,
    duration: Number
  }]
}, {
  toJSON: {
    virtuals: true
  }
});

WorkoutSchema.virtual("totalDuration").get(function () {
  return this.exercises.reduce(function (total, exercise) {
    return total + exercise.duration;
  }, 0);
});


const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;