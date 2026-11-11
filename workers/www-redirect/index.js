// www.amit.so → amit.so (301, path and query string preserved).
// Lives in its own Worker so the main site stays a static-assets-only Worker.
export default {
  fetch(request) {
    const url = new URL(request.url);
    url.protocol = 'https:';
    url.hostname = 'amit.so';
    url.port = '';
    return Response.redirect(url.toString(), 301);
  },
};
