const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../helpers/dataFormat');

const ReactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      userReaction: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 280
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      }
    },
    {
      toJSON: {
        getters: true
      },
      id: false,
       _id: false
    }
  );

  module.exports = ReactionSchema;