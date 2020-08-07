const express=require('express');
const router=express.Router();
const postsController=require('../controllers/posts_controllers');
router.get('/user-post',postsController.userPost);
module.exports=router;