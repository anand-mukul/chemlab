// import { NextRequest, NextResponse } from "next/server";
// import axios from "axios";

import { NextRequest, NextResponse } from "next/server";

// const publicRoutes = ["/sign-in", "/sign-up", "/"];
// const protectedRoutes = ["/dashboard", "/lab", "/profile"];

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   console.log("Current Pathname:", pathname);

//   // Skip checks for static files and assets
//   if (
//     pathname.startsWith("/_next/") ||
//     pathname.startsWith("/static/") ||
//     pathname.startsWith("/favicon.ico") ||
//     pathname.endsWith(".png") ||
//     pathname.endsWith(".jpg") ||
//     pathname.endsWith(".jpeg") ||
//     pathname.endsWith(".gif") ||
//     pathname.endsWith(".svg")
//   ) {
//     return NextResponse.next();
//   }

//   // Exact match for public routes
//   if (publicRoutes.includes(pathname)) {
//     console.log("Public route, proceeding...");
//     return NextResponse.next();
//   }

//   const accessToken = request.cookies.get("accessToken")?.value;
//   const refreshToken = request.cookies.get("refreshToken")?.value;

//   // Match protected routes dynamically
//   if (
//     protectedRoutes.some((route) => pathname.startsWith(route)) &&
//     !refreshToken
//   ) {
//     console.log("Protected route without refresh token, redirecting...");
//     return NextResponse.redirect(new URL("/sign-in", request.url));
//   }

//   if (!accessToken && refreshToken) {
//     try {
//       const response = await axios.post(
//         `https://chemlab-backend.onrender.com/api/v1/users/refresh-token`,
//         { refreshToken },
//         { withCredentials: true }
//       );
//       console.log(response.data);
//       const { accessToken: newAccessToken } = response.data.data;

//       console.log("Access token refreshed successfully.");
//       const response2 = NextResponse.next();
//       response2.cookies.set("accessToken", newAccessToken, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "strict",
//       });
//       return response2;
//     } catch (error) {
//       console.error("Error refreshing token:", error);
//       const response = NextResponse.redirect(new URL("/sign-in", request.url));
//       response.cookies.delete("accessToken");
//       response.cookies.delete("refreshToken");
//       return response;
//     }
//   }

//   if (accessToken) {
//     try {
//       const headers = {
//         Authorization: `Bearer ${accessToken}`,
//       };

//       const responseUrl = await axios.get(
//         `https://chemlab-backend.onrender.com/api/v1/users/current-user`,
//         {
//           headers: headers,
//           withCredentials: true,
//         }
//       );

//       console.log("Access token verified, proceeding...");
//       return NextResponse.next();
//     } catch (error) {
//       console.error("Access token invalid, redirecting...");
//       const response = NextResponse.redirect(new URL("/sign-in", request.url));
//       response.cookies.delete("accessToken");
//       response.cookies.delete("refreshToken");
//       return response;
//     }
//   }

//   console.log("No valid token, allowing fallback...");
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };

export async function middleware(request: NextRequest) {
  return NextResponse.next(); // Skip all checks
}
