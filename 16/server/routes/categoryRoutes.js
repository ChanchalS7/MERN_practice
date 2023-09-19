const express = require('express');
const router = express.Router();
const { getCategoryRevenue, getTopSellingCategory } = require('../controllers/categoryController');

router.get('/category-revenue', getCategoryRevenue);
router.get('/top-selling-category', getTopSellingCategory);

module.exports = router;
