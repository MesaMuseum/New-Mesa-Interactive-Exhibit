// This middleware ensures proper handling of client-side routes
export default function middleware(request) {
  const url = new URL(request.url);
  
  // If the request is for a static asset, let it pass through
  if (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|mp3|mp4|ico|glb|gltf)$/i)) {
    return;
  }
  
  // Otherwise, rewrite the URL to the root
  return Response.redirect(new URL('/', request.url));
}
