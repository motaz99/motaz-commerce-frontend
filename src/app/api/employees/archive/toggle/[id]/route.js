import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request, { params }) {
  const { id } = params;

  try {
    const { isActive } = await request.json();

    if (!id || typeof isActive !== "boolean") {
      return NextResponse.json(
        { error: "Invalid data: employeeId and isActive are required" },
        { status: 400 }
      );
    }

    const updatedEmployee = await prisma.employees.update({
      where: { id },
      data: { isActive },
    });

    return NextResponse.json(updatedEmployee, { status: 200 });
  } catch (error) {
    console.error("Error toggling archive status:", error);
    return NextResponse.json(
      { error: "Failed to toggle archive status" },
      { status: 500 }
    );
  }
}
