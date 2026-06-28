import { requireAuth } from "@lib/api-auth";
import { getNotesByUserId } from "@lib/notes";
import { jsonError } from "@lib/api-errors";

export async function GET(request) {
  const { session, error } = await requireAuth();
  if (error) return error;

  try {
    const { searchParams } = new URL(request.url);
    const isDeleted = searchParams.get("isDeleted") === "true";
    const notes = await getNotesByUserId(session.user.id, { isDeleted });
    return Response.json(notes);
  } catch {
    return jsonError("Failed to fetch notes", 500);
  }
}
