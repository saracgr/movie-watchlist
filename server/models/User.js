import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        watchlist: [String]
    },
    password: {
        type: String,
        required: true
    },
    watchlist: {
        type: [String],
        default: []
    }

});

const userModel = mongoose.model('users', userSchema)
export default userModel