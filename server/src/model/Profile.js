const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  bio: {
    type: String,
    
  },
  location: {
    type: String,
  },
  vegan: {
    type: Boolean,
    default: false,
  },
  likedRecipes: [
    {
      recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "recipe",
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
