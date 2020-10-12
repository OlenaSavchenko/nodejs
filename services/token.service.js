const jwt = require("jsonwebtoken");

const createVerificationToken = async (payload) => {
  const token = await jwt.sign(payload, process.env.ACCESS_KEY);
  return `Bearer ${token}`;
};

const verifyToken = async (token) => {
  return await jwt.verify(token, process.env.ACCESS_KEY);
};
module.exports = {
  createVerificationToken,
  verifyToken,
};
