import { Request, Response } from "express"; // Import types from Express library
import { Thought, Reaction } from "../models/index.js"; // Import Thought and Reaction models

// Get all thoughts
export const getAllThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find(); // Find all thoughts
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get thought by ID
export const getThoughtById = async (req: Request, res: Response) => {
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
  } catch (err) {
    return res.status(500).json(err);
  }
};

// create new thought
export const createThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.create(req.body); // Create new thought
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update thought by ID
export const updateThought = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Destructure id from request parameters
    const thought = await Thought.findByIdAndUpdate( // Find thought by id and update
      id,
      req.body, // Destructure updated thought from request body
      { new: true, runValidators: true } // Validate input and return new thought
    );
    if (!thought) {
      return res.status(404).json({ message: "No thought found with this id!" }); // Check if thought exists
    }
    return res.json(thought);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// Delete thought by ID
export const deleteThought = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Destructure id from request parameters
    const thought = await Thought.findByIdAndDelete(id); // Find thought by id and delete
    if (!thought) {
      return res.status(404).json({ message: "No thought found with this id!" }); // Check if thought exists
    }
    return res.json(thought);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// Create new reaction
export const addReaction = async (req: Request, res: Response) => {
  try {
    const { reactionBody } = req.body; // Destructure reactionBody from request body
    const reaction = new Reaction({ reactionBody }); // Create new Reaction instance
    const thought = await Thought.findByIdAndUpdate( // Find thought by id and update
      req.params.thoughtId, // Destructure thoughtId from request parameters
      { $push: { reactions: reaction } }, // Push new reaction to reactions array
      { new: true } // Validate input and return new thought
    );
    if (!thought) {
      res.status(404).json({ message: "No thought found with this id!" }); // Check if thought exists
      return;
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
}

// Remove reaction
export const removeReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndUpdate( // Find thought by id and update
      req.params.thoughtId, // Destructure thoughtId from request parameters
      { $pull: { reactions: { reactionId: req.params.reactionId } } }, // Pull reaction by reactionId
      { new: true } // Validate input and return new thought
    );
    if (!thought) {
      res.status(404).json({ message: "No thought found with this id!" }); // Check if thought exists
      return;
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
}
