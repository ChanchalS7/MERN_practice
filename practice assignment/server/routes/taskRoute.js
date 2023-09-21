const express=require('express')
const router =express.Router();
const taskController= require('../controller/taskController')


//Define routes to get data
router.get('/api/tasks',taskController.getData)
router.get('/api/search',taskController.searchAndFilter)

module.exports=router;