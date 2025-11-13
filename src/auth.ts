import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Validate credentials against environment variables
        const adminUsername = process.env.ADMIN_USERNAME || "admin";
        const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

        if (
          credentials?.username === adminUsername &&
          credentials?.password === adminPassword
        ) {
          return { id: "1", name: "Admin" };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    redirect: async ({ url, baseUrl }) => {
      // If url is a relative path, make it absolute
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // If url is on the same domain, use it
      if (new URL(url).origin === baseUrl) return url;
      // Otherwise, default to admin page
      return `${baseUrl}/admin`;
    },
  },
});
