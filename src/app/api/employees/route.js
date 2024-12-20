import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const employees = await prisma.employees.findMany({
      where: {
        isActive: true,
      },
    });
    return NextResponse.json(employees, { status: 200 });
  } catch (error) {
    console.error("Error fetching employees:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const {
      firstName,
      middleName,
      lastName,
      familyName,
      startDate,
      endDate,
      gender,
      role,
      phoneNumber,
      dateOfBirth,
      sindibadId,
      leaveBalance,
    } = await request.json();

    if (
      !firstName ||
      !lastName ||
      !startDate ||
      !gender ||
      !role ||
      !phoneNumber ||
      !dateOfBirth ||
      !sindibadId
    ) {
      return NextResponse.json(
        {
          error: "All required fields, including sindibadId, must be provided.",
        },
        { status: 400 }
      );
    }

    const newEmployee = await prisma.employees.create({
      data: {
        firstName,
        middleName,
        lastName,
        familyName,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        gender,
        role,
        phoneNumber,
        dateOfBirth: new Date(dateOfBirth),
        sindibadId,
        leaveBalance: leaveBalance || 0,
      },
    });

    return NextResponse.json(newEmployee, { status: 201 });
  } catch (error) {
    console.error("Error creating employee:", error);

    // Handle unique constraint violation for sindibadId
    if (error.code === "P2002" && error.meta?.target.includes("sindibadId")) {
      return NextResponse.json(
        { error: "Sindibad ID already exists. Please provide a unique ID." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
