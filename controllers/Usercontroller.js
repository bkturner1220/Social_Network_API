const { User } = require('../models')

// Global variables
const log = console.log

const userController = {
    //get all users
    async getAllUsers(req,res) {
        try {
            log('GET ALL USERS');
            const dbUserData = await User.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
             })
            .select('-__v')
            res.json(dbUserData)
            log(dbUserData)
        } catch (error) {
            log(error);
            res.status(500).json(error);
        }},

    //get User by ID by thoughts
   async getUserById({ params }, res) {
        try {
            const dbUserData = await User.findOne({ _id: params.id })
           .populate({
               path: 'userThought',
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
    async createUser({ body }, res) {
         const dbUserData = await User.create(body);
         try {
            if (dbUserData) {
                res.status(200).json({ message: `User was created successfully!`})
            } else {
                res.status(404).json({ message: 'Error, please try again!'});
            }
         } catch (error) {
            log(error);
            res.status(500).json(error);
     }},
  
     //update User
     async updateUser({ params, body}, res) {
         try {
            const dbUserData = await User.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true});
            if (dbUserData) {
                res.status(200).json({ message: `User was updated successfully!`})
            } else {
                res.status(404).json({ message: 'No user found with this username!'});
            }
            res.json(dbUserData);
         } catch (error) {
            log(error);
            res.status(500).json(error);
        }
    },

     //delete User
    async deleteUser({ params }, res) {
        try {
            const dbUserData = await User.findOneAndDelete({ _id: params.id });
            if (dbUserData) {
                res.status(200).json({ message: `User was deleted successfully!`})
            } else {
                res.status(404).json({ message: 'No user found with this username!'});
            }
        } catch (error) {
            log(error);
            res.status(500).json(error);
    }},

         //add friend to User
         async addFriend({ params }, res) {
            try {
               const dbUserData = await User.findOneAndUpdate(
                   {_id: params.userId},
                   { $push: { friends: params.friendId }},
                   { new: true, runValidators: true});
                   if (dbUserData) {
                       res.status(200).json({ message: `Friend was created successfully!`})
                   } else {
                       res.status(404).json({ message: 'No user found with this username!'});
                   }
            } catch (error) {
               log(error);
               res.status(500).json(error);
            }},

     //remove Friend
   async removeFriend( { params }, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
             { _id: params.userId },
             { $pull: { friends: params.friendId }},
             { new: true});
             if (dbUserData) {
                res.status(200).json({ message: `Friend was deleted successfully!`})
            } else {
                res.status(404).json({ message: 'No user found with this username!'});
            }
        } catch (error) {
            log(error);
            res.status(500).json(error);
        }},
}

module.exports = userController