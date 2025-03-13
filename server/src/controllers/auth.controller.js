import {
  BadRequestError,
  DatabaseConnectionError,
  Jwt,
} from "@bhtickix/common";
import User from "../models/user.model.js";

const getSelf = async (req, res) => {
  if (!req.currentUser) {
    return res.status(200).send({ currentUser: null });
  }
  const user = await User.findById(req.currentUser.id);
  res.status(200).send({ currentUser: user });
};

const postSignin = async (req, res) => {
  const { email, password } = req.body;

  const existedUser = await User.findOne({ email });
  if (!existedUser) {
    throw new BadRequestError("Email not found");
  }

  const isMatch = await existedUser.matchPassword(password);
  if (!isMatch) {
    throw new BadRequestError("Invalid credentials");
  }

  // Generate JWT and store it in the session object
  const userPayload = {
    id: existedUser.id,
    email: existedUser.email,
    name: existedUser.name,
    isAdmin: existedUser.isAdmin,
    YOB: existedUser.YOB,
    gender: existedUser.gender,
  };
  const userJwt = Jwt.sign(userPayload);
  req.session = {
    jwt: userJwt,
  };

  res.status(200).send(existedUser);
};

const postSignup = async (req, res) => {
  const { name, YOB, gender, email, password } = req.body;

  const newUser = new User({
    name,
    YOB,
    gender,
    email,
    password,
  });

  try {
    await newUser.save();
  } catch (error) {
    throw new DatabaseConnectionError();
  }

  res.status(201).send(newUser);
};

const postSignout = async (req, res) => {
  req.session = null;
  res.status(200).send({});
};

export default { getSelf, postSignin, postSignup, postSignout };
