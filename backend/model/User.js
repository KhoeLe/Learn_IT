const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // User khong dc giong nhau
    },
    password: {
        type: String,
        required: true,
         min: 6,
        max: 64,
    }
},{ timestamps: true }
)

module.exports = mongoose.model('users', UserSchema);
                                    // ** users name table
                                    
