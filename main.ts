import type { Context, HookFunction } from "./deps.ts";
import { HXHeaders } from "./deps.ts";

export default function htmxHook(): HookFunction {
  return (context: Context) => {
    const reqHeaders = context.request.headers;
    const resHeaders = context.response.headers;

    const htmx = new HXHeaders(reqHeaders, resHeaders);
    context.state.isHTMX = htmx.isHTMX;
    context.state.htmx = htmx;
    context.state.redirect = (url: string) => {
      let status = 303;
      if (htmx.isHTMX) {
        status = 204;
        htmx.redirect(url);
      }
      context.response = new Response(null, { status, headers: resHeaders });
    };
  };
}
