const { Schema, model } = require("mongoose");
const thoughtSchema = require("./Thought");

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trip: true,
      max_length: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: () => Promise.resolve(false),
        message: 'Email validation failed'
      }
    },
    thoughts: [thoughtSchema],
    friends: [userSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = db.model('User', userSchema);
const user = new User();

user.email = 'test@test.co';

let error;
try {
  await user.validate();
} catch (err) {
  error = err;
}
assert.ok(error);
assert.equal(error.errors['email'].message, 'Email validation failed');

const Student = model("student", studentSchema);

module.exports = Student;
