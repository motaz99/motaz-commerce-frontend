import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const employees = await prisma.employees.findMany();
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
      dateOfBirth,
      passportNumber,
      residencyCardNumber,
      idCardNumber,
      leaveBalance,
    } = await request.json();

    const newEmployee = await prisma.employees.create({
      data: {
        firstName,
        middleName,
        lastName,
        familyName,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        gender,
        dateOfBirth: new Date(dateOfBirth),
        passportNumber,
        residencyCardNumber,
        idCardNumber,
        leaveBalance: leaveBalance || 0,
      },
    });

    return NextResponse.json(newEmployee, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
