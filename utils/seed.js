const connect = require("../config/connection").start();
const express = require('express');
const mongoose = require("mongoose");

// Global Variables
const log = console.log

// Models
const { User, Thought, Reaction } = require("../models");

(async() => {
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
    await User.create({ username: "testUser", email: "fake-email-" + Date.now() + "@fake-domain.com" });
    await User.create({ username: "testUser2", email: "fake-email-" + Date.now() + "@fake-domain.com" });
    await User.create({ username: "testUser3", email: "fake-email-" + Date.now() + "@fake-domain.com" });

    // Create a thought for testUser
    let thoughtId = await Thought.create({ username: "testUser", thoughtText: "This is a THOUGHT TEXT..." });
    await User.findOneAndUpdate({ username: "testUser" }, {
        $push: { thoughts: thoughtId }
    });
    
    await mongoose.disconnect();
})();