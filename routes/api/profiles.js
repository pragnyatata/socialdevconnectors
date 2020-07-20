const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const {
  myProfile,
  create,
  list,
  getProfileByUserId,
  deleteUserData,
  addExpereince,
  deleteExperience,
  addEducation,
  deleteEducation,
  getgitHubRepos,
} = require("../../controllers/profile");
const {
  profileValidator,
  errorChecker,
  experienceValidator,
  educationValidator,
} = require("../../validator");

//private
router.get("/me", auth, myProfile);

router.post("/", profileValidator, errorChecker, auth, create);
router.get("/", list);
router.get("/user/:user_id", getProfileByUserId);
router.delete("/", auth, deleteUserData);

router.put(
  "/experience",
  experienceValidator,
  errorChecker,
  auth,
  addExpereince
);
router.delete("/experience/:exp_id", auth, deleteExperience);
router.put("/education", educationValidator, errorChecker, auth, addEducation);
router.delete("/education/:edu_id", auth, deleteEducation);

router.get("/github/:username", getgitHubRepos);

module.exports = router;
