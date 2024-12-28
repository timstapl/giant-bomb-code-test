import type { Context } from "@netlify/functions";

const headers = {
	"Access-Control-Allow-Origin" : "*",
	"Access-Control-Allow-Headers": "Content-Type",
};

const delay = ms => new Promise(res => setTimeout(res, ms));

export default async (req: Request, context: Context) => {

  //
  // CORS Preflight Handling
  //
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers,
    });
  }

  try {
    // grab query params

    // TODO: Replace this
    // future steps would include adding a persistence layer and DB to track items rented, stock available, etc.
    
    await delay(5000);

    return new Response("success!");
  }
  catch (err) {
    console.error('error: ', err);
    return new Response('error submitting request', {
      status: 500,
    })
  }
}
