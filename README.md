# Offgrid HTMX hook for Service Worker

This hook creates the HTTP server headers to interact with HTMX.

## Getting started

```typescript
import { Router } from "https://deno.land/x/offgrid-router/main.ts";
import htmxHook from "https://deno.land/x/offgrid-htmx/main.ts";

const router = new Router();

router.hooks.add(htmxHook);

router.get("/", (context) => {
  if (context.state.isHTMX) {
    context.state.htmx.pushUrl("/new-url-for-history");
    context.partial("component", { name: "World" });
  } else {
    context.render("index", { name: "World" });
  }
});

addEventListener("fetch", (event) => {
  event.respondWith(router.handle(event.request));
});
```

For more details look at the documentation of
[htmx_headers](https://github.com/xpectme/htmx_headers) and/or the public
documentation of [htmx](https://htmx.org/).

## License

MIT
