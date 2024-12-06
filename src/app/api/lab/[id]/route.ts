import { NextResponse, NextRequest } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const token = req.headers.get("Authorization"); // JWT from frontend

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // Forward the request to the backend
    const backendResponse = await fetch(`${BACKEND_URL}/labs/${id}`, {
      method: "GET",
      headers: {
        Authorization: token, // Pass the token to the backend
      },
    });

    if (!backendResponse.ok) {
      const error = await backendResponse.json();
      return NextResponse.json(error, { status: backendResponse.status });
    }

    const lab = await backendResponse.json();
    return NextResponse.json(lab);
  } catch (error) {
    console.error("Error fetching lab from backend:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
