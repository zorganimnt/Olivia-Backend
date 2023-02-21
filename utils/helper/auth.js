import jwt from 'jsonwebtoken';

const generateToken = ({ userInfo, key, time }) => {
  return jwt.sign({ userInfo }, key, {
    expiresIn: time,
  });
};

export const getUserInfo = (user) => {
  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    picture: user.picture,
  };
};

export default generateToken;
