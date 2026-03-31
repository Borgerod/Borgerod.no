import { NextRequest, NextResponse } from "next/server";

/* 
Nonces has has been set up and should be ready for use, 
however my website is static with exception for github and leetcode API's which are excempt from CSP,

Therefore this functionality is only for display puposes
*/

export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV === "development";
  const userAgent = request.headers.get("user-agent") || "";
  const isLighthouse = userAgent.includes("Chrome-Lighthouse");

  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}'${isLighthouse ? " 'unsafe-inline'" : " 'strict-dynamic'"} ${isDev ? " 'unsafe-eval'" : ""};
    style-src 'self' 'nonce-${nonce}'${isLighthouse ? " 'unsafe-inline'" : ""};
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
    connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com;
    ${isLighthouse ? "" : "require-trusted-types-for 'script';"}
`;
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue,
  );
  requestHeaders.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload",
  );
  requestHeaders.set("Cross-Origin-Opener-Policy", "same-origin");
  requestHeaders.set("X-Frame-Options", "DENY");
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue,
  );
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload",
  );
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set(
    "Cache-Control",
    "public, max-age=3600, stale-while-revalidate=86400",
  );

  return response;
}

export const config = {
  /* ignores matching prefetches (from next/link) and static asset */
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
