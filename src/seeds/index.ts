import db from '../config/connection.js';
import { User, Thought } from '../models/index.js';
import cleanDB from './cleanDB.js';

try {
    await db();
    await cleanDB();

    const users = await User.create([
        {
            username: 'user1',
            email: 'user1@gmail.com',
            password: 'password1',
        },
        {
            username: 'user2000',
            email: '20033sdf@hotmail.com',
            password: 'password2',
        },
        {
            username: 'sarah',
            email: 'sarah4@gmail.com',
            password: 'password3',
        }
    ]);

    console.log('Users created:', users);

    const thoughts = await Thought.create([
        {
            thoughtText: 'This is a thought',
            username: 'user1',
        },
        {
            thoughtText: 'This is another thought',
            username: 'user2000',
        },
        {
            thoughtText: 'This is yet another thought',
            username: 'sarah',
        }
    ]);

    console.log('Thoughts created:', thoughts);

    // Now, let's add reactions to the first thought as an example
    const thoughtId = thoughts[0]._id; // Get the ID of the first thought

    // Add reactions to the first thought
    await Thought.findByIdAndUpdate(thoughtId, {
        $addToSet: {
            reactions: {
                reactionBody: 'This is a reaction',
                username: 'user1',
            }
        }
    });

    await Thought.findByIdAndUpdate(thoughtId, {
        $addToSet: {
            reactions: {
                reactionBody: 'This is another reaction',
                username: 'user2000',
            }
        }
    });

    const secondThoughtId = thoughts[1]._id; // Get the ID of the second thought

    await Thought.findByIdAndUpdate(secondThoughtId, {
        $addToSet: {
            reactions: {
                reactionBody: 'This is a reaction to the second thought',
                username: 'sarah',
            }
        }
    });

    await Thought.findByIdAndUpdate(secondThoughtId, {
        $addToSet: {
            reactions: {
                reactionBody: 'This is another reaction to the second thought',
                username: 'user1',
            }
        }
    });
    
    console.log('Reactions added to thoughts.');


    console.table(users);
    console.table(thoughts);
    console.log('Database seeded.');
    process.exit(0);
} catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
}