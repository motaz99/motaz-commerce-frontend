import { NextResponse } from "next/server";
import { decodeToken } from "./utils/decodeToken";

async function verifyUser(request) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return { error: "Unauthorized", status: 401 };
  }

  try {
    const decoded = await decodeToken(token);
    return { decoded, error: null };
  } catch (error) {
    console.error("Error in verifyUser:", error.name, error.message);
    return { error: "Invalid or expired token", status: 403 };
  }
}

export async function middleware(request) {
  const { decoded, error, status } = await verifyUser(request);

  if (error) {
    return NextResponse.json({ error }, { status });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/employees/:path*"],
  runtime: "nodejs",
};
