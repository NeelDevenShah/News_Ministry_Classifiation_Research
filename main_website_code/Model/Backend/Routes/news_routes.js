const express = require('express');
const router = express.Router();
const { fetchallnews } = require('../Controllers/news_controller.js');


router.get('/:category', fetchallnews)
router.get('', fetchallnews)
module.exports = router;

//fake news,