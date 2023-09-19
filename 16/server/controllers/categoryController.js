
const {calculateCategoryRevenue} = require('../utils/calculateRevenue')
const {findTopSellingCategory} = require('../utils/findTopSelling')

// Get total revenue for each category
const getCategoryRevenue = (req, res) => {
  const categoryRevenue = calculateCategoryRevenue();
  res.json(categoryRevenue);
};

// Get the top-selling category
const getTopSellingCategory = (req, res) => {
  const topSellingCategory = findTopSellingCategory();
  res.json(topSellingCategory);
};

module.exports = {
  getCategoryRevenue,
  getTopSellingCategory,
};
