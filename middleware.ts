import { NextResponse, NextRequest } from "next/server";

export const config = {
  // Exclude: api/, _next/, _static/, _vercel, media/, admin/, static files
  matcher: ["/((?!api/|_next/|_static/|_vercel|media/|admin/|[\\w-]+\\.\\w+).*)"],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Extract the hostname (e.g. `fabio.colorwall.com`)
  const hostname = req.headers.get("host") || "";

  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "";

  if (hostname.endsWith(`.${rootDomain}`)) {
    const tenantSlug = hostname.replace(`.${rootDomain}`, "");

    return NextResponse.rewrite(
      new URL(`/tenants/${tenantSlug}${url.pathname}`, req.url)
    );
  }

  return NextResponse.next();
}
