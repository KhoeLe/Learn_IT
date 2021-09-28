const express = require('express');
const { postStory, getStory,storyUpdate ,storyDelete} = require('../controller/post');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();


router.post("/story",verifyToken, postStory);
router.get("/storyDetails",verifyToken, getStory);
router.put("/storyDetails/:id",verifyToken, storyUpdate);
router.delete("/storyDelete/:id",verifyToken, storyDelete);




module.exports = router;
