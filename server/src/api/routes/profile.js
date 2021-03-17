const express = require("express");
const Profile = require("../../model/Profile");
const Recipe = require("../../model/Recipe");
const User = require("../../model/User");
const passport = require("passport");
const router = express.Router();
const fs = require("fs");

// Get profile
/* router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      if (!profile) {
        return res.status(400).json({ msg: "No profile found for user" });
      }
      return res.json(profile);
    } catch (error) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
); */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }, (req, res) => {
    Profile.findOne({ user: req.user.id }, (err, user) => {
      if (err) {
        res.status(400).json({ msg: "No profile found for user" });
      }
      res.json(profile);
    });
  })
),
  /*
// Create || update Profile
router.post(
  "/",
  [
    passport.authenticate("jwt", { session: false }),
    [check("bio", "Yout must add a short bio").not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { bio, location, vegan } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    if (bio) profileFields.bio = bio;
    if (vegan) profileFields.vegan = vegan;
    if (location) profileFields.location = location;
    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      //Create
      profile = new Profile(profileFields);
      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
); */
  router.post(
    "/",
    [
      passport.authenticate("jwt", { session: false }),
      //[check("bio", "Yout must add a short bio").not().isEmpty()],
    ],
    (req, res) => {
      const { bio, location, vegan } = req.body;

      const profileFields = {};
      profileFields.user = req.user.id;
      if (bio) profileFields.bio = bio;
      if (vegan) profileFields.vegan = vegan;
      if (location) profileFields.location = location;

      Profile.findOne({ user: req.user.id }, (err, profile) => {
        if (profile) {
          // Update profile
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true },
            (err, profile) => {
              return res.json(profile);
            }
          );
        }
        if (!profile) {
          const profile = new Profile(profileFields);
          profile.save();
          return res.json(profile);
        }
        if (err) {
          console.log("err");
        }
      });
    }
  );

// Delete Profile and account

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const recipes = await Recipe.find({ user: req.user.id });
      recipes.map(recipe => fs.unlinkSync(recipe.picture));
      // Delete recipes
      await Recipe.deleteMany({ user: req.user.id });
      // Delete profile
      await Profile.findOneAndRemove({ user: req.user.id });
      // Delete user
      await User.findOneAndRemove({ _id: req.user.id });

      return res.json({ msg: "User succesfully deleted!" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
