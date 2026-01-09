const ContentSecurityPolicy = `
  default-src 'self';
  base-uri 'self';
  form-action 'self';
  object-src 'none';
  frame-ancestors 'none';
  img-src 'self' data: blob: https://www.google.com https://www.gstatic.com;
  font-src 'self' data: https://unpkg.com https://cdnjs.cloudflare.com;
  style-src 'self' 'unsafe-inline' https://unpkg.com https://cdnjs.cloudflare.com;
  script-src 'self' 'unsafe-inline' https://unpkg.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://www.google.com https://www.gstatic.com https://www.recaptcha.net;
  frame-src https://www.google.com https://www.recaptcha.net;
  connect-src 'self' https://www.google.com https://www.gstatic.com https://www.recaptcha.net;
  upgrade-insecure-requests;
`;

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
  },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
];

module.exports = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};
