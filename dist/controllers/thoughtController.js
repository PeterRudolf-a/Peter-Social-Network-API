import { Thought, Reaction } from "../models/index.js"; // Import Thought and Reaction models
import { User } from "../models/index.js"; // Import User model
// Get all thoughts
export const getAllThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought.find(); // Find all thoughts
        res.json(thoughts);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
// Get thought by ID
export const getThoughtById = async (req, res) => {
    try {
        const { id } = req.params; // Destructure id from request parameters
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid thought ID format" }); // Check if id is a valid ObjectId
        }
        const thought = await Thought.findById(id); // Find thought by id
        if (!thought) {
            return res.status(404).json({ message: "No thought found with this id!" }); // Check if thought exists
        }
        return res.json(thought);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
// create new thought for a user where the user is identified by the username in the request body,
// and the created thought id is added to the user's thoughts array field
export const createThought = async (req, res) => {
    try {
        const thought = await Thought.create(req.body); // Create new thought
        const user = await User.findOneAndUpdate(// Find user by username and update
        { username: req.body.username }, // Destructure username from request body
        { $push: { thoughts: thought._id } }, // Push new thought to thoughts array
        { new: true } // Validate input and return new user
        );
        if (!user) {
            return res.status(404).json({ message: "No user found with this username!" }); // Check if user exists
        }
        return res.json(thought);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
// Update thought by ID
export const updateThought = async (req, res) => {
    try {
        const { id } = req.params; // Destructure id from request parameters
        const thought = await Thought.findByIdAndUpdate(// Find thought by id and update
        id, req.body, // Destructure updated thought from request body
        { new: true, runValidators: true } // Validate input and return new thought
        );
        if (!thought) {
            return res.status(404).json({ message: "No thought found with this id!" }); // Check if thought exists
        }
        return res.json(thought);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
// Delete thought by ID and remove it from the associated user's thoughts array field
export const deleteThought = async (req, res) => {
    try {
        const { id } = req.params; // Destructure id from request parameters
        const thought = await Thought.findByIdAndDelete(id); // Find thought by id and delete
        if (!thought) {
            return res.status(404).json({ message: "No thought found with this id!" }); // Check if thought exists
        }
        await User.findOneAndUpdate(// Find user by username and update
        { username: thought.username }, // Destructure username from thought
        { $pull: { thoughts: thought._id } }, // Pull thought from thoughts array
        { new: true } // Validate input and return new user
        );
        return res.json(thought);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
// Create new reaction
export const addReaction = async (req, res) => {
    try {
        const { reactionBody } = req.body; // Destructure reactionBody from request body
        const reaction = new Reaction({ reactionBody }); // Create new Reaction instance
        const thought = await Thought.findByIdAndUpdate(// Find thought by id and update
        req.params.thoughtId, // Destructure thoughtId from request parameters
        { $push: { reactions: reaction } }, // Push new reaction to reactions array
        { new: true } // Validate input and return new thought
        );
        if (!thought) {
            res.status(404).json({ message: "No thought found with this id!" }); // Check if thought exists
            return;
        }
        res.json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
// Remove reaction
export const removeReaction = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(// Find thought by id and update
        req.params.thoughtId, // Destructure thoughtId from request parameters
        { $pull: { reactions: { reactionId: req.params.reactionId } } }, // Pull reaction by reactionId
        { new: true } // Validate input and return new thought
        );
        if (!thought) {
            res.status(404).json({ message: "No thought found with this id!" }); // Check if thought exists
            return;
        }
        res.json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
