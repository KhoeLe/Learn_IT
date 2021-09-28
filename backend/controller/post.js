const Post = require("../model/Post");

// ** POST ** Create Story
// ** access Private

const postStory = async (req, res) => {
  const { title, description, url, status } = req.body;

  if (!title) {
    return res.status(400).json({
      success: false,
      error: "Title is required",
    });
  }
  try {
    const newPost = new Post({
      title,
      description,
      url: url.startsWith("https://") ? url : `https://${url}`,
      status: status || "TO LEARN",
      // user: ''
      user: req._id,
    });

    await newPost.save();

    res.json({
      success: true,
      message: "Happy learning!",
      Post: newPost,
    });
  } catch (error) {
    console.log("POST FAILED => ", error);
    return res.status(500).send("Error. Try again.");
  }
};

// ** GET ** get storyDetails
// ** access Private

const getStory = async (req, res) => {
  try {
    const post = await Post.find({ user: req._id }).populate("user", [
      "username",
    ]);
    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    console.log("GET DETAILS FAILED => ", error);
    return res.status(500).send("Error. Try again.");
  }
};


// ** Update ** update storyUpdate
// ** access Private

const storyUpdate = async (req, res) => {
  const { title, description, status, url } = req.body;

  if (!title) {
    return res.status(400).json({
      success: false,
      error: "Title is required",
    });
  }
  try {
    let storyUpdated =  {
      title,
      description: description ||'',
      url: (url.startsWith("https://") ? url : `https://${url}`)|| '',
      status: status || "TO LEARN",
    };

    const storyUpdateConditions = {_id: req.params.id , user: req._id};

    console.log(storyUpdateConditions)
    storyUpdated = await Post.findByIdAndUpdate(storyUpdateConditions,storyUpdated ,{new:true})

    // ** User not authorized to update post and post not found
    if(!storyUpdated){
        return res.status(400).json({
            success: false,
            error : 'Update not found and user not authorized'
        })
    }

    res.json({
      success: true,
      message: "Excellent process!",
      Post: storyUpdated,
    });
  } catch (error) {
    console.log("POST FAILED => ", error);
    return res.status(500).send("Error. Try again.");
  }
};

// ** Delete ** delete story
// ** access Private


const storyDelete = async (req, res) => {
    try {
        const storyDeleteConditions = {_id: req.params.id , user: req._id};

        const storyDelete = await Post.findByIdAndDelete(storyDeleteConditions)

        // ** User not authorized to update post and post not found
    if(!storyDelete){
        return res.status(400).json({
            success: false,
            error : 'Update not found and user not authorized'
        })
    }

    res.json({
      success: true,
      message: "Delete process!",
      Post: storyDelete,
    });

    } catch (error) {
        console.log("DELETE FAILED => ", error);
        return res.status(500).send("Error. Try again.");
    }
}

module.exports = { postStory, getStory,storyUpdate,storyDelete };
