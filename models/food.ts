import mongoose, { Schema } from "mongoose";

interface Food {
  name: string;
  calories: Number;
  protein: Number;
  carbohydrates: Number;
  fat: Number;
}

const foodSchema: Schema<Food> = new mongoose.Schema({
  name: {
    type: String,
  },
  calories: {
    type: Number,
  },
  protein: {
    type: Number,
  },
  carbohydrates: {
    type: Number,
  },
  fat: {
    type: Number,
  },
});

export const Food = mongoose.model("Food", foodSchema);
