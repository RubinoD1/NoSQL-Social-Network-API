const { Schema, model, Types } = require("mongoose");
//imports date format function 
const dateFormat = require("../utils/dateFormat");

const ReactionSchema = new Schema(
  {
      reactionId: {
      //Mongoose's ObjectId data type
      type: Schema.Types.ObjectId,
      // Default value is set to a new ObjectId
      default: () => new Types.ObjectId(),
    },
    // reactionBody: string, required, 280 characters maximum
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    // username: string, required 
    username: {
      type: String,
      required: true,
    },
    
    createdAt: {
      type: Date,
      // deafult value for the current timestamp
      default: Date.now,
      // getter method to format the timestamp on query
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const ThoughtSchema = new Schema(
  {
    // Thought text: string, required and must be between 1 and 280 characters. 
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    // Created at: date, set default value to the current timestamp on query
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    // Username (the user that created this thought): string, required. 
    username: {
      type: String,
      required: true,
    },
    
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;