import { Request, Response } from "express";
import { User } from "../models/index";

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "No user found with this id!" });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params
        .id, req.body, { new: true });
    if (!user) {
      res.status(404).json({ message: "No user found with this id!" });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ message: "No user found with this id!" });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const addFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId,
        { $addToSet: { friends: req.params.friendId } }, { new: true });
    if (!user) {
      res.status(404).json({ message: "No user found with this id!" });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const removeFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId,
        { $pull: { friends: req.params.friendId } }, { new: true });
    if (!user) {
      res.status(404).json({ message: "No user found with this id!" });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}

