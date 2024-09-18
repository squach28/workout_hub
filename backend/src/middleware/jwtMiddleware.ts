import jwt from "jsonwebtoken";

export const generateJWT = (uuid: string) => {
  const token = jwt.sign({ uuid: uuid }, process.env.JWT_SECRET!);
  return token;
};

export const verifyJWT = (token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!);
  return decoded;
};
