const { check, validationResult } = require("express-validator");
exports.userValidator = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Enter a valid email").isEmail(),
  check("password", "password must have atleast 6 characters").isLength({
    min: 6,
  }),
];
exports.errorChecker = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
exports.profileValidator = [
  check("status", "Status is required").not().isEmpty(),
  check("skills", "Skills is required").not().isEmpty(),
];
exports.experienceValidator = [
  check("title", "Title is required").not().isEmpty(),
  check("company", "Company is required").not().isEmpty(),
  check("from", "From date is required and needs to be from the past")
    .not()
    .isEmpty(),
];
exports.educationValidator = [
  check("school", "School is required").not().isEmpty(),
  check("degree", "Degree is required").not().isEmpty(),
  check("fieldofstudy", "Study is required").not().isEmpty(),
  check("from", "From date is required and needs to be from the past")
    .not()
    .isEmpty(),
];
exports.postValidator = [check("text", "Text is required").not().isEmpty()];
exports.commentValidator = [check("text", "Text is required").not().isEmpty()];
