import { serve, ServerRequest } from "https://deno.land/std@0.81.0/http/server.ts";
import * as router from './router.ts';

console.log('starting server');

router.get('/hello/', async (req) => {
  return 'Hello';
});

router.get('/bye/', async (req) => {
  return 'Bye';
});

const server = serve({ port: 8000 });
await router.start(server);