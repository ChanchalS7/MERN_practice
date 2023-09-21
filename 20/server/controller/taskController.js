const axios = require("axios");
const apiUrl = "https://mocki.io/v1/a1487d44-5074-4d49-afae-c69ae95412e1";
const searchAndFilterData =require('../utils/searchAndFilterData')
//controller function to fetch json data
const getData = async (req, res) => {
  try {
    const {data} = await axios.get(apiUrl);
   
    res.json(data);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

//controller function to apply search and filter 
const searchAndFilter = async (req, res) =>{
    const {search, filter} = req.query;
    if(!search || !filter){
        return res.status(400).json({error:"Missing params"})
    }
    try {
        const {data} = await axios.get(apiUrl);
        const searchFilterData = searchAndFilterData.filterData(data,search,filter);
        res.json(searchFilterData)
        
    } catch (error) {
        res.status(500).json({ Error: error.message });
        
    }


}


module.exports={getData, searchAndFilter}