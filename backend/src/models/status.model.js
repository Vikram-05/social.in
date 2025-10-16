import mongoose from 'mongoose'
import { User } from './user.model.js'


const statusSchema = mongoose.Schema({
    statusBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ststusByFullName : {
        type : String
    },
    ststusByUsername : {
        type : String
    },
    ststusByProfile : {
        type : String
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    caption: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: 60 * 60 * 24 } // 24 hours
    }
});

export const Status = mongoose.model('Status', statusSchema);

