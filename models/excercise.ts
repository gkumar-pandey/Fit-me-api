import mongoose, { Schema } from "mongoose";

interface ExerciseSchema {
  exerciseName: string;
  duration: Number;
  exercises: string[];
  caloriesBurned: Number;
}

const exerciseSchema: Schema<ExerciseSchema> = new mongoose.Schema({
  exerciseName: {
    type: String,
  },
  duration: {
    type: Number,
  },
  caloriesBurned: {
    type: String,
  },
  exercises: {
    type: [String],
  },
});

export const Exercise = mongoose.model("Exercise", exerciseSchema);
