import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url);

  // Handle Chrome DevTools specific request
  if (url.pathname === "/.well-known/appspecific/com.chrome.devtools.json") {
    return new Response(JSON.stringify({}), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // For other 404s, throw a 404 response
  throw new Response("Not Found", { status: 404 });
};
