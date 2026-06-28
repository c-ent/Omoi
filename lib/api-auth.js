import { getServerSession } from "next-auth/next";
import { authOptions } from "@lib/auth";
import { jsonError } from "@lib/api-errors";

export async function getAuthSession() {
  return getServerSession(authOptions);
}

export async function requireAuth() {
  const session = await getAuthSession();

  if (!session?.user?.id) {
    return {
      session: null,
      error: jsonError("Unauthorized", 401),
    };
  }

  return { session, error: null };
}
