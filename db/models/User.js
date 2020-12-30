import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: "Invalid Email address" });
      }
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
  },
});

userSchema.pre("save", async function _(next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.methods.generateAuthToken = async function _() {
  const user = this;
  const token = jwt.sign({ _id: user.email }, process.env.JWT_KEY);
  return token;
};

userSchema.statics.findByCredentials = async function _(email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("User Does not Exist");
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Invalid login credentials");
  }
  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
