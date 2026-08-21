import "server-only";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { prisma } from "@/lib/prisma";
import type { Role } from "@/lib/roles";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "LECTEUR" satisfies Role,
        input: false,
      },
      ministereId: {
        type: "string",
        required: false,
        input: false,
      },
      provinceId: {
        type: "string",
        required: false,
        input: false,
      },
    },
  },
  plugins: [nextCookies()],
});
