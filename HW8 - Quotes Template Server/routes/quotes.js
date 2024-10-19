const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const quoteData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/quoteData.json'), 'utf8'));

// GET quotes page
router.get('/', (req, res) => {
  res.render('quotes', { quotes: quoteData });
});

module.exports = router;
