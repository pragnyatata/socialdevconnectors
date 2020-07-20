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
  if (errors.length > 0) {
    //const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
