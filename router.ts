import { serve, Server, ServerRequest } from "https://deno.land/std@0.81.0/http/server.ts";


const handlers: {[path: string]: {[method in HTTPMethod]?: Handler}} = {};

const get = (path: string, fun: HandlerFunction) => {
  addHandler({
    path, 
    fun,
    method: 'GET'
  });
}

const post = (path: string, fun: HandlerFunction) => {
  addHandler({
    path, 
    fun,
    method: 'POST'
  });
}

const put = (path: string, fun: HandlerFunction) => {
  addHandler({
    path, 
    fun,
    method: 'PUT'
  });
}

const addHandler = (handler: Handler) => {
  if (handlers?.[handler.path]?.[handler.method]) {
    throw new Error('Handler with method and path already exists');
  }

  if (!handlers?.[handler.path]) {
    handlers[handler.path] = {};
  }
  
  handlers[handler.path][handler.method] = handler;  
}


const start = async (server: Server) => {
  for await (const req of server) {
    // ugly hack
    const path = new URL(`https://localhost${req.url}`).pathname;
    const method = req.method as HTTPMethod;
    if (handlers?.[path]?.[method]) {
      await handlers[path][method]?.fun(req);
    } else {
      req.respond({ status: 404, body: 'Not found' })
    }
  }
}


// very exhaustive list
type HTTPMethod = 'GET' | 'POST' | 'PUT';

type HandlerFunction = (req: ServerRequest) => Promise<void>;

export type Handler = {
  path: string;
  method: HTTPMethod;
  fun: HandlerFunction; 
};




export {get, post, put, start};