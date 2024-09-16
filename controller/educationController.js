const EducationProfile = require('../models/EducationProfessionalForm.js');

exports.createProfile = async (req, res) => {
  try {
    const profile = new EducationProfile(req.body);
    await profile.save();
    res.status(201).send(profile);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getProfiles = async (req, res) => {
  try {
    const profiles = await EducationProfile.find();
    res.status(200).send(profiles);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getProfileByemail = async (req, res) => {
    try {
      const profile = await EducationProfile.findOne({ email: req.params.email }); // Use email to find the profile
      if (!profile) {
        return res.status(404).send("Profile not found");
      }
      res.status(200).send(profile);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  

exports.updateProfile = async (req, res) => {
  try {
    const profile = await EducationProfile.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!profile) {
      return res.status(404).send();
    }
    res.status(200).send(profile);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const profile = await EducationProfile.findByIdAndDelete(req.params.id);
    if (!profile) {
      return res.status(404).send();
    }
    res.status(200).send(profile);
  } catch (error) {
    res.status(500).send(error);
  }
};