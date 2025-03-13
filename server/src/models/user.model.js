import mongoose, { Schema } from "mongoose";
import { PasswordBcrypt } from "@bhtickix/common";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    name: { type: String, required: true },
    YOB: { type: Number, required: true },
    gender: { type: Boolean, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashedPassword = await PasswordBcrypt.hashPassword(this.password);
    this.set("password", hashedPassword);
  }

  done();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await PasswordBcrypt.comparePassword(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
