module.exports = {
    seed: async function(context) {
        let { User, Thought, Reaction } = context;
        await User.create({ username: "testUser", email: "fake-email-" + Date.now() + "@fake-domain.com" });
        await User.create({ username: "testUser2", email: "fake-email-" + Date.now() + "@fake-domain.com" });
        await User.create({ username: "testUser3", email: "fake-email-" + Date.now() + "@fake-domain.com" });

        // Create a thought for testUser
    let thoughtId = await Thought.create({ username: "testUser", thoughtText: "This is a THOUGHT TEXT..." });
    await User.findOneAndUpdate({ username: "testUser" }, {
        $push: { thoughts: thoughtId }
    });
    
    // Create a reaction for testUser
    let reactionId = await Reaction.create({ username: "testUser", reactionBody: "This is a REACTION TEXT..." });
    await User.findOneAndUpdate({ username: "testUser" }, {
        $push: { reactions: reactionId }
    });

        return { User, Thought, Reaction };
    }
}