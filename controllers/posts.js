const Posts = require("../models/Posts");
const User = require("../models/User");
const Profile = require("../models/Profile");
exports.create = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const newPost = Posts({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    });
    const post = await newPost.save();
    return res.status(200).json(post);
  } catch (err) {
    console.log(err.message);
    if (err) return res.status(500).json({ error: "Something went wrong" });
  }
};
exports.list = async (req, res) => {
  try {
    const posts = await Posts.find().sort({ date: -1 });
    return res.status(200).json(posts);
  } catch (err) {
    console.log(err.message);
    if (err) return res.status(500).json({ error: "Something went wrong" });
  }
};
exports.postById = async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) return res.status(400).json({ msg: "Post not found" });
    return res.status(200).json(post);
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId")
      return res.status(400).json({ msg: "Post not found" });
    else return res.status(500).json({ error: "Something went wrong" });
  }
};
exports.deleteAPost = async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) return res.status(400).json({ msg: "Post not found" });
    if (post.user.toString() !== req.user.id)
      res.status(401).json({ msg: "User not authorized" });
    await post.remove();
    return res.status(200).json({ msg: "Post removed" });
  } catch (err) {
    if (err.kind === "ObjectId")
      return res.status(400).json({ msg: "Post not found" });
    else return res.status(500).json({ error: "Something went wrong" });
  }
};
exports.likePost = async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) return res.status(400).json({ msg: "Post not found" });
    if (
      post.likes.filter((item) => item.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    return res.status(200).json(post.likes);
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId")
      return res.status(400).json({ msg: "Post not found" });
    else return res.status(500).json({ error: "Something went wrong" });
  }
};
exports.unlikePost = async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) return res.status(400).json({ msg: "Post not found" });
    if (
      post.likes.filter((item) => item.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post not yet liked" });
    }
    const index = post.likes.findIndex(
      (like) => like.user.toString() === req.user.id
    );
    post.likes.splice(index, 1);
    await post.save();
    return res.status(200).json(post.likes);
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId")
      return res.status(400).json({ msg: "Post not found" });
    else return res.status(500).json({ error: "Something went wrong" });
  }
};
exports.addComment = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).selected("-password");
    const post = await Posts.findById(req.params.id);
    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    };
    post.comments.unshift(newComment);
    await post.save();
    return res.status(200).json(post.comments);
  } catch (err) {
    console.log(err.message);
    if (err) return res.status(500).json({ error: "Something went wrong" });
  }
};
exports.deleteComment = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).selected("-password");
    const post = await Posts.findById(req.params.id);
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    if (!comment) return res.status(400).json({ msg: "No comment" });
    if (comment.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not Authorized" });
    const index = post.comments.findIndex(
      (comment) => comment.id === req.params.comment_id
    );
    post.comments.splice(index, 1);
    await post.save();
    return res.status(200).json(post.comments);
  } catch (err) {
    console.log(err.message);
    if (err) return res.status(500).json({ error: "Something went wrong" });
  }
};
