import { User, Thought, Reaction } from '../models/index.js';

const cleanDB = async (): Promise<void> => {
  try {
    await User.deleteMany({});
    await Thought.deleteMany({});
    await Reaction.deleteMany({});
    console.log('Database cleaned.');
  } catch (err) {
    console.error('Error cleaning database:', err);
  }
};

export default cleanDB;
