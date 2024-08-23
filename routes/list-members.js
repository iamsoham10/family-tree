const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Member = require('../models/member');

router.get("/list-members", async (req, res) => {
    const familyMembers = await Member.find();
    res.json(familyMembers);
});

// pass 24-character hexadecimal string
router.get("/list-members/:userid", async (req, res) => {
    const { userid } = req.params;
    const objectId = new mongoose.Types.ObjectId(userid);
    let familyMember = await Member.findById(objectId);
    res.json(familyMember);
});

router.get("/list-members/by-name/:name", async (req, res) => {
    const { name } = req.params;
    let familyMember = await Member.findOne({ name });
    res.json(familyMember);
});

module.exports = router;