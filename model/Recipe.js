const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  dish: {
    type: String,
    required: true,
  },
  intro: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },

  ingredients: [
    {
      ingredient_name: {
        type: String,
      },
      portion: {
        type: String,
      },
    },
  ],
  range: {
    type: Number,
  },
  rating:{type:Number},
  prep_time: { type: Date, default: new Date().setHours(0, 0, 0, 0) },
  cook_time: { type: Date, default: new Date().setHours(0, 0, 0, 0) },
  category: [{ type: String }],
  servings: { type: Number, default: 2 },
  notes: { type: String },

  cuisine: { type: String },
  dietary: [
    {
      type: String,
    },
  ],
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
  
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
 
  picture: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Recipe = mongoose.model("recipe", RecipeSchema);
