export function jsonError(error, status = 500) {
  return Response.json({ error }, { status });
}
