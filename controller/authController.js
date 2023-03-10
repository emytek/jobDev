import User from "../models/User.js"
import {StatusCodes} from "http-status-codes"
import BadRequestError from "../errors/bad-request.js";

const register = async (req, res ) => {
    const { name, email, password } = req.body;

    if (!name && !email && !password) {
      throw new BadRequestError('please provide all values');
    }

    //alternative way to handle duplicate errors
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      throw new BadRequestError('Email already in use');
    }
      const user = await User.create({name, email, password})
      const token = user.createJWT()
      res.status(StatusCodes.CREATED).json({
        user: {
          email: user.email,
          lastName: user.lastName,
          location: user.location,  
          name: user.name,
        },
        token,
        location: user.location,
      });
}

const login = async (req, res) => {
    res.send('Login user')
}

const updateUser = async (req, res) => {
    res.send('update user')
}

export { register, login, updateUser}