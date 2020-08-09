const express=require('express');
const router=express.Router();

// Controllers file has been imported---------------------------------------------

// 1).For home_controller
const homeController=require('../controllers/home_controller');

// -------------------------------------------------------------------------------

console.log('Yes!! Now router loaded');
// middleware---------------------------------------------------------------------

router.use('/users',require('./users'));
router.use('/posts',require('./posts'))

// -------------------------------------------------------------------------------
router.get('/',homeController.home);
// router.use('/users',require('./users'));
module.exports=router;
