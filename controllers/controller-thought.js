const { Thought, User } = require('../models');

// Global variables
const log = console.log

const thoughtController = {
    //get all thoughts
    getAllThoughts(req, res) {
        try {
            const dbThoughtData = Thought.find({})
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
    getThoughtById({ params }, res) {
        try {
            const dbUserData = Thought.findOne({ _id: params.id })
            .populate({
                path: 'user',
                select: '-__v'
            })
           .select('-__v')
           .sort({ _id: -1 })
            res.json(dbThoughtData)
        } catch (error) {
            log(error);
            res.status(500).json(error);
        }},

    //create thought
    createThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id}) => {
                return User.findOneAndUpdate(
                    { username: body.username },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this username!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
        },

    //add reaction
    addReaction ({ params, body}, res) {
            try {
                const dbThoughtData = Thought.findOneAndUpdate(
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
    removeReaction({ params }, res) {
        try {
            const dbThoughtData = Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $pull: { reactions: { reactionId: params.reactionId } } },
                { new: true });
                    res.json(dbThoughtData)
        } catch (error) {
            log(error);
            res.status(500).json(error);
    }},

    //update a thought by Id
    updateThought({ params, body }, res) {
        try {
            const updatedThought = Thought.findOneAndUpdate(
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
    deleteThought({ params, body}, res) {
        try {
            const deletedThought = Thought.findOneAndDelete({ _id: params.id })
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