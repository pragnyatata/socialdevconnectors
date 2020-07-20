const express = require("express");
const {
  create,
  list,
  postById,
  deleteAPost,
  likePost,
  unlikePost,
  addComment,
  deleteComment,
} = require("../../controllers/posts");
const router = express.Router();
const auth = require("../../middleware/auth");
const {
  postValidator,
  errorChecker,
  commentValidator,
} = require("../../validator");
router.post("/", postValidator, errorChecker, auth, create);
router.get("/", auth, list);
router.get("/:id", auth, postById);
router.delete("/:id", auth, deleteAPost);

router.put("/like/:id", auth, likePost);
router.put("/unlike/:id", auth, unlikePost);
router.put("/comment/:id", commentValidator, errorChecker, auth, addComment);
router.delete("/comment/:id/:comment_id", auth, deleteComment);

// router.put("//:id", auth, likePost);

module.exports = router;
