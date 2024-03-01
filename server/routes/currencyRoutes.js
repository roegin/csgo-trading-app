// server\routes\currencyRoutes.js
const express = require('express');
const auth = require("../middleware/auth");
const Currency = require('../schemas/Currency');
const User = require('../schemas/User');

const router = express.Router();

router.get('/:userId', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('currency');
        res.json(user.currency);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
});

module.exports = router;