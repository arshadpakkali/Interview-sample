import logger from "@shared/logger";
import User from "@models/User";
import { CREATED, BAD_REQUEST } from "http-status-codes";

const UserController = {};

UserController.signup = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(CREATED).send({ token });
  } catch (error) {
    logger.err(error);
    res.status(BAD_REQUEST).send(error);
  }
};

UserController.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    return res.send({ token });
  } catch (error) {
    return res.status(BAD_REQUEST).send({ error: error.message });
  }
};

export default UserController;
