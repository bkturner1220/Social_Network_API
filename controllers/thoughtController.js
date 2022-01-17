const { Thought, User } = require('../models');


// Global variables
const log = console.log

const thoughtController = {
    //get all thoughts
   async getAllThoughts(req, res) {
        try {
            const dbThoughtData = await Thought.find({})
            log(dbThoughtData)

                .populate({
                    path: 'user',
                    select: '-__v'
            })
                .select('-__v')
                .sort({ _id: -1 })
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
                path: 'user',
                select: '-__v'
            })
           .select('-__v')
           .sort({ _id: -1 })
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
                    { new: true });
                })
                    if (!dbUserData) {
                        res.status(404).json({ message: 'No user found with this username!'});
                        return;
                    }
                    res.json(dbUserData)
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
                        if (!dbThoughtData) {
                        res.status(404).json({ message: 'No thought with this ID!' });
                        return;
                    }
                    res.json(dbThoughtData)
            } catch (error) {
                log(error);
                res.status(500).json(error);
        }},

    //delete Reaction
   async removeReaction({ params }, res) {
        try {
            const dbThoughtData = await Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $pull: { reactions: { reactionId: params.reactionId } } },
                { new: true });
                    res.json(dbThoughtData)
        } catch (error) {
            log(error);
            res.status(500).json(error);
    }},

    //update a thought by Id
   async updateThought({ params, body }, res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                { _id: params.id }, 
                body,
                { new: true, runValidators: true });
                if (!updatedThought) {
                    return res.status(404).json({ message: 'No thought with this ID!' });
                }
                   res.json(updatedThought);
        } catch (error) {
            log(error);
            res.status(500).json(error);
    }},

    //delete a thought by ID
   async deleteThought({ params, body}, res) {
        try {
            const deletedThought = await Thought.findOneAndDelete({ _id: params.id })
               if (!deletedThought) {
                return res.status(404).json({ message: 'No thought with this ID!'})
            }
                 res.json(deletedThought);
        } catch (error) {
            log(error);
            res.status(500).json(error);
    }},
}

module.exports = thoughtController