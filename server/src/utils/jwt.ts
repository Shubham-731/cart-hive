import jwt from "jsonwebtoken";

const JWT_SECRET: string = process.env.JWT_SECRET || "example-secret";

const generateToken = (id: string): string => {
  const token = jwt.sign(id, JWT_SECRET);
  return token;
};

export { generateToken };
