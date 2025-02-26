import { User } from "../models/index.js"; // Import the User model
// Find all users
export const getAllUsers = async (_req, res) => {
    try {
        const users = await User.find(); // Find all users
        res.json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
// Get a user by id
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // Find a user by id
        if (!user) {
            res.status(404).json({ message: "No user found with this id!" }); // Check if user exists
            return;
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
// Create a new user
export const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body); // Create a new user
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
// Update a user
export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); // Find a user by id and update it
        if (!user) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
// Delete a user
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id); // Find a user by id and delete it
        if (!user) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
// Add a friend to a user
export const addFriend = async (req, res) => {
    try {
        const friendId = req.body.userId; // Extract the userId from the request body
        const user = await User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: friendId } }, // Add the friendId directly
        { new: true }); // Find a user by id and add a friend
        if (!user) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
// Remove a friend from a user
export const removeFriend = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true }); // Find a user by id and remove a friend
        if (!user) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
