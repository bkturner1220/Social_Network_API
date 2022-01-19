const { Thought, User } = require('../models');


// Global variables
const log = console.log

const thoughtController = {
    //get all thoughts
   
   
   
    async getAllThoughts(req, res) {
        try {
            const dbThoughtData = await Thought.find({})
                .populate({
                    path: 'thought',
                    select: '-__v'
            })
                .select('-__v')
                .sort({ createdAt: -1 })
                    res.json(dbThoughtData);
        } catch (error) {
            log(error);
            res.status(500).json(error);
        }},
    //get one thought by ID
    async getThoughtById({ params }, res) {
        try {
            const dbUserData = await Thought.findOne({ _id: params.id })
            .populate({
                path: 'thought',
                select: '-__v'
            })
           .select('-__v')
           .sort({ createdAt: -1 })
           res.json(dbUserData)
        } catch (error) {
            log(error);
            res.status(500).json(error);
        }},

    //create thought
    async createThought({ params, body }, res) {
        try {
            const dbUserData = await Thought.create(body)
            .then(({ _id}) => {
                return User.findOneAndUpdate(
                    { username: body.username },
                    { $push: { thoughts: _id }},
                    { new: true })});
                    if (dbUserData) {
                        res.status(200).json({ message: `Thought was created successfully!`})
                    } else {
                        res.status(404).json({ message: 'No user found with this username!'});
                        log(dbUserData);
                    }
        } catch (error) {
            log(error);
            res.status(500).json(error);
        }},

    //add reaction
   async addReaction ({ params, body}, res) {
            try {
                const dbThoughtData = await Thought.findOneAndUpdate(
                    { _id: params.thoughtId },
                    { $push: { reactions: body }},
                    { new: true, runValidators: true });
                        if (dbThoughtData) {
                            res.status(200).json({ message: 'Reaction added to thought successfully!' });
                    } else {
                        res.status(404).json({ message: 'No thought with this ID!' });
                        log(dbThoughtData);
                    }
            } catch (error) {
                log(error);
                res.status(500).json(error);
        }},

    //delete Reaction
   async removeReaction({ params }, res) {
        try {
            const dbThoughtData = await Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $pull: { reactions: { reactionId: params.reactionId }}},
                { new: true, runValidators: true });
                if (dbThoughtData) {
                    res.status(200).json({ message: 'Reaction deleted successfully!'});
                } else {
                    res.status(404).json({ message: 'No reaction with this ID!' });
                    log(dbThoughtData);
                }
        } catch (error) {
            log(error);
            res.status(500).json(error);
    }},

    //update a thought by ID
   async updateThought({ params, body }, res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                { _id: params.id }, 
                body,
                { new: true, runValidators: true });
                if (updatedThought) {
                    res.status(200).json({ message: 'Thought updated successfully!'});
                } else {
                    res.status(404).json({ message: 'No thought with this ID!' });
                    log(updatedThought);
                }
        } catch (error) {
            log(error);
            res.status(500).json(error);
    }},

    //delete a thought by ID
   async deleteThought({ params, body}, res) {
        try {
            const deletedThought = await Thought.findOneAndDelete({ _id: params.id })
               if (deletedThought) {
                    res.status(200).json({ message: 'Thought deleted successfully!'})
               } else {
                    res.status(404).json({ message: 'No thought with this ID!'})
                    log(deletedThought)
                }
        } catch (error) {
            log(error);
            res.status(500).json(error);
    }},
}

module.exports = thoughtController