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
  favorites: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
  picture: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"photo",
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Recipe = mongoose.model("recipe", RecipeSchema);
