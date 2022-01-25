const connection = require('../config/connection');

// Global Variables
const log = console.log

// Start the seeding runtime timer
console.time('Seeding SocialDB via MongoDB...');

// Models
const { User, Thought } = require("../models");

connection.once('open', async () => {

    // Empty models
    await User.deleteMany({}, (error, result) => {
        if (error) {
            log(error);
        }
    });
    await Thought.deleteMany({}, (error, result) => {
        if (error) {
            log(error);
        }
    });

    // Create users
    await User.create({ username: "newUser", email: "newUser@email.com" });
    await User.create({ username: "newUser2", email: "newUser2@email.com" });
    await User.create({ username: "newUser3", email: "newUser3@email.com" });
    await User.create({ username: "newUser4", email: "newUser4@email.com" });

    let newUserThought = await Thought.create({ username: "newUser", userThought: "I love this social network api!" });
    await User.findOneAndUpdate({ username: "newUser" }, {
        $push: { thoughts: newUserThought }
    });

    let newUser2Thought = await Thought.create({ username: "newUser2", userThought: "I love this social network api too! It's Awesome!!!" });
    await User.findOneAndUpdate({ username: "newUser2" }, {
        $push: { thoughts: newUser2Thought }
    });

    
    console.timeEnd('Seeding successfully completed!');
    process.exit(0);
});