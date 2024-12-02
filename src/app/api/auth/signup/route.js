import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { username, email, password, role = "admin" } = await request.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Username, email, and password are required." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10
    );

    const newUser = await prisma.users.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role,
      },
    });

    return NextResponse.json(
      {
        message: "User created successfully.",
        data: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    // Prisma error for unique constraint violation
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Username or email already exists." },
        { status: 409 }
      );
    }

    console.error("Signup error:", error);

    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
