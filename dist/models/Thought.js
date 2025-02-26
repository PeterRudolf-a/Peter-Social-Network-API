import { Schema, model, Types } from "mongoose"; // Importing Schema, model, and Types from mongoose
// Creating a schema for the Reaction document
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId, // reactionId is a Schema.Types.ObjectId
        default: () => new Types.ObjectId(), // default value is a new ObjectId
    },
    reactionBody: {
        type: String, // reactionBody is a string
        required: true, // required field
        maxlength: 280, // max length of 280 characters
    },
    username: {
        type: String, // username is a string
        required: true, // required field
    },
    createdAt: {
        type: Date, // createdAt is a Date
        default: Date.now, // default value is the current date
    },
}, {
    toJSON: {
        getters: true, // getters are enabled
    },
});
// Getter method to format the Reaction createdAt timestamp on query
reactionSchema.virtual("formattedCreatedAt").get(function () {
    return this.createdAt.toISOString(); // Returning the createdAt timestamp in ISO format
});
// Creating a schema for the Thought document
const ThoughtSchema = new Schema({
    thoughtText: {
        type: String, // thoughtText is a string
        required: true, // required field
        minlength: 1, // min length of 1 character
        maxlength: 280, // max length of 280 characters
    },
    createdAt: {
        type: Date, // createdAt is a Date
        default: Date.now, // default
    },
    username: {
        type: String, // username is a string
        required: true, // required field
    },
    reactions: [reactionSchema], // reactions is an array of reactionSchema
}, {
    toJSON: {
        virtuals: true, // virtuals are enabled
        getters: true, // getters are enabled
    },
    timestamps: true, // timestamps are enabled
});
// Getter method to format the Thought createdAt timestamp on query
ThoughtSchema.virtual("formattedCreatedAt").get(function () {
    return this.createdAt.toISOString(); // Returning the createdAt timestamp in ISO format
});
// Virtual to get the length of the reactions array
ThoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length; // Returning the length of the reactions array
});
const Reaction = model("Reaction", reactionSchema); // Creating the Reaction model
const Thought = model("Thought", ThoughtSchema); // Creating the Thought model
export { Thought, Reaction }; // Exporting the Thought and Reaction models
