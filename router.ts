import { serve, Server, ServerRequest } from "https://deno.land/std@0.81.0/http/server.ts";


const handlers: Handler[] = [];

const get = (path: string, fun: HandlerFunction) => {
  handlers.push({
    path, 
    fun,
    method: 'GET'
  });
}

const post = (path: string, fun: HandlerFunction) => {
  handlers.push({
    path, 
    fun,
    method: 'POST'
  });
}

const put = (path: string, fun: HandlerFunction) => {
  handlers.push({
    path, 
    fun,
    method: 'PUT'
  });
}


const start = async (server: Server) => {
  for await (const req of server) {
    
    req.respond({ body: handlers.length.toString() });
  }
}


// very exhaustive list
type HTTPMethod = 'GET' | 'POST' | 'PUT';

type HandlerFunction = (req: ServerRequest) => Promise<string>;

export type Handler = {
  path: string;
  method: HTTPMethod;
  fun: HandlerFunction; 
};




export {get, post, put, start};