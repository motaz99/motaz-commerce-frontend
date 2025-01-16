import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { employeeId, email, password } = await request.json();

    if (!employeeId || !email || !password) {
      return NextResponse.json(
        { error: "Employee ID, email, and password are required." },
        { status: 400 }
      );
    }

    const employee = await prisma.employees.findUnique({
      where: { id: employeeId },
    });

    if (!employee) {
      return NextResponse.json(
        { error: "Employee not found." },
        { status: 404 }
      );
    }

    if (employee.account) {
      return NextResponse.json(
        { error: "This employee already has an account." },
        { status: 400 }
      );
    }

    const existingAccount = await prisma.accounts.findUnique({
      where: { email },
    });

    if (existingAccount) {
      return NextResponse.json(
        { error: "Email is already in use." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10
    );

    const account = await prisma.accounts.create({
      data: {
        email,
        password: hashedPassword,
        employee: { connect: { id: employeeId } },
      },
    });

    return NextResponse.json(account, { status: 201 });
  } catch (error) {
    console.error("Error creating account:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const { accountId, email, password } = await request.json();

    if (!accountId || !email) {
      return NextResponse.json(
        { error: "Account ID and email are required." },
        { status: 400 }
      );
    }

    const updatedAccount = await prisma.accounts.update({
      where: { id: accountId },
      data: {
        email,
        password,
      },
    });

    return NextResponse.json(updatedAccount, { status: 200 });
  } catch (error) {
    console.error("Error updating account:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Account not found. Please provide a valid account ID." },
        { status: 404 }
      );
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
