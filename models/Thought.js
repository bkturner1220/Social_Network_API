const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../helpers/dataFormat');
const ReactionSchema = require("./Reaction");

const ThoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
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

  // get total count of friends on retrieval
  ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });


module.exports = Thought;