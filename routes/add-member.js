const express = require('express');
const router = express.Router();
const Member = require('../models/member');

// Add a new member
router.post('/add-member', async (req, res) => {
    try {
        const { name, dob, spouse, parentId } = req.body;

        const newMember = new Member({
            name,
            dob,
            spouse
        });

        const savedMember = await newMember.save();

        if (parentId) {
            const parent = await Member.findById(parentId);
            parent.children.push(savedMember._id);
            await parent.save();
        }

        res.status(201).json(savedMember);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});