export async function onRequest({ request, env, next }) {
  const auth = request.headers.get("Authorization") || "";
  const expected = "Basic " + btoa(`${env.BASIC_USER}:${env.BASIC_PASS}`);

  if (auth !== expected) {
    return new Response("Authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Documents"' },
    });
  }
  return next();
}
