const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  bio: {
    type: String,
  },
  settings: {
    myRecipes: { type: Boolean, default: false },
    allRecipes: {type:Boolean,default:true},
    likedRecipes:{type:Boolean,default:false}
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
      recipeId: {
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
