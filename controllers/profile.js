const User = require("../models/User");
const Profile = require("../models/Profile");
const request = require("request");
const config = require("config");
const { response } = require("express");
exports.myProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);
    if (!profile)
      return res.status(400).json({ msg: "No profile for this user" });
  } catch (error) {
    console.log(err.message);
    if (err) return res.status(500).json({ error: "Something went wrong" });
  }
};
exports.create = async (req, res) => {
  const {
    company,
    website,
    location,
    bio,
    status,
    gihubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
  } = req.body;
  const profileFields = {
    user: req.user.id,
    company,
    website,
    location,
    bio,
    status,
    gihubusername,
  };
  const social = { youtube, facebook, twitter, instagram, linkedin };
  profileFields.skills = skills.split(",").map((skill) => skill.trim());
  profileFields.social = social;
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.status(200).json(profile);
    }
    profile = new Profile(profileFields);
    await profile.save();
    return res.status(200).json(profile);
  } catch (err) {
    console.log(err.message);
    if (err) return res.status(500).json({ error: "Something went wrong" });
  }
};
exports.list = async (req, res) => {
  try {
    let profiles = await Profile.find()
      .populate("user", ["name", "avatar"])
      .exec();
    return res.status(200).json(profiles);
  } catch (err) {
    console.log(err.message);
    if (err) return res.status(500).json({ error: "Something went wrong" });
  }
};
exports.getProfileByUserId = async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.params.user_id })
      .populate("user", ["name", "avatar"])
      .exec();
    if (!profile)
      return res.status(400).json({ msg: "No profile for the user" });
    return res.status(200).json(profile);
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId")
      return res.status(400).json({ msg: "No profile for the user" });
    else return res.status(500).json({ error: "Something went wrong" });
  }
};
exports.deleteUserData = async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    return res.status(200).json({ msg: "User removed" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
exports.addExpereince = async (req, res) => {
  const newExp = { ...req.body };
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.experience.unshift(newExp);
    await profile.save();
    return res.json(profile);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
exports.deleteExperience = async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    const index = profile.experience.findIndex(
      (item) => item.id === req.params.exp_id
    );
    if (index === -1)
      return res.status(400).json({ msg: "Experience not found" });
    profile.experience.splice(index, 1);
    await profile.save();
    return res.status(200).json(profile);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
exports.addEducation = async (req, res) => {
  const newEdu = { ...req.body };
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.education.unshift(newEdu);
    await profile.save();
    return res.json(profile);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
exports.deleteEducation = async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    const index = profile.education.findIndex(
      (item) => item.id === req.params.edu_id
    );
    if (index === -1)
      return res.status(400).json({ msg: "Education not found" });
    profile.education.splice(index, 1);
    await profile.save();
    return res.status(200).json(profile);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
exports.getgitHubRepos = async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };
    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode !== 200) {
        return res.status(400).json({ msg: "No github profile found" });
      }
      return res.json(JSON.parse(body));
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
