const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

const getRecaptchaErrorMessage = (errorCodes) => {
  if (!Array.isArray(errorCodes) || errorCodes.length === 0) {
    return "reCAPTCHA validation failed.";
  }

  if (errorCodes.includes("missing-input-secret")) {
    return "Chave secreta do reCAPTCHA nao configurada.";
  }

  if (errorCodes.includes("invalid-input-secret")) {
    return "Chave secreta do reCAPTCHA invalida.";
  }

  if (errorCodes.includes("missing-input-response")) {
    return "Confirme o reCAPTCHA.";
  }

  if (errorCodes.includes("invalid-input-response")) {
    return "Token do reCAPTCHA invalido. Marque novamente.";
  }

  if (errorCodes.includes("timeout-or-duplicate")) {
    return "reCAPTCHA expirou. Marque novamente.";
  }

  return "reCAPTCHA validation failed.";
};

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
    const errorCodes = Array.isArray(data["error-codes"])
      ? data["error-codes"]
      : [];

    return {
      success: false,
      status: 403,
      message: getRecaptchaErrorMessage(errorCodes),
      errorCodes,
    };
  }

  return { success: true, data };
};
