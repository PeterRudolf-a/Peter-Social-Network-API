import { Schema, VirtualType, model, type Document } from 'mongoose'; // import types

// create user schema
interface IUser extends Document {
    username: string,
    email: string,
    thoughts: Schema.Types.ObjectId[],
    friends: Schema.Types.ObjectId[],
    friendCount: VirtualType<number>
}

// create user model
const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!'],
        },
        thoughts: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Thought',
                },
            ],
            default: [],
        },
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        timestamps: true
    },
);

// get total count of friends on retrieval
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model<IUser>('User', userSchema);

export default User;
