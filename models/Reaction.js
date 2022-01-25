const { Schema, model, Types } = require('mongoose');

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
        get: createdAtVal => (createdAtVal)
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