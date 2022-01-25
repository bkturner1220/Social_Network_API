const { Schema, model, Types } = require('mongoose');
const ReactionSchema = require("./Reaction");

const ThoughtSchema = new Schema (
    {
        userThought: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => (createdAtVal)
        },
        username: {
            type: String,
            required: true,
            ref: 'User'
        },
        reactions: [ReactionSchema],
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
  }
)

const Thought = model('Thought', ThoughtSchema);

  ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

module.exports = Thought;