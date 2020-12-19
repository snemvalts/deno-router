import { serve, ServerRequest } from "https://deno.land/std@0.81.0/http/server.ts";
import * as router from './router.ts';

router.get('/hello/', async (req) => {
  req.respond({ body: 'Hello' });
});

router.get('/hello/test/', async (req) => {
  req.respond({ body: 'Hello test' });
});

router.get('/bye/', async (req) => {
  req.respond({ body: 'Bye' });
});

const server = serve({ port: 8000 });
await router.start(server);