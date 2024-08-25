const express = require('express');
const Member = require('../models/member');

const router = express.Router();

// PATCH request to update a member's information
router.patch('/update-member/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Find the member by ID and update it with the new data
        const updatedMember = await Member.findByIdAndUpdate(id, updateData, {
            new: true, // return the updated document
            runValidators: true, // run schema validators
        });

        if (!updatedMember) {
            return res.status(404).json({ error: 'Member not found' });
        }

        res.status(200).json(updatedMember);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
