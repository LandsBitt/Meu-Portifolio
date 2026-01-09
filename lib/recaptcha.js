const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

export const getRemoteIp = (request) => {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (!forwardedFor) {
    return "";
  }

  return forwardedFor.split(",")[0].trim();
};

export const verifyRecaptchaToken = async ({ token, remoteIp }) => {
  if (!token) {
    return {
      success: false,
      status: 400,
      message: "Missing reCAPTCHA token.",
    };
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    return {
      success: false,
      status: 500,
      message: "reCAPTCHA secret not configured.",
    };
  }

  const params = new URLSearchParams();
  params.append("secret", secret);
  params.append("response", token);
  if (remoteIp) {
    params.append("remoteip", remoteIp);
  }

  let response;
  try {
    response = await fetch(RECAPTCHA_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
  } catch (error) {
    return {
      success: false,
      status: 502,
      message: "Failed to reach reCAPTCHA service.",
    };
  }

  if (!response.ok) {
    return {
      success: false,
      status: 502,
      message: "Unexpected response from reCAPTCHA service.",
    };
  }

  let data;
  try {
    data = await response.json();
  } catch (error) {
    return {
      success: false,
      status: 502,
      message: "Invalid response from reCAPTCHA service.",
    };
  }

  if (data.success !== true) {
    return {
      success: false,
      status: 403,
      message: "reCAPTCHA validation failed.",
      errorCodes: Array.isArray(data["error-codes"])
        ? data["error-codes"]
        : [],
    };
  }

  return { success: true, data };
};
