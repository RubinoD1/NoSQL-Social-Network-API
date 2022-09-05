const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    // Username: string, unique, required, trimmed. 
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    // Email: string, required, unique, and match a valid email. 
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/]
    },
    // Thoughts: Array of _id values refrencing the Thought model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    // Friends: Array of _id values refrencing the User model (self-refrence)
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query. 
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;