import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const archivedEmployees = await prisma.employees.findMany({
      where: { isActive: false },
    });
    return NextResponse.json(archivedEmployees, { status: 200 });
  } catch (error) {
    console.error("Error fetching archived employees:", error);
    return NextResponse.json(
      { error: "Failed to fetch archived employees" },
      { status: 500 }
    );
  }
}
