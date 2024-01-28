import mongoose, { Schema } from "mongoose";

interface GoalSchema {
  name: string;
  description: string;
  status: string;
  targetCalories: Number;
  targetDate: Date;
}
const goalSchema: Schema<GoalSchema> = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
  },
  targetCalories: {
    type: Number,
  },
  targetDate: {
    type: Date,
  },
});

export const Goal = mongoose.model("Goal", goalSchema);
