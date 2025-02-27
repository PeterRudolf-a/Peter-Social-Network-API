import db from '../config/connection.js'; // Import connection to database
import { User, Thought } from '../models/index.js'; // Import User and Thought models
import cleanDB from './cleanDB.js';
const seedDatabase = async () => {
    try {
        await db();
        await cleanDB();
        // Create users
        const users = await User.create([
            {
                username: 'user1',
                email: 'user1@gmail.com',
                password: 'password1',
            },
            {
                username: 'user2',
                email: 'user2@hotmail.com',
                password: 'password2',
            },
            {
                username: 'sarah',
                email: 'sarah4@gmail.com',
                password: 'password3',
            }
        ]);
        // Create thoughts
        const thoughts = await Thought.create([
            {
                thoughtText: 'This is a thought',
                username: 'user1',
            },
            {
                thoughtText: 'This is another thought',
                username: 'user2',
            },
            {
                thoughtText: 'This is yet another thought',
                username: 'sarah',
            }
        ]);
        // Add thoughts to users
        await User.findOneAndUpdate({ username: 'user1' }, { $push: { thoughts: thoughts[0]._id } });
        await User.findOneAndUpdate({ username: 'user2' }, { $push: { thoughts: thoughts[1]._id } });
        await User.findOneAndUpdate({ username: 'sarah' }, { $push: { thoughts: thoughts[2]._id } });
        // Add reactions to thoughts
        const thoughtId = thoughts[0]._id;
        // Add reactions to the first thought
        await Thought.findByIdAndUpdate(thoughtId, {
            $addToSet: {
                reactions: {
                    reactionBody: 'This is a reaction',
                    username: 'user1',
                }
            }
        });
        // Add another reaction to the first thought
        await Thought.findByIdAndUpdate(thoughtId, {
            $addToSet: {
                reactions: {
                    reactionBody: 'This is another reaction',
                    username: 'user2000',
                }
            }
        });
        // Add reactions to the second thought
        const secondThoughtId = thoughts[1]._id; // Get the ID of the second thought
        // Add reactions to the second thought
        await Thought.findByIdAndUpdate(secondThoughtId, {
            $addToSet: {
                reactions: {
                    reactionBody: 'This is a reaction to the second thought',
                    username: 'sarah',
                }
            }
        });
        // Add another reaction to the second thought
        await Thought.findByIdAndUpdate(secondThoughtId, {
            $addToSet: {
                reactions: {
                    reactionBody: 'This is another reaction to the second thought',
                    username: 'user1',
                }
            }
        });
        console.table(users);
        console.table(thoughts);
        process.exit(0);
    }
    catch (err) {
        console.error(`Error seeding database: ${err}`);
        process.exit(1);
    }
};
seedDatabase();
