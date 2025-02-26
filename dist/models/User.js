import { Schema, model } from 'mongoose'; // import types
// create user model
const userSchema = new Schema({
    username: {
        type: String, // username is a string
        required: true, // username is required
        unique: true, // username is unique
        trim: true, // removes whitespace from the beginning and end of a string
    },
    email: {
        type: String, // email is a string
        required: true, // email is required
        unique: true, // email is unique
        match: [/.+@.+\..+/, 'Must match an email address!'], // must match an email address
    },
    thoughts: {
        type: [
            {
                type: Schema.Types.ObjectId, // _id values are stored in an array
                ref: 'Thought', // the ref property establishes the relationship between the data in the thoughts array and the Thought model
            },
        ],
        default: [],
    },
    friends: [
        {
            type: Schema.Types.ObjectId, // _id values are stored in an array
            ref: 'User', // the ref property establishes the relationship between the data in the friends array and the User model
        },
    ],
}, {
    toJSON: {
        virtuals: true, // include virtual properties when data is requested
    },
    timestamps: true // include timestamps (createdAt and updatedAt)
});
// get total count of friends on retrieval
userSchema.virtual('friendCount').get(function () {
    return this.friends.length; // return the length of the user's friends array field on query
});
const User = model('User', userSchema); // create the User model using the userSchema
export default User; // export the User model
