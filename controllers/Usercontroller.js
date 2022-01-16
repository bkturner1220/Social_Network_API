const { User } = require('../models')

// Global variables
const log = console.log

const userController = {
    //get all users
    getAllUsers(req,res) {
        try {
            const dbUserData = User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
             })
            .select('-__v')
            res.json(dbUserData)
        } catch (error) {
            log(error);
            res.status(500).json(error);
        }},

    //get User by ID with thoughts
    getUserById({ params }, res) {
        try {
            const dbUserData = User.findOne({ _id: params.id })
           .populate({
               path: 'thoughts',
               select: '-__v'
            })
            .populate ({
                path: 'friends',
                select: '-__v'
            })
           .select('-__v')
            res.json(dbUserData);
        } catch (error) {
            log(error);
            res.status(500).json(error);
        }},

     //create User
     createUser({ body }, res) {
         const dbUserData = User.create(body);
         try {
            res.json(dbUserData);
         } catch (error) {
            log(error);
            res.status(500).json(error);
     }},
  
     //add friend
     addFriend({ params }, res) {
         try {
            const dbUserData = User.findOneAndUpdate(
                {_id: params.userId},
                { $push: { friends: params.friendId }},
                { new: true, runValidators: true});
                    if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this ID!' });
                    return;
                    };
                        res.json(dbUserData);
         } catch (error) {
            log(error);
            res.status(500).json(error);
         }},

     //update User
     updateUser({ params, body}, res) {
         try {
            const dbUserData =  User.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true});
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this ID!' });
                return;
            }
            res.json(dbUserData);
         } catch (error) {
            log(error);
            res.status(500).json(error);
        }
    },

     //delete User
     deleteUser({ params }, res) {
        try {
            const dbUserData = User.findOneAndDelete({ _id: params.id });
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this ID!' });
                return;
            }
            res.json(dbUserData); 
        } catch (error) {
            log(error);
            res.status(500).json(error);
    }},

     //remove Friend
     removeFriend( { params }, res) {
        try {
            const dbUserData = User.findOneAndUpdate(
             { _id: params.userId },
             { $pull: { friends: params.friendId }},
             { new: true});
             if (!dbUserData) {
                res.status(404).json({ message: 'No user found at this id!' });
                return;
            }
                res.json(dbUserData);
        } catch (error) {
            log(error);
            res.status(500).json(error);
        }},
}

module.exports = userController