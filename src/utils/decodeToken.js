import { jwtVerify } from "jose";

export const decodeToken = async (token) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    const { payload } = await jwtVerify(token, secret);

    return payload;
  } catch (error) {
    console.error("Error decoding token:", error);
    throw new Error("Invalid or expired token");
  }
};
