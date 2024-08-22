const express = require('express');
const router = express.Router();
const Member = require('../models/member');

router.post('/add-member', async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        
        const { userid, name, dob, spouse, parentId } = req.body;

        const newMember = new Member({
            userid,
            name,
            dob,
            spouse,
            parent: parentId || null  // If no parentId is provided, default to null
        });

        const savedMember = await newMember.save();

        // If parentId is provided, add the new member to the parent's children array
        if (parentId) {
            const parent = await Member.findById(parentId);
            if (parent) {
                parent.children.push(savedMember._id);
                await parent.save();
            } else {
                return res.status(404).json({ error: "Parent not found" });
            }
        }

        res.status(201).json(savedMember);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
