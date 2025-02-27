import { Schema, model, type Document } from 'mongoose'; // import types

// create user schema
interface IUser extends Document {
    username: string, // username is required and must be a string
    email: string, // email is required and must be a string
    thoughts: Schema.Types.ObjectId[], // thoughts is an array of _id values referencing the Thought model
    friends: Schema.Types.ObjectId[], // friends is an array of _id values referencing the User model (self-reference)
}

// create user model
const userSchema = new Schema<IUser>(
    {
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
        thoughts: { // thoughts is an array of _id values referencing the Thought model
            type: [
                {
                    type: Schema.Types.ObjectId, // _id values are stored in an array
                    ref: 'Thought', // the ref property establishes the relationship between the data in the thoughts array and the Thought model
                },
            ],
            default: [],
        },
        friends: [ // friends is an array of _id values referencing the User model (self-reference)
            {
                type: Schema.Types.ObjectId, // _id values are stored in an array
                ref: 'User', // the ref property establishes the relationship between the data in the friends array and the User model
            },
        ],
    },
    {
        toJSON: {
            virtuals: true, // include virtual properties when data is requested
        },
        timestamps: true, // include timestamps (createdAt and updatedAt)
        id: false // disable the default virtual id property use _id instead
    },
);

// get total count of friends on retrieval
userSchema.virtual('friendCount').get(function () {
    return this.friends.length; // return the length of the user's friends array field on query
});

const User = model<IUser>('User', userSchema); // create the User model using the userSchema

export default User; // export the User model
