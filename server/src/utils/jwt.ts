import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET: string = process.env.JWT_SECRET || "example-secret";

const generateToken = (id: string): string => {
  const token = jwt.sign(id, JWT_SECRET);
  return token;
};

const verifyToken = (token: string): JwtPayload | string | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded) {
      return decoded;
    }

    return null;
  } catch (error) {
    throw error;
  }
};

export { generateToken, verifyToken };
