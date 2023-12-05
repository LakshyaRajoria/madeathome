// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema({
//     username: {type: String, required: true, unique: true}, 
//     password: {type: String, required: true}, 
// })

// export const User = mongoose.model('User', UserSchema);

import mongoose from "mongoose"; 
import bcrypt from "bcrypt"; 

const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  hashedPassword: {
    type: String,
    required: true
  }
});

// Pre-save hook to hash password before saving it to the database
userSchema.pre('save', function(next) {
  const user = this;

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('hashedPassword')) return next();

  // Generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    // Hash the password using the generated salt
    bcrypt.hash(user.hashedPassword, salt, (err, hash) => {
      if (err) return next(err);

      // Override the cleartext password with the hashed one
      user.hashedPassword = hash;
      next();
    });
  });
});

export const User = mongoose.model('User', userSchema);

