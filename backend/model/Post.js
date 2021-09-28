const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const PostSchema = new mongoose.Schema({
    title :{
        type: String,
    },
    description :{
        type: String,
    },
    url :{
        type: String,
    },
    status :{
        type: String,
        enum: ['TO LEARN', 'LEARNING', 'LEARNED']
        // enum: ['To Learn', 'Learning', ' Learned'] // ** Just show 3 status
    },
    user :{
        type: ObjectId,
        ref : 'users', required : true
    }
},
   { timestamps: true}
)


module.exports = mongoose.model('Post',PostSchema);
