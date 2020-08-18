const express = require('express');
const router = express.Router();

// @route  get api/ping
// @desc   ping
// @access public

router.get('/', (req, res) => {
  res.json({ success: true });
});

module.exports = router;
