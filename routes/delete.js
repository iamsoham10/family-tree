const express = require('express');
const router = express.Router();
const Member = require('../models/member');

// DELETE a member by ID
router.delete('/delete-member/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMember = await Member.findByIdAndDelete(id);

        if (!deletedMember) {
            return res.status(404).json({ error: "Member not found" });
        }

        res.status(200).json({ message: "Member deleted successfully", deletedMember });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
