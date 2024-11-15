import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, email, password, role = "admin" } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Username, email, and password are required." });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.users.create({
        data: {
          username,
          email,
          password: hashedPassword,
          role,
        },
      });

      res.status(201).json({
        message: "User created successfully.",
        data: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
        },
      });
    } catch (error) {
      if (error.code === "P2002") {
        return res
          .status(409)
          .json({ error: "Username or email already exists." });
      }
      res.status(500).json({ error: "Internal server error." });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed.`);
  }
}
