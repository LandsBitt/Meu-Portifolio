import { NextResponse } from "next/server";
import { getRemoteIp, verifyRecaptchaToken } from "../../../lib/recaptcha";

export const runtime = "nodejs";

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const token = typeof body?.token === "string" ? body.token : "";
  const remoteIp = getRemoteIp(request);
  const result = await verifyRecaptchaToken({ token, remoteIp });

  if (!result.success) {
    return NextResponse.json(
      {
        success: false,
        message: result.message,
        errorCodes: result.errorCodes || [],
      },
      { status: result.status || 400 }
    );
  }

  return NextResponse.json({ success: true });
}

export function GET() {
  return NextResponse.json(
    { message: "Method Not Allowed" },
    { status: 405 }
  );
}
