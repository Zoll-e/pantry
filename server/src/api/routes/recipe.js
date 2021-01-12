const express = require("express");
const passport = require("passport");
const { check, validationResult } = require("express-validator");
const Recipe = require("../../model/Recipe");
const Photo = require("../../model/Photo");
const Profile = require("../../model/Profile");
const router = express.Router();

// Get all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ date: -1 });
    return res.json(recipes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Add recipe
router.post(
  "/",
  [
    check("dish", "What's your dish called").not().isEmpty(),
    check("intro", "Write a short intro of this recipe").not().isEmpty(),
    check("directions", "Please provide instructions").not().isEmpty(),
    check("picture", "Please upload a picture").not().isEmpty(),
  ],
  passport.authenticate("jwt", { session: false }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }

    const { dish, intro, directions, ingredients, picture } = req.body;

    recipeFields = {};
    recipeFields.user = req.user.id;

    if (dish) recipeFields.dish = dish;
    if (intro) recipeFields.intro = intro;
    if (picture) recipeFields.picture = picture;
    //add directions
    directionFields = [];
    if (directions)
      directions.map(direction => directionFields.push(direction));
    recipeFields.directions = directionFields;
    // Add ingredients
    ingredientFields = [];
    if (ingredients)
      ingredients.map(ingredient => ingredientFields.push(ingredient));

    recipeFields.ingredients = ingredientFields;
    try {
      const recipe = new Recipe(recipeFields);
      await recipe.save();
      return res.json(recipe);
    } catch (error) {}
  }
);
// Update recipe
router.post(
  "/:id",

  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }

    const { dish, intro, directions, ingredients } = req.body;

    recipeFields = {};

    if (dish) recipeFields.dish = dish;
    if (intro) recipeFields.intro = intro;
    if (directions) recipeFields.directions = directions;
    if (picture) recipeFields.picture = picture;

    // Add ingredients
    ingredientFields = [];
    if (ingredients)
      ingredients.map(ingredient => ingredientFields.push(ingredient));

    recipeFields.ingredients = ingredientFields;

    try {
      let recipe = await Recipe.findOneAndUpdate(
        { user: req.user.id, _id: req.params.id },
        { $set: recipeFields },
        { new: true }
      );
      console.log(recipe);
      if (!recipe) {
        return res.status(401).send("You can only update your own recipe");
      }
      await recipe.save();
      return res.json(recipe);
    } catch (error) {}
  }
);

// Like/Unlike recipe
router.put(
  "/like/:recipe_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.recipe_id);

      // Check if the post has already been liked
      if (
        recipe.likes.filter(like => like.user.toString() === req.user.id)
          .length > 0
      ) {
        //Unlike post
        const removeindex = recipe.likes
          .map(like => like.user.toString())
          .indexOf(req.user.id);
        recipe.likes.splice(removeindex, 1);

        await recipe.save();
        //Update profile
        
        res.json(recipe.likes);
      } else {
        //Like post
        recipe.likes.unshift({ user: req.user.id });
        
        await recipe.save();

        res.json(recipe.likes);
      }
    } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "Recipe not found" });
      }
      res.status(500).send("Server error");
    }
  }
);

// Get recipes by user_id
router.get("/userrecipes/:user_id", async (req, res) => {
  try {
    const recipes = await Recipe.find({ user: req.params.user_id });
    return res.json(recipes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
// Get recipe by id
router.get("/:recipe_id", async (req, res) => {
  try {
    const recipe = await Recipe.findById({ _id: req.params.recipe_id });

    return res.json(recipe);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete Recipe
router.delete(
  "/:recipe_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const recipe = await Recipe.findOne({ _id: req.params.recipe_id });
      if (!recipe) {
        return res.status(404).json({ msg: "Recipe not found" });
      }
      if (recipe.user.toString() !== req.user.id) {
        return res
          .status(401)
          .json({ msg: "You can only delete your own recipe" });
      }
      if (recipe.picture) {
        try {
          const photo = await Photo.findOne({ _id: recipe.picture });
          photo.delete();
        } catch (error) {
          console.log("picture not found, deleting recipe anyway");
        }
      }
      recipe.delete();
      return res.json({ msg: "Recipe deleted" });
    } catch (error) {
      return res.status(500).send("Server error");
    }
  }
);

module.exports = router;
